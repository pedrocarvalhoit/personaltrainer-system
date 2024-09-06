package com.personaltrainer.inicialassessment;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("inicial-assessment")
public class InicialAssessmentController {

    private final InicialAssessmenteService service;

    @PostMapping("create/{clientId}")
    public ResponseEntity<Integer> create (@PathVariable Integer clientId,
                                           Authentication authentication,
                                           @RequestBody @Valid InicialAssessmentRequest request){
        return ResponseEntity.ok(service.create(clientId, request, authentication));
    }

}
