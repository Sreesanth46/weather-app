import { env } from "../env";

export const GeoApiBaseUrl = "https://wft-geo-db.p.rapidapi.com/v1/geo";
export const GeoApiCities = `${GeoApiBaseUrl}/cities?minPopulation=1000000`;

export const GeoApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": env.VITE_RAPID_API_KEY,
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};
