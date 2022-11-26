import {PersonalData} from "./personal-data";
import {BusinessData} from "./business-data";

export interface Registration {
  personal: PersonalData;
  business: BusinessData;
}
