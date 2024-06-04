/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createWorkoutProgramForClient } from '../fn/workout-program/create-workout-program-for-client';
import { CreateWorkoutProgramForClient$Params } from '../fn/workout-program/create-workout-program-for-client';
import { listAllDisabled } from '../fn/workout-program/list-all-disabled';
import { ListAllDisabled$Params } from '../fn/workout-program/list-all-disabled';
import { listAllEnabled } from '../fn/workout-program/list-all-enabled';
import { ListAllEnabled$Params } from '../fn/workout-program/list-all-enabled';
import { PageResponseWorkoutProgramResponse } from '../models/page-response-workout-program-response';
import { updateProgramDate } from '../fn/workout-program/update-program-date';
import { UpdateProgramDate$Params } from '../fn/workout-program/update-program-date';
import { updateStatus } from '../fn/workout-program/update-status';
import { UpdateStatus$Params } from '../fn/workout-program/update-status';

@Injectable({ providedIn: 'root' })
export class WorkoutProgramService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `createWorkoutProgramForClient()` */
  static readonly CreateWorkoutProgramForClientPath = '/workout-programs/create/{clientId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createWorkoutProgramForClient()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createWorkoutProgramForClient$Response(params: CreateWorkoutProgramForClient$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return createWorkoutProgramForClient(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createWorkoutProgramForClient$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createWorkoutProgramForClient(params: CreateWorkoutProgramForClient$Params, context?: HttpContext): Observable<number> {
    return this.createWorkoutProgramForClient$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `updateStatus()` */
  static readonly UpdateStatusPath = '/workout-programs/update-status/{programId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateStatus$Response(params: UpdateStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return updateStatus(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateStatus(params: UpdateStatus$Params, context?: HttpContext): Observable<number> {
    return this.updateStatus$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `updateProgramDate()` */
  static readonly UpdateProgramDatePath = '/workout-programs/update-date/{programId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateProgramDate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateProgramDate$Response(params: UpdateProgramDate$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return updateProgramDate(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateProgramDate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateProgramDate(params: UpdateProgramDate$Params, context?: HttpContext): Observable<number> {
    return this.updateProgramDate$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `listAllEnabled()` */
  static readonly ListAllEnabledPath = '/workout-programs/enabled/{clientId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listAllEnabled()` instead.
   *
   * This method doesn't expect any request body.
   */
  listAllEnabled$Response(params: ListAllEnabled$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseWorkoutProgramResponse>> {
    return listAllEnabled(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `listAllEnabled$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listAllEnabled(params: ListAllEnabled$Params, context?: HttpContext): Observable<PageResponseWorkoutProgramResponse> {
    return this.listAllEnabled$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseWorkoutProgramResponse>): PageResponseWorkoutProgramResponse => r.body)
    );
  }

  /** Path part for operation `listAllDisabled()` */
  static readonly ListAllDisabledPath = '/workout-programs/disabled/{clientId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listAllDisabled()` instead.
   *
   * This method doesn't expect any request body.
   */
  listAllDisabled$Response(params: ListAllDisabled$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseWorkoutProgramResponse>> {
    return listAllDisabled(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `listAllDisabled$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listAllDisabled(params: ListAllDisabled$Params, context?: HttpContext): Observable<PageResponseWorkoutProgramResponse> {
    return this.listAllDisabled$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseWorkoutProgramResponse>): PageResponseWorkoutProgramResponse => r.body)
    );
  }

}
