/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseWorkoutProgramResponse } from '../../models/page-response-workout-program-response';

export interface ListAllEnabled$Params {
  page?: number;
  size?: number;
  clientId: number;
}

export function listAllEnabled(http: HttpClient, rootUrl: string, params: ListAllEnabled$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseWorkoutProgramResponse>> {
  const rb = new RequestBuilder(rootUrl, listAllEnabled.PATH, 'get');
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
      return r as StrictHttpResponse<PageResponseWorkoutProgramResponse>;
    })
  );
}

listAllEnabled.PATH = '/workout-programs/enabled/{clientId}';
