import React, { useEffect, useState } from "react";
import { useSearchLocation } from "Hooks";
import { onNotSearch } from "Components/Sonner";
import { InputForm, InputSearch } from "Components/UI/Inputs";
import { TbMapPinSearch } from "react-icons/tb";
import css from "./searchleaflet.css";

type SearchProps = {
    coordinates?: (geoSearch: { lat: number; lon: number; display_name: string }) => void;
    currentSearch?: string
    required?: boolean
}

export function SearchLeaflet({ coordinates, currentSearch, required }: SearchProps) {
    const [searchText, setSearchText] = useState("")
    const [position, SetPosition] = useSearchLocation()

    useEffect(() => {
        SetPosition({
            lat: -34.6037389,
            lon: -58.3815704,
            display_name: ""
        });
        if (currentSearch) {
            setSearchText(currentSearch)
        } else {
            setSearchText("")
        }
    }, [currentSearch]);

    function handleInput({ target }) {
        const text = target.value
        setSearchText(text)
    }

    async function handleSearch(event) {
        event.preventDefault()
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${searchText}&countrycodes=ar`
            );
            if (response.ok) {
                const data = await response.json();
                if (data.length > 0) {
                    SetPosition((prevData) => ({
                        ...prevData,
                        lat: data[0].lat,
                        lon: data[0].lon,
                        display_name: data[0].display_name
                    }));
                    if (coordinates) {
                        coordinates({
                            lat: data[0].lat,
                            lon: data[0].lon,
                            display_name: data[0].display_name
                        });
                    }
                } else {
                    onNotSearch()
                }
            }
        } catch (error) {
            console.error('Error al realizar la búsqueda:', error);
        }
        return position
    };

    return (
        <div>
            <InputSearch type="text" placeholder="Ingrese una ubicacion" value={searchText} onChange={handleInput} onClick={handleSearch} />
        </div>
    )
}