/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UpdateProgramDateRequest } from '../../models/update-program-date-request';

export interface UpdateProgramDate$Params {
  programId: number;
      body: UpdateProgramDateRequest
}

export function updateProgramDate(http: HttpClient, rootUrl: string, params: UpdateProgramDate$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
  const rb = new RequestBuilder(rootUrl, updateProgramDate.PATH, 'patch');
  if (params) {
    rb.path('programId', params.programId, {});
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

updateProgramDate.PATH = '/workout-programs/update-date/{programId}';
