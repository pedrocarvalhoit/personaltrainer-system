/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ClientUpdateRequest } from '../../models/client-update-request';

export interface UpdatePersonalData$Params {
  clientId: number;
      body: ClientUpdateRequest
}

export function updatePersonalData(http: HttpClient, rootUrl: string, params: UpdatePersonalData$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
  const rb = new RequestBuilder(rootUrl, updatePersonalData.PATH, 'patch');
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

updatePersonalData.PATH = '/clients/update-personal-data/{clientId}';
