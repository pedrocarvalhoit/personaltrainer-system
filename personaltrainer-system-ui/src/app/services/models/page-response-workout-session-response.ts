/* tslint:disable */
/* eslint-disable */
import { WorkoutSessionResponse } from '../models/workout-session-response';
export interface PageResponseWorkoutSessionResponse {
  content?: Array<WorkoutSessionResponse>;
  first?: boolean;
  last?: boolean;
  pageNumber?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
