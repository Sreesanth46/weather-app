import { listAddedCities } from "~/api";
import { useApiStore } from "~/store";
import { Weather } from "~/types";

export const listWeather = async () => {
  try {
    const response = await listAddedCities();
    const data = JSON.parse(JSON.stringify(response)) as Weather[];

    useApiStore.getState().setWeatherList(data ?? []);
  } catch (error) {
    console.warn("Error fetching data from backend", error);
  }
};
