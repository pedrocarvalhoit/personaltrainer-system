package com.personaltrainer.workoutprogram;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("workout-programs")
@Tag(name = "WorkoutProgram")
@RequiredArgsConstructor
public class WorkoutProgramController {

    private final WorkoutProgramService service;

    @RequestMapping("create/{clientId}")
    public ResponseEntity<Integer> createWorkoutProgram(@RequestBody @Valid WorkoutProgramCreateRequest requestWorkoutProgram,
                                                        @PathVariable Integer clientId){

        return ResponseEntity.ok(service.save(requestWorkoutProgram, clientId));
    }

}
