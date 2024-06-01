package com.personaltrainer.workoutprogram;

import com.personaltrainer.client.Client;
import com.personaltrainer.client.ClientRepository;
import com.personaltrainer.common.PageResponse;
import com.personaltrainer.exception.OperationNotPermitedException;
import com.personaltrainer.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class WorkoutProgramService {

    private final WorkoutProgramRepository workoutProgramRepository;

    private final ClientRepository clientRepository;

    private final WorkoutProgramMapper mapper;

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

}