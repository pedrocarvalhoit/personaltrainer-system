package com.personaltrainer.physicaltest.coopertest;

import com.personaltrainer.client.Client;
import com.personaltrainer.client.ClientRepository;
import com.personaltrainer.common.UserPermissionOverClientCheck;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.logging.Logger;

//This class uses contructors as a mapper
@Service
@RequiredArgsConstructor
public class CooperTestService {

    private final CooperTestRepository repository;
    private final ClientRepository clientRepository;
    private final CooperTestMapper mapper;
    private final UserPermissionOverClientCheck permission;

    private static final Logger LOGGER = Logger.getLogger(CooperTestService.class.getName());

    //Returns the Vo2Max from the last 12 months
    public Integer create(Integer clientId, Authentication authentication, CooperTestRequest request) {
        permission.checkPermitionWithId(clientId, authentication);

        CooperTest cooperTest = new CooperTest(request);
        cooperTest.setClient(clientRepository.findById(clientId).get());

        repository.save(cooperTest);

        return cooperTest.getId();
    }

    //Returns the result by testId
    public CooperTestResultResponse getVo2Max(Integer testId){
        CooperTest cooperTest = repository.findById(testId).get();

        return mapper.toResultResponse(cooperTest);
    }

    //Returns the last Vo2Max of client
    public CooperTestResultResponse getLastVo2Max(Integer clientId) {
        CooperTest test = getLastResultByClientid(clientId);

        return mapper.toResultResponse(test);
    }

    //Resturns Test Description
    public CooperTestDescriptionResponse getDescription() {
        return CooperTestDescriptionResponse.builder()
                .description(CooperTest.DESCRIPTION)
                .build();
    }

    //Returns and Set the CooperTest Classification of the Client
    @Transactional
    public CooperTestClassificationResponse getClassification(Integer clientId, Authentication authentication){
        Client client = clientRepository.findById(clientId).get();
        permission.checkPermition(client, authentication);

        CooperTest latestCooperTest = getLastResultByClientid(clientId);

        if (latestCooperTest.getVo2Max() == null) {
            client.setCooperTestClassification(CooperTestClassification.UNDEFINED);
            clientRepository.save(client);
            return mapper.toClassificationResponse(CooperTestClassification.UNDEFINED);
        }else {
            CooperTestClassification classification = CooperTestUtil.getClassification(client.getPersonalData().getAge(),
                    client.getPersonalData().getGender(), latestCooperTest.getVo2Max());

            client.setCooperTestClassification(classification);
            Client savedClient = clientRepository.save(client);
            return  mapper.toClassificationResponse(savedClient.getCooperTestClassification());
        }
    }

    private CooperTest getLastResultByClientid(Integer clientId) {
        Pageable pageable = PageRequest.of(0, 1);
        List<CooperTest> testList = repository.findLastResultByClientid(clientId, pageable);

        return testList.get(0);
    }

    //Returns the historic result for lasts 12 months, ordered by date
    public List<CooperTestHistoryResponse> getHistoryResults(Integer clientId) {
        Pageable pageable = PageRequest.of(0, 12);
        List<CooperTest> testsList = repository.findTwelveMonthsHistory(clientId, pageable);

        return testsList.stream()
                .map(mapper ::toHistoryResponse)
                .toList();
    }

}
