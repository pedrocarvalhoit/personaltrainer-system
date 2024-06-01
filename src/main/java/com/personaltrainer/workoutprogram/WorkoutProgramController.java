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

    //create program for client
    @RequestMapping("/create/{clientId}")
    public ResponseEntity<Integer> createWorkoutProgramForClient(@RequestBody @Valid WorkoutProgramCreateRequest requestWorkoutProgram,
                                                                 @PathVariable Integer clientId,
                                                                 Authentication authenticatedUser){

        return ResponseEntity.ok(service.save(requestWorkoutProgram, clientId, authenticatedUser));
    }

    //list enable programs by client
    @GetMapping("/enabled/{clientId}")
    public ResponseEntity<PageResponse<WorkoutProgramResponse>> listAllEnabled(
        @RequestParam(name = "page", defaultValue = "0", required = false) int page,
        @RequestParam(name = "size",defaultValue = "10", required = false) int size,
        @PathVariable @Valid Integer clientId
    ){
        return ResponseEntity.ok(service.listAllEnabledByClient(page, size, clientId));
    }

    //update program date

    //list disabled programs by client
    @GetMapping("/disabled/{clientId}")
    public ResponseEntity<PageResponse<WorkoutProgramResponse>> listAllDisabled(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size",defaultValue = "10", required = false) int size,
            @PathVariable @Valid Integer clientId
    ){
        return ResponseEntity.ok(service.listAllDisabledByClient(page, size, clientId));
    }

    //disable by end date

    //disable by manual



}
