package com.personaltrainer.workoutprogram;

import com.personaltrainer.client.Client;
import com.personaltrainer.client.ClientRepository;
import com.personaltrainer.common.PageResponse;
import com.personaltrainer.common.UserPermissionOverClientCheck;
import com.personaltrainer.exception.OperationNotPermitedException;
import com.personaltrainer.user.User;
import com.personaltrainer.workoutprogram.exporter.WorkoutProgramPDFExporter;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class WorkoutProgramService {

    private final WorkoutProgramRepository workoutProgramRepository;
    private final ClientRepository clientRepository;
    private final WorkoutProgramMapper mapper;
    private final UserPermissionOverClientCheck permission;

    public Integer save(WorkoutProgramCreateRequest requestWorkoutProgram, Integer clientId, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Client client = clientRepository.findById(clientId).orElseThrow(()-> new RuntimeException("Client not found"));

        if (!Objects.equals(client.getPersonalTrainer().getId(), user.getId())){
            throw new OperationNotPermitedException("This client is not on your list of clients");
        }

        WorkoutProgram workoutProgram = mapper.toWorkoutProgram(requestWorkoutProgram);
        workoutProgram.setClient(client);

        return workoutProgramRepository.save(workoutProgram).getId();
    }

    public PageResponse<WorkoutProgramResponse> listAllEnabledByClient(int page, int size, Integer clientId) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("title").ascending());
        Page<WorkoutProgram> workoutPrograms = workoutProgramRepository.findAllByClientIdAndEnabledIsTrue(pageable, clientId);
        List<WorkoutProgramResponse> workoutProgramResponse = workoutPrograms.stream()
                .map(mapper::toWorkoutProgramResponse)
                .toList();

        return new PageResponse<>(workoutProgramResponse, workoutPrograms.getNumber(), workoutPrograms.getSize(),
                workoutPrograms.getTotalElements(), workoutPrograms.getTotalPages(), workoutPrograms.isFirst(),
                workoutPrograms.isLast());
    }

    public PageResponse<WorkoutProgramResponse> listAllDisabledByClient(int page, int size, Integer clientId) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("title").ascending());
        Page<WorkoutProgram> workoutPrograms = workoutProgramRepository.findAllByClientIdAndEnabledIsFalse(pageable, clientId);
        List<WorkoutProgramResponse> workoutProgramResponse = workoutPrograms.stream()
                .map(mapper::toWorkoutProgramResponse)
                .toList();

        return new PageResponse<>(workoutProgramResponse, workoutPrograms.getNumber(), workoutPrograms.getSize(),
                workoutPrograms.getTotalElements(), workoutPrograms.getTotalPages(), workoutPrograms.isFirst(),
                workoutPrograms.isLast());
    }


    public Integer save(WorkoutProgramCreateRequest requestWorkoutProgram) {
        WorkoutProgram workoutProgram = mapper.toWorkoutProgram(requestWorkoutProgram);

        return workoutProgramRepository.save(workoutProgram).getId();
    }

    public Integer updateDate(Integer programId, UpdateProgramDateRequest request) {
        WorkoutProgram workoutProgram = workoutProgramRepository.findById(programId)
                .orElseThrow(()-> new EntityNotFoundException("Program not found"));

        mapper.toUpdateProgram(workoutProgram, request);
        workoutProgramRepository.save(workoutProgram);

        return programId;
    }

    public Integer updateStatus(Integer programId) {
        WorkoutProgram workoutProgram = workoutProgramRepository.findById(programId)
                .orElseThrow(() -> new EntityNotFoundException("Program not found"));
        workoutProgram.setEnabled(!workoutProgram.isEnabled());

        return workoutProgramRepository.save(workoutProgram).getId();
    }

    public List<WorkoutProgram> findProgramByEndDateBefor(LocalDate date) {
        return workoutProgramRepository.findAllByEndDateBeforeAndEnabledTrue(date);
    }

    //save for scheduler
    public void save(WorkoutProgram program){
        workoutProgramRepository.save(program);
    }

    public Integer exportToPdf(HttpServletResponse response, Integer programId) throws IOException {
        WorkoutProgram workoutProgram = workoutProgramRepository.findById(programId).get();
        WorkoutProgramPDFExporter exporter = new WorkoutProgramPDFExporter();
        exporter.export(workoutProgram, response, "workoutprogram");
        return programId;
    }
}