package com.personaltrainer.physicaltest.strengthtest;

import com.personaltrainer.client.Client;
import com.personaltrainer.client.ClientRepository;
import com.personaltrainer.physicaltest.TestDescriptionResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.TextStyle;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StrengthTestService {

    private final StrengthTestRepository repository;
    private final ClientRepository clientRepository;
    private final StrengthTestMapper mapper;

    public Integer create(Integer clientId, StrengthTestRequest request) {
        Client client = clientRepository.findById(clientId).get();
        StrengthTest strengthTest = mapper.toEntity(request);
        strengthTest.setMax1Rm(StrengthTestUtil.calculateRm(request.maxLoad()));
        strengthTest.setClient(client);
        repository.save(strengthTest);

        return strengthTest.getId();
    }

    public StrengthTestResultResponse getResult(Integer testId) {
        StrengthTest strengthTest = repository.findById(testId).get();
        return mapper.toResultResponse(strengthTest);
    }


    public TestDescriptionResponse getDescription() {
        return TestDescriptionResponse.builder()
                .description(StrengthTest.DESCRIPTION)
                .build();
    }

    public ExercisesResponse getAllExercieses() {
        List<String> exercises = new ArrayList<>();
        for (Exercise c : Exercise.values()){
            exercises.add(String.valueOf(c));
        }

        return mapper.toExerciseResponse(exercises);

    }

    public List<ExerciseStatsResponse> getBackSquatStats(Integer clientId) {
        Exercise exercise = Exercise.BACK_SQUAT;
        return getExerciseStats(clientId, exercise);
    }

    public List<ExerciseStatsResponse> getDeadliftStats(Integer clientId) {
        Exercise exercise = Exercise.DEADLIFT;
        return getExerciseStats(clientId, exercise);
    }

    public List<ExerciseStatsResponse> getBenchPressStats(Integer clientId) {
        Exercise exercise = Exercise.BENCH_PRESS;
        return getExerciseStats(clientId, exercise);
    }

    public List<ExerciseStatsResponse> getSeatedLowRowStats(Integer clientId) {
        Exercise exercise = Exercise.SEATED_LOW_ROW;
        return getExerciseStats(clientId, exercise);
    }

    //Get stats for exercises
    private List<ExerciseStatsResponse> getExerciseStats(Integer clientId, Exercise exercise) {
        LocalDateTime twelveMonthsAgo = LocalDateTime.now().minusMonths(12).with(TemporalAdjusters.firstDayOfMonth());

        List<StrengthTest> tests = repository.findByClientIdAndExerciseAndDateAfter(clientId, exercise, twelveMonthsAgo);

        List<ExerciseStatsResponse> responses = new ArrayList<>();
        double totalLoad = 0.0;
        int count = 1;

        for(StrengthTest test : tests){
            totalLoad += test.getMaxLoad();
            double avarage = totalLoad / count;

            ExerciseStatsResponse response = ExerciseStatsResponse.builder()
                    .month(test.getCreatedAt().getMonth().getDisplayName(TextStyle.FULL, Locale.ENGLISH))
                    .maxLoadAvarage(avarage)
                    .maxLoad(test.getMaxLoad())
                    .max1Rm(test.getMax1Rm())
                    .build();

            responses.add(response);
            count++;
        }

        return responses;
    }


}
