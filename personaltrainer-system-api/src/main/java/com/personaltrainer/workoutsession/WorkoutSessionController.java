package com.personaltrainer.workoutsession;

import com.personaltrainer.common.PageResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("workout-sessions")
@Tag(name = "WorkoutSession")
public class WorkoutSessionController {

    private final WorkoutSessionService service;

    //create fo client
    @PostMapping("/create/{clientId}")
    public ResponseEntity<Integer> createSession(@RequestBody @Valid WorkoutSessionCreateRequest createWSRequest,
                                                 @PathVariable Integer clientId){

        return ResponseEntity.ok(service.save(createWSRequest, clientId));
    }

    //list by client
    @GetMapping("/all/{clientId}")
    public ResponseEntity<PageResponse<WorkoutSessionResponse>> listAllByClient(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            @PathVariable @Valid Integer clientId
    ){
        return ResponseEntity.ok(service.listAllByClient(page, size, clientId));
    }

    //execute session
    @PatchMapping("/execute/{sessionId}")
    public ResponseEntity<Integer> executeSession(@PathVariable @Valid Integer sessionId, Authentication authentication){
        return ResponseEntity.ok(service.execute(sessionId, authentication));
    }

    //get total sessions and best 3 clients by session
    @GetMapping("/get-workout-summary")
    public ResponseEntity<WorkoutSessionTotalSummaryResponse> getWorkoutSumary(Authentication authentication){
        return ResponseEntity.ok(service.getToalSesssionsSummary(authentication));
    }

}
