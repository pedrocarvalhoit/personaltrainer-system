package com.personaltrainer.physicaltest.strength;

import com.personaltrainer.client.Client;
import com.personaltrainer.client.ClientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StrengthTestService {

    private final StrengthTestRepository repository;
    private final ClientRepository clientRepository;
    private final StrengthTestMapper mapper;

    public Integer create(Integer clientId, StrengthTestRequest request) {
        Client client = clientRepository.findById(clientId).get();
        StrengthTest strengthTest = mapper.toEntity(request);
        strengthTest.setClient(client);
        repository.save(strengthTest);

        return strengthTest.getId();
    }

    public StrengthTestResultResponse getResult(Integer testId) {
        StrengthTest strengthTest = repository.findById(testId).get();
        return mapper.toResultResponse(strengthTest);
    }
}
