package com.personaltrainer.physicaltest.coopertest;

import com.personaltrainer.client.ClientRepository;
import com.personaltrainer.common.UserPermissionOverClientCheck;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CooperTestService {

    //This class uses contructors as a mapper

    private final CooperTestRepository repository;
    private final ClientRepository clientRepository;
    private final CooperTestMapper mapper;
    private final UserPermissionOverClientCheck permission;

    public Integer create(Integer clientId, Authentication authentication, CooperTestRequest request) {
        permission.checkPermitionWithId(clientId, authentication);

        CooperTest cooperTest = new CooperTest(request);
        cooperTest.setClient(clientRepository.findById(clientId).get());

        repository.save(cooperTest);

        return cooperTest.getId();
    }

    public CooperTestResultResponse getVo2Max(Integer testId){
        CooperTest cooperTest = repository.findById(testId).get();

        return mapper.toResponse(cooperTest);
    }

    public CooperTestDescriptionResponse getDescription() {
        return CooperTestDescriptionResponse.builder()
                .description(CooperTest.DESCRIPTION)
                .build();
    }

    //Returns the historic result for lasts 12 months, ordered by date
    public List<CooperTestHistoricResponse> getHistoricResults(Integer clientId) {
        Pageable pageable = PageRequest.of(0, 12);
        List<CooperTest> testsList = repository.findTwelveMonthsHistory(clientId, pageable);

        List<CooperTestHistoricResponse> responseList = testsList.stream()
                .map(mapper :: toHistoricResponse)
                .toList();

        return responseList;
    }
}
