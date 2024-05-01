import { useEffect } from "react";
import SearchDropDown from "./components/search/search";
import CurrentWeather from "~/components/current-weather";
import { listWeather } from "~/lib/fetch-api";
import { useApiStore } from "./store";
// import Navigation from "./components/navigation";

function App() {
  const { weatherList } = useApiStore();

  useEffect(() => {
    listWeather();
  }, []);

  return (
    <div className="container p-6">
      {/* <Navigation /> */}
      <SearchDropDown />
      <div className="pt-6">
        {weatherList?.map((weather) => (
          <CurrentWeather key={weather.city} weather={weather} />
        ))}
      </div>
    </div>
  );
}

export default App;
