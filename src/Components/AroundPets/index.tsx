import React, { useEffect, useState } from "react";
import { nearPets } from "Lib/api";
import { PetCard } from "Components/PetCard";
import css from "./aroundpets.css"

export function AroundPets() {
    const queryParams = new URLSearchParams(window.location.search)
    const lat = queryParams.get("lat")
    const lng = queryParams.get("lng")
    const latitude = parseFloat(lat)
    const longitude = parseFloat(lng)
    const [data, SetData] = useState(null);

    useEffect(() => {
        console.log(latitude, longitude)
        async function petsLists() {
            try {
                const response = await nearPets(latitude, longitude)
                if (response) {
                    const responseData = await response.json()
                    SetData(responseData)
                    console.log(responseData)
                }
            } catch (error) {
                console.error(error)
            }
        }
        petsLists()
    }, []);


    return (
        <main className={css.myReportsContainer}>
            <div className={css.petList}>
                {data && data.map(item =>
                    <PetCard key={item.id} userId={item.userId} petId={item.id} petName={item.name} petPhoto={item.image_URL} zoneReport={item.zone} />
                )}
            </div>
        </main>
    )
}