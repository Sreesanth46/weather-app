import { create } from "zustand";
import { DEFAULT_LOCATION } from "~/constants/data-constants";
import { Weather } from "~/types";

interface WeatherState {
  lat: string;
  lon: string;
  city: string;
  setLatAndLng: (lat: string, lon: string) => void;
  setCity: (city: string) => void;
}
export const useWeatherStore = create<WeatherState>()((set) => ({
  lat: DEFAULT_LOCATION.coord.lat,
  lon: DEFAULT_LOCATION.coord.lon,
  city: DEFAULT_LOCATION.city,

  setLatAndLng: (lat, lon) =>
    set((state) => ({
      ...state,
      lat,
      lon,
    })),
  setCity: (city) =>
    set((state) => ({
      ...state,
      city,
    })),
}));

interface ApiStore {
  weatherList: Weather[];
  setWeatherList: (weatherList: Weather[]) => void;
}

export const useApiStore = create<ApiStore>()((set) => ({
  weatherList: [],

  setWeatherList: (weatherList) =>
    set((state) => ({
      ...state,
      weatherList,
    })),
}));
