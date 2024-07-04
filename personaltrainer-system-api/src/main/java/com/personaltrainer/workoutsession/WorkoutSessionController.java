package com.personaltrainer.workoutsession;

import com.personaltrainer.common.PageResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("workout-sessions")
@Tag(name = "WorkoutSession")
public class WorkoutSessionController {

    private final WorkoutSessionService service;

    //create to client
    @PostMapping("/create/{clientId}")
    public ResponseEntity<Integer> createSession(@RequestBody @Valid WorkoutSessionCreateRequest createWSRequest,
                                                 @PathVariable Integer clientId){

        return ResponseEntity.ok(service.save(createWSRequest, clientId));
    }

    //delete Workout Session
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Integer> deleteSession(@PathVariable Integer id){
        return ResponseEntity.ok(service.delete(id));
    }

    //execute session
    @PatchMapping("/execute/{sessionId}")
    public ResponseEntity<Integer> executeSession(@PathVariable @Valid Integer sessionId, Authentication authentication){
        return ResponseEntity.ok(service.execute(sessionId, authentication));
    }

    //update Efforts
    @PatchMapping("/update-efforts/{sessionId}")
    public ResponseEntity<Integer> updateEfforts(
            Authentication authentication,
            @PathVariable @Valid Integer sessionId,
            @RequestBody WorkoutSessioUpdateEffortsRequest request
    ){
        return ResponseEntity.ok(service.updateEfforts(authentication, sessionId, request));
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

    //get total sessions and best 3 clients by session
    @GetMapping("/get-workout-summary")
    public ResponseEntity<WorkoutSessionTotalSummaryResponse> getWorkoutSumary(Authentication authentication){
        return ResponseEntity.ok(service.getToalSesssionsSummary(authentication));
    }

    //get weckly next sessions
    @GetMapping("get-upcoming-sessions")
    public ResponseEntity<List<WorkoutSessionResponseForCalendar>> getSessionsForNextWeek(Authentication authentication){
        return ResponseEntity.ok(service.getSessionsForNextWeek(authentication));
    }

    //get all sessions for calendar
    @GetMapping("get-workout-calendar")
    public ResponseEntity<List<WorkoutSessionResponseForCalendar>> getSessionsForCalendar(Authentication authentication){
        return ResponseEntity.ok(service.getAllSessionsForCalendar(authentication));
    }

    //get client actual month session stats
    @GetMapping("get-workout-stats-actual-month/{clientId}")
    public ResponseEntity<WorkoutSessionClientActualMonthSummaryResponse> getSessionsForAchtualMonthStat(Authentication authentication,
                                                                                             @PathVariable Integer clientId){
        return ResponseEntity.ok(service.getActualMonthSessionStats(authentication, clientId));
    }

    //get client all time session stats
    @GetMapping("get-workout-stats-all-time/{clientId}")
    public ResponseEntity<WorkoutSessionClientAllTimeSummaryResponse> getSessionsForAllTimeStats(
            @PathVariable Integer clientId
    ){
        return ResponseEntity.ok(service.getAllTimeSessionStats(clientId));
    }

    //get client subjective
    @GetMapping("get-workout-quality/{clientId}")
    public ResponseEntity<List<WorkoutSessionQualityResponse>> getSessionsQualityAvarages(@PathVariable Integer clientId){
        return ResponseEntity.ok(service.getSessionsQuality(clientId));
    }

}
