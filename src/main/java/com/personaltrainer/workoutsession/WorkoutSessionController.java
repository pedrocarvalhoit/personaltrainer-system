package com.personaltrainer.workoutsession;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("workout-sessions")
@Tag(name = "WorkoutSession")
public class WorkoutSessionController {

    private final WorkoutSessionService service;

    @PostMapping("create/{clientId}")
    public ResponseEntity<Integer> createSession(@RequestBody @Valid WorkoutSessionCreateRequest createWSRequest,
                                                 @PathVariable Integer clientId){

        return ResponseEntity.ok(service.save(createWSRequest, clientId));
    }

}
