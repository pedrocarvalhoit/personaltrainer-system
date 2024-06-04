/* tslint:disable */
/* eslint-disable */
import { WorkoutProgramResponse } from '../models/workout-program-response';
export interface PageResponseWorkoutProgramResponse {
  content?: Array<WorkoutProgramResponse>;
  first?: boolean;
  last?: boolean;
  pageNumber?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
