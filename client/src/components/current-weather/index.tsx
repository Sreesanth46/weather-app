import { Card } from "~/components/ui/card";
import Clock from "~/components/clock";
import { Weather } from "~/types";
import { Button } from "../ui/button";
import BinIcon from "../icons/bin";
import { deleteWeather } from "~/api";
import { listWeather } from "~/lib/fetch-api";

interface CurrentWeatherProp {
  weather: Weather;
}

const asCelsius = (temperature: number): number => temperature - 273.15;

export default function CurrentWeather({
  weather,
}: Readonly<CurrentWeatherProp>) {
  const today = new Date();
  const day = today.toLocaleString("default", { weekday: "long" });

  return (
    <Card className="relative flex p-4 md:p-6 lg:p-8 h-fit w-full shrink-0 flex-col justify-between overflow-hidden md:h-[25rem]">
      <div>
        <div className="flex">
          <div className="flex-auto"></div>
          <Button
            variant="ghost"
            onClick={() => {
              deleteWeather(weather.id);
              listWeather();
            }}
          >
            <BinIcon />
          </Button>
        </div>
        <div className="flex justify-between text-lg font-semibold">
          <span>{day}</span>
          <Clock />
        </div>
        <div className="text-md mt-2 flex font-bold">
          <span>
            {weather.city}, {weather.country}
          </span>
          <i>
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="ml-0.5 h-4 w-4 fill-none stroke-black dark:stroke-white"
            >
              <path
                d="M7.39993 6.32003L15.8899 3.49003C19.6999 2.22003 21.7699 4.30003 20.5099 8.11003L17.6799 16.6C15.7799 22.31 12.6599 22.31 10.7599 16.6L9.91993 14.08L7.39993 13.24C1.68993 11.34 1.68993 8.23003 7.39993 6.32003Z"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.1101 13.6501L13.6901 10.0601"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </i>
        </div>
      </div>
      <div className="flex justify-center py-7 text-8xl font-bold md:py-10">
        {Math.round(asCelsius(weather.temperature))}&deg;
      </div>
      <div>
        <div className="flex gap-2 dark:text-neutral-500">
          <span>H: {Math.round(asCelsius(weather.maxTemperature))}&deg;</span>
          <span>L: {Math.round(asCelsius(weather.minTemperature))}&deg;</span>
        </div>
      </div>
    </Card>
  );
}
