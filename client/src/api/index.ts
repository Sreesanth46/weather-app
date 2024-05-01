import { WeatherUrl } from "~/constants/api-constants";
import { ResponseData } from "~/lib/validation/response";
import { Weather } from "~/types";
import { cFetch } from "~/utils/fetch";

export const listAddedCities = () =>
  cFetch<ResponseData<Weather[]>>(WeatherUrl, { method: "GET" });

export const getWeather = (city: string) =>
  cFetch<ResponseData<Weather>>(`${WeatherUrl}/${city}`, { method: "GET" });

export const addWeather = (weather: Weather) =>
  cFetch<ResponseData<Weather>>(WeatherUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(weather),
  });

export const deleteWeather = (id: string) =>
  cFetch<ResponseData<null>>(`${WeatherUrl}/${id}`, { method: "DELETE" });
