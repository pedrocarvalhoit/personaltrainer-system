package com.personaltrainer.physicaltest.coopertest;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<CooperTestResultResponse> getResult(@PathVariable Integer testId){
        return ResponseEntity.ok(service.getVo2Max(testId));
    }

    @GetMapping("/description")
    public ResponseEntity<CooperTestDescriptionResponse> getDescription(){
        return ResponseEntity.ok(service.getDescription());
    }

    @GetMapping("historic/{clientId}")
    public ResponseEntity<List<CooperTestHistoricResponse>> getHistoricResults(@PathVariable Integer clientId){
        return ResponseEntity.ok(service.getHistoricResults(clientId));
    }

}
