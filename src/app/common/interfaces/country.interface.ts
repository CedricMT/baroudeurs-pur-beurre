import { Location } from '@interfaces/location.interface';

export interface Country {
  id: number;
  date: string;
  duration: string;
  name: string;
  text: string;
  countryCode: string;
  locations: Location[];
}