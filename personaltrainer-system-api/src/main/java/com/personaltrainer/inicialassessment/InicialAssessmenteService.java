package com.personaltrainer.inicialassessment;

import com.personaltrainer.client.ClientRepository;
import com.personaltrainer.common.PermissionUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InicialAssessmenteService {

    private final InicialAssessmentRepository repository;
    private final ClientRepository clientRepository;
    private final PermissionUtil permission;

    public Integer create(Integer clientId, InicialAssessmentRequest request, Authentication authentication) {
        permission.checkPermitionWithId(clientId, authentication);

        InicialAssessment assessment = new InicialAssessment(request);
        assessment.setClient(clientRepository.findById(clientId).get());

        repository.save(assessment);

        return assessment.getId();
    }

}
