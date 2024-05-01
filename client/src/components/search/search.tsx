import { Input } from "../ui/input";
import { ICity } from "~/types";
import { useEffect, useState } from "react";
import { cFetch } from "~/utils/fetch";
import { ResponseData } from "~/lib/validation/response";
import { GeoApiCities, GeoApiOptions } from "~/constants/api-constants";
import useDebounce from "~/hooks/useDebounce";

const SearchDropDown = () => {
  const [cities, setCities] = useState<ICity[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const debouncedSearchText = useDebounce(searchText, 500);

  useEffect(() => {
    const searchContainer = document.getElementById("search-container");

    const handleClickEvent = (event: MouseEvent) => {
      const clickedElement = event.target;

      if (clickedElement instanceof Node) {
        if (!searchContainer?.contains(clickedElement)) {
          setIsDropdownOpen(false);
        }
      }
    };

    document.addEventListener("click", handleClickEvent);
  });

  useEffect(() => {
    if (isDropdownOpen) getCities(debouncedSearchText);
  }, [debouncedSearchText]);

  const getCities = async (search: string) => {
    try {
      setIsFetching(true);
      const response = await cFetch<ResponseData<ICity[]>>(
        `${GeoApiCities}&namePrefix=${search}`,
        GeoApiOptions
      );
      setCities(response.data ?? []);
    } catch (error) {
      console.warn("Error fetching cities", error);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div id="search-container" className="flex flex-col gap-2">
      <Input
        placeholder="Enter city name"
        value={searchText}
        onFocus={() => setIsDropdownOpen(true)}
        onChange={(e) => setSearchText(e.target.value)}
      />
      {isDropdownOpen && (
        <ul className="rounded-md border text-sm">
          {!cities.length && (
            <li className="p-2 hover:bg-slate-100">
              {isFetching ? "Loadig..." : "Not found"}
            </li>
          )}
          {cities.map((city) => {
            const label = `${city.name}, ${city.countryCode}`;
            return (
              <li className="p-2 hover:bg-slate-100" key={city.id}>
                <button
                  className="w-full text-start pl-1"
                  onClick={() => {
                    setSearchText(label);
                    setIsDropdownOpen(false);
                  }}
                >
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SearchDropDown;
