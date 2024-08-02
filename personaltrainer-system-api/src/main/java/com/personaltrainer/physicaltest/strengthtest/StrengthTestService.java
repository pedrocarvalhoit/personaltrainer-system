package com.personaltrainer.physicaltest.strengthtest;

import com.personaltrainer.client.Client;
import com.personaltrainer.client.ClientRepository;
import com.personaltrainer.physicaltest.TestDescriptionResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StrengthTestService {

    private final StrengthTestRepository repository;
    private final ClientRepository clientRepository;
    private final StrengthTestMapper mapper;

    public Integer create(Integer clientId, StrengthTestRequest request) {
        Client client = clientRepository.findById(clientId).get();
        StrengthTest strengthTest = mapper.toEntity(request);
        strengthTest.setMax1Rm(StrengthTestUtil.calculateRm(request.maxLoad()));
        strengthTest.setClient(client);
        repository.save(strengthTest);

        return strengthTest.getId();
    }

    public StrengthTestResultResponse getResult(Integer testId) {
        StrengthTest strengthTest = repository.findById(testId).get();
        return mapper.toResultResponse(strengthTest);
    }


    public TestDescriptionResponse getDescription() {
        return TestDescriptionResponse.builder()
                .description(StrengthTest.DESCRIPTION)
                .build();
    }

    public ExercisesResponse getAllExercieses() {
        List<String> exercises = new ArrayList<>();
        for (Exercise c : Exercise.values()){
            exercises.add(String.valueOf(c));
        }

        return mapper.toExerciseResponse(exercises);

    }
}
