/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createSession } from '../fn/workout-session/create-session';
import { CreateSession$Params } from '../fn/workout-session/create-session';
import { executeSession } from '../fn/workout-session/execute-session';
import { ExecuteSession$Params } from '../fn/workout-session/execute-session';
import { listAllByClient } from '../fn/workout-session/list-all-by-client';
import { ListAllByClient$Params } from '../fn/workout-session/list-all-by-client';
import { PageResponseWorkoutSessionResponse } from '../models/page-response-workout-session-response';

@Injectable({ providedIn: 'root' })
export class WorkoutSessionService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `createSession()` */
  static readonly CreateSessionPath = '/workout-sessions/create/{clientId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createSession()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createSession$Response(params: CreateSession$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return createSession(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createSession$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createSession(params: CreateSession$Params, context?: HttpContext): Observable<number> {
    return this.createSession$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `executeSession()` */
  static readonly ExecuteSessionPath = '/workout-sessions/execute/{sessionId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `executeSession()` instead.
   *
   * This method doesn't expect any request body.
   */
  executeSession$Response(params: ExecuteSession$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return executeSession(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `executeSession$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  executeSession(params: ExecuteSession$Params, context?: HttpContext): Observable<number> {
    return this.executeSession$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `listAllByClient()` */
  static readonly ListAllByClientPath = '/workout-sessions/all/{clientId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listAllByClient()` instead.
   *
   * This method doesn't expect any request body.
   */
  listAllByClient$Response(params: ListAllByClient$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseWorkoutSessionResponse>> {
    return listAllByClient(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `listAllByClient$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listAllByClient(params: ListAllByClient$Params, context?: HttpContext): Observable<PageResponseWorkoutSessionResponse> {
    return this.listAllByClient$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseWorkoutSessionResponse>): PageResponseWorkoutSessionResponse => r.body)
    );
  }

}
