package com.personaltrainer.physicaltest.coopertest;

import com.personaltrainer.physicaltest.TestDescriptionResponse;
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

    @PostMapping("/create/{clientId}")
    public ResponseEntity<Integer> create(@PathVariable Integer clientId,
                                          Authentication authentication,
                                          @RequestBody @Valid CooperTestRequest request){
        return ResponseEntity.ok(service.create(clientId, authentication, request));
    }

    @GetMapping("/vo2-last-result/{clientId}")
    public ResponseEntity<CooperTestResultResponse> getLastResult(@PathVariable Integer clientId){
        return ResponseEntity.ok(service.getLastVo2Max(clientId));
    }

    @GetMapping("/vo2-classification/{clientId}")
    public ResponseEntity<CooperTestClassificationResponse> getClassification(@PathVariable Integer clientId, Authentication authentication){
        return ResponseEntity.ok(service.getClassification(clientId, authentication));
    }

    @GetMapping("/description")
    public ResponseEntity<TestDescriptionResponse> getDescription(){
        return ResponseEntity.ok(service.getDescription());
    }

    @GetMapping("/twelve-months-history/{clientId}")
    public ResponseEntity<List<CooperTestHistoryResponse>> getHistoricResults(@PathVariable Integer clientId){
        return ResponseEntity.ok(service.getHistoryResults(clientId));
    }

}
