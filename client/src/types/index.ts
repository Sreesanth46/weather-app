type Coordinates = {
  lon: string;
  lat: string;
};
export type Location = {
  city: string;
  coord: Coordinates;
};

export interface ICity {
  id: number;
  wikiDataId: string;
  type: string;
  city: string;
  name: string;
  country: string;
  countryCode: string;
  region: string;
  regionCode: string;
  regionWdId: string;
  latitude: number;
  longitude: number;
  population: number;
}

export interface Weather {
  id: string;
  city: string;
  country: string;
  longitude: number;
  latitude: number;
  minTemperature: number;
  maxTemperature: number;
  temperature: number;
}
