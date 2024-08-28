package com.personaltrainer.physicaltest.strengthtest;

import com.personaltrainer.physicaltest.TestDescriptionResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<StrengthTestResultResponse> getResult(@PathVariable Integer testId){
        return ResponseEntity.ok(service.getResult(testId));
    }

    @GetMapping("/description")
    public ResponseEntity<TestDescriptionResponse> getDescription(){
        return ResponseEntity.ok(service.getDescription());
    }

    @GetMapping("/exercises")
    public ResponseEntity<ExercisesResponse> getExercises(){
        return ResponseEntity.ok(service.getAllExercieses());
    }

    @GetMapping("/get-back-squat-stats/{clientId}")
    public ResponseEntity<List<ExerciseStatsResponse>>getBackSquatStats(@PathVariable Integer clientId){
        return ResponseEntity.ok(service.getBackSquatStats(clientId));
    }

}
