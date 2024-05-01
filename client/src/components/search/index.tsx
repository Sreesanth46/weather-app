import React, { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import { GeoApiCities, GeoApiOptions } from "~/constants/api-constants";
import useDebounce from "~/hooks/useDebounce";
import { ResponseData } from "~/lib/validation/response";
import type { ICity } from "~/types";
import { cFetch } from "~/utils/fetch";

interface SearchProps {
  cities: ICity[];
  onSearchChange: (q: string) => void;
}

export function Search({ onSearchChange }: Readonly<SearchProps>) {
  const [open, setOpen] = useState(false);
  const [cities, setCities] = useState<ICity[]>([]);
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    getCities(debouncedSearchText);
  }, [debouncedSearchText]);

  const getCities = async (search: string) => {
    try {
      const response = await cFetch<ResponseData<ICity[]>>(
        `${GeoApiCities}&namePrefix=${search}`,
        GeoApiOptions
      );
      setCities(response.data ?? []);
    } catch (error) {
      console.warn("Error fetching cities", error);
    }
  };

  console.log({ cities });

  return (
    <>
      <p className="text-sm text-muted-foreground">
        Press{"  "}
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>J
        </kbd>
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Type a city..."
          value={searchText}
          onChangeCapture={(e) =>
            setSearchText((e.target as HTMLInputElement).value)
          }
        />
        <CommandList>
          {!cities.length && <CommandEmpty>No results found.</CommandEmpty>}
          <ListCities cities={cities} />
        </CommandList>
      </CommandDialog>
    </>
  );
}

const ListCities: React.FC<{ cities: ICity[] }> = ({ cities }) => (
  <CommandGroup>
    {cities.map((city) => (
      <CommandItem key={city.id}>
        <span>
          {city.name}, {city.countryCode}
        </span>
      </CommandItem>
    ))}
  </CommandGroup>
);
