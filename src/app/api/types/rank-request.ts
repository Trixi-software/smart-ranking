import {Address} from "./address";

export interface RankRequest {
  firstName: string;
  sureName: string;
  birthDate: string;
  address: Address;
  taxNumber: string;
}
