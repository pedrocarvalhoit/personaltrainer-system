package com.personaltrainer.workoutsession;

import com.personaltrainer.common.PageResponse;
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

    @PostMapping("/create/{clientId}")
    public ResponseEntity<Integer> createSession(@RequestBody @Valid WorkoutSessionCreateRequest createWSRequest,
                                                 @PathVariable Integer clientId){

        return ResponseEntity.ok(service.save(createWSRequest, clientId));
    }

    @GetMapping("/all/{clientId}")
    public ResponseEntity<PageResponse<WorkoutSessionResponse>> listAllByClient(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            @PathVariable @Valid Integer clientId
    ){
        return ResponseEntity.ok(service.listAllByClient(page, size, clientId));
    }

    @PatchMapping("/execute/{sessionId}")
    public ResponseEntity<Integer> executeSession(@PathVariable @Valid Integer sessionId){
        return ResponseEntity.ok(service.execute(sessionId));
    }

}
