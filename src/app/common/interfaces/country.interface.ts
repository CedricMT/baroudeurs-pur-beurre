import { Place } from '@interfaces/place.interface';

export interface Country {
  id: number;
  date: string;
  duration: string;
  name: string;
  text: string;
  countryCode: string;
  places: Place[];
}