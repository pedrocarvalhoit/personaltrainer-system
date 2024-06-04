/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseWorkoutSessionResponse } from '../../models/page-response-workout-session-response';

export interface ListAllByClient$Params {
  page?: number;
  size?: number;
  clientId: number;
}

export function listAllByClient(http: HttpClient, rootUrl: string, params: ListAllByClient$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseWorkoutSessionResponse>> {
  const rb = new RequestBuilder(rootUrl, listAllByClient.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
    rb.path('clientId', params.clientId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseWorkoutSessionResponse>;
    })
  );
}

listAllByClient.PATH = '/workout-sessions/all/{clientId}';
