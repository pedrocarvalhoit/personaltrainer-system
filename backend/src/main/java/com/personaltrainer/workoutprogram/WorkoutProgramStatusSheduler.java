package com.personaltrainer.workoutprogram;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
public class WorkoutProgramStatusSheduler {

    private final WorkoutProgramService service;

    @Scheduled(cron = "0 0 0 * * ?")//Everyday at midnigth or (fixedRate = 5000) for every 5 seconds
    public void updateProgramStatusByEndDate(){
        LocalDate currentDate = LocalDate.now();

        List<WorkoutProgram> expiredPrograms = service.findProgramByEndDateBefor(currentDate);

        for (WorkoutProgram program : expiredPrograms){
            program.setEnabled(false);
            service.save(program);
        }
    }

}
