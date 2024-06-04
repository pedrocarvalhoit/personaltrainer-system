/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { ClientReponse } from '../models/client-reponse';
import { deleteClient } from '../fn/client/delete-client';
import { DeleteClient$Params } from '../fn/client/delete-client';
import { enableClient } from '../fn/client/enable-client';
import { EnableClient$Params } from '../fn/client/enable-client';
import { findAllClients } from '../fn/client/find-all-clients';
import { FindAllClients$Params } from '../fn/client/find-all-clients';
import { findById } from '../fn/client/find-by-id';
import { FindById$Params } from '../fn/client/find-by-id';
import { PageResponseClientReponse } from '../models/page-response-client-reponse';
import { saveClient } from '../fn/client/save-client';
import { SaveClient$Params } from '../fn/client/save-client';
import { updatePersonalData } from '../fn/client/update-personal-data';
import { UpdatePersonalData$Params } from '../fn/client/update-personal-data';
import { uploadProfilePicture } from '../fn/client/upload-profile-picture';
import { UploadProfilePicture$Params } from '../fn/client/upload-profile-picture';

@Injectable({ providedIn: 'root' })
export class ClientService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `saveClient()` */
  static readonly SaveClientPath = '/clients/save';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveClient()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveClient$Response(params: SaveClient$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveClient(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveClient$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveClient(params: SaveClient$Params, context?: HttpContext): Observable<number> {
    return this.saveClient$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `uploadProfilePicture()` */
  static readonly UploadProfilePicturePath = '/clients/photo/{clientId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadProfilePicture()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadProfilePicture$Response(params: UploadProfilePicture$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return uploadProfilePicture(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadProfilePicture$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadProfilePicture(params: UploadProfilePicture$Params, context?: HttpContext): Observable<{
}> {
    return this.uploadProfilePicture$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `enableClient()` */
  static readonly EnableClientPath = '/clients/update-status/{clientId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `enableClient()` instead.
   *
   * This method doesn't expect any request body.
   */
  enableClient$Response(params: EnableClient$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return enableClient(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `enableClient$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  enableClient(params: EnableClient$Params, context?: HttpContext): Observable<number> {
    return this.enableClient$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `updatePersonalData()` */
  static readonly UpdatePersonalDataPath = '/clients/update-personal-data/{clientId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updatePersonalData()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePersonalData$Response(params: UpdatePersonalData$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return updatePersonalData(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updatePersonalData$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePersonalData(params: UpdatePersonalData$Params, context?: HttpContext): Observable<number> {
    return this.updatePersonalData$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `findById()` */
  static readonly FindByIdPath = '/clients/{clientId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById$Response(params: FindById$Params, context?: HttpContext): Observable<StrictHttpResponse<ClientReponse>> {
    return findById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById(params: FindById$Params, context?: HttpContext): Observable<ClientReponse> {
    return this.findById$Response(params, context).pipe(
      map((r: StrictHttpResponse<ClientReponse>): ClientReponse => r.body)
    );
  }

  /** Path part for operation `findAllClients()` */
  static readonly FindAllClientsPath = '/clients/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllClients()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllClients$Response(params?: FindAllClients$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseClientReponse>> {
    return findAllClients(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllClients$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllClients(params?: FindAllClients$Params, context?: HttpContext): Observable<PageResponseClientReponse> {
    return this.findAllClients$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseClientReponse>): PageResponseClientReponse => r.body)
    );
  }

  /** Path part for operation `deleteClient()` */
  static readonly DeleteClientPath = '/clients/delete/{clientId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteClient()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteClient$Response(params: DeleteClient$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return deleteClient(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteClient$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteClient(params: DeleteClient$Params, context?: HttpContext): Observable<number> {
    return this.deleteClient$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

}
