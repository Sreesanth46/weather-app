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
  city: string;
  country: string;
  longitude: number;
  latitude: number;
  min_temperature: number;
  max_temperature: number;
  temperature: number;
}
