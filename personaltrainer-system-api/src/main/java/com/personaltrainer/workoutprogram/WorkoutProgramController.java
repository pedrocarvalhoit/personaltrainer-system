package com.personaltrainer.workoutprogram;

import com.personaltrainer.common.PageResponse;
import com.personaltrainer.workoutprogram.exporter.WorkoutProgramPDFExporter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("workout-programs")
@Tag(name = "WorkoutProgram")
@RequiredArgsConstructor
public class WorkoutProgramController {

    private final WorkoutProgramService service;

    //create program for client
    @PostMapping("/create/{clientId}")
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

    //list disabled programs by client
    @GetMapping("/disabled/{clientId}")
    public ResponseEntity<PageResponse<WorkoutProgramResponse>> listAllDisabled(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size",defaultValue = "10", required = false) int size,
            @PathVariable @Valid Integer clientId
    ){
        return ResponseEntity.ok(service.listAllDisabledByClient(page, size, clientId));
    }

    //update program date
    @PatchMapping("/update-date/{programId}")
    public ResponseEntity<Integer> updateProgramDate(@PathVariable Integer programId,
                                                     @RequestBody @Valid UpdateProgramDateRequest request){

        return ResponseEntity.ok(service.updateDate(programId, request));
    }

    //disable by manual
    @PatchMapping("/update-status/{programId}")
    public ResponseEntity<Integer> updateStatus(@PathVariable Integer programId){
        return ResponseEntity.ok(service.updateStatus(programId));
    }

    //pdf dowload
    @GetMapping("export-pdf/{programId}")
    public ResponseEntity<Integer> exportToPdf(HttpServletResponse response, @PathVariable Integer programId) throws IOException {
        return ResponseEntity.ok(service.exportToPdf(response, programId));
    }

    //disable by end date
    //Sheduler class

}
