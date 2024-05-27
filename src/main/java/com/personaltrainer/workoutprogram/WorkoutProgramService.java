package com.personaltrainer.workoutprogram;

import com.personaltrainer.client.Client;
import com.personaltrainer.client.ClientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WorkoutProgramService {

    private final WorkoutProgramRepository workoutProgramRepository;

    private final ClientRepository clientRepository;

    private final WorkoutProgramMapper mapper;

    public Integer save(WorkoutProgramCreateRequest requestWorkoutProgram, Integer clientId) {
        Client client = clientRepository.findById(clientId).orElseThrow(()-> new RuntimeException("Client not found"));
        WorkoutProgram workoutProgram = mapper.toWorkoutProgram(requestWorkoutProgram);
        workoutProgram.setClient(client);

        return workoutProgramRepository.save(workoutProgram).getId();
    }
}
