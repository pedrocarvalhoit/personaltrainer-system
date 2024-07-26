package com.personaltrainer.physicaltest.coopertest;

import com.personaltrainer.client.ClientRepository;
import com.personaltrainer.common.UserPermissionOverClientCheck;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

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
}
