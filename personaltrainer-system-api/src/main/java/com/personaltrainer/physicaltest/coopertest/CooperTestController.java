package com.personaltrainer.physicaltest.coopertest;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("cooper-test")
public class CooperTestController {

    private final CooperTestService service;

    @PostMapping("create/{clientId}")
    public ResponseEntity<Integer> create(@PathVariable Integer clientId,
                                          Authentication authentication,
                                          @RequestBody @Valid CooperTestRequest request){
        return ResponseEntity.ok(service.create(clientId, authentication, request));
    }

    @GetMapping("vo2-result/{testId}")
    public ResponseEntity<CooperTestResponse> getResult(@PathVariable Integer testId){
        return ResponseEntity.ok(service.getVo2Max(testId));
    }

}
