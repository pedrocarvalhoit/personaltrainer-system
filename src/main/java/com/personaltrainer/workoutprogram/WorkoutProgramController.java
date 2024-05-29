package com.personaltrainer.workoutprogram;

import com.personaltrainer.common.PageResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("workout-programs")
@Tag(name = "WorkoutProgram")
@RequiredArgsConstructor
public class WorkoutProgramController {

    private final WorkoutProgramService service;

    @RequestMapping("/create/{clientId}")
    public ResponseEntity<Integer> createWorkoutProgramForClient(@RequestBody @Valid WorkoutProgramCreateRequest requestWorkoutProgram,
                                                                 @PathVariable Integer clientId,
                                                                 Authentication authenticatedUser){

        return ResponseEntity.ok(service.save(requestWorkoutProgram, clientId, authenticatedUser));
    }

    @GetMapping("/all/{clientId}")
    public ResponseEntity<PageResponse<WorkoutProgramResponse>> listAll(
        @RequestParam(name = "page", defaultValue = "0", required = false) int page,
        @RequestParam(name = "size",defaultValue = "10", required = false) int size,
        @PathVariable @Valid Integer clientId
    ){
        return ResponseEntity.ok(service.listAllByClient(page, size, clientId));
    }

    @RequestMapping("/create")
    public ResponseEntity<Integer> createGenericWorkoutProgram(@RequestBody @Valid WorkoutProgramCreateRequest requestWorkoutProgram){

        return ResponseEntity.ok(service.save(requestWorkoutProgram));
    }



}
