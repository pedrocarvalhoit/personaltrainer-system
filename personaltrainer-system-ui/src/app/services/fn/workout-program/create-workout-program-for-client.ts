/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { WorkoutProgramCreateRequest } from '../../models/workout-program-create-request';

export interface CreateWorkoutProgramForClient$Params {
  clientId: number;
      body: WorkoutProgramCreateRequest
}

export function createWorkoutProgramForClient(http: HttpClient, rootUrl: string, params: CreateWorkoutProgramForClient$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
  const rb = new RequestBuilder(rootUrl, createWorkoutProgramForClient.PATH, 'post');
  if (params) {
    rb.path('clientId', params.clientId, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
    })
  );
}

createWorkoutProgramForClient.PATH = '/workout-programs/create/{clientId}';
