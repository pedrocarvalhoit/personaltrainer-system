package com.personaltrainer.physicaltest.strength;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("strength-test")
@RequiredArgsConstructor
public class SetrengthTestController {

    private final StrengthTestService service;

    @PostMapping("/create/{clientId}")
    public ResponseEntity<Integer> create(@PathVariable Integer clientId,
                                          @RequestBody @Valid StrengthTestRequest request){
        return ResponseEntity.ok(service.create(clientId, request));
    }

    @GetMapping("/rm-result/{testId}")
    public ResponseEntity<StrengthTestResultResponse> result(@PathVariable Integer testId){
        return ResponseEntity.ok(service.getResult(testId));
    }

}
