/* tslint:disable */
/* eslint-disable */
import { ClientReponse } from '../models/client-reponse';
export interface PageResponseClientReponse {
  content?: Array<ClientReponse>;
  first?: boolean;
  last?: boolean;
  pageNumber?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
