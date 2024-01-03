import React, { useEffect, useState } from "react";
import { nearPets } from "Lib/api";
import { PetCard } from "Components/PetCard";
import { NoReports } from "Components/NoReports"
import css from "./aroundpets.css"

export function AroundPets() {
    const queryParams = new URLSearchParams(window.location.search)
    const lat = queryParams.get("lat")
    const lng = queryParams.get("lng")
    const latitude = parseFloat(lat)
    const longitude = parseFloat(lng)
    const [noPets, SetNoPets] = useState(false)
    const [data, SetData] = useState(null);

    useEffect(() => {
        // console.log(latitude, longitude)
        async function petsLists() {
            try {
                const response = await nearPets(latitude, longitude)
                if (response) {
                    const responseData = await response.json()
                    console.log(responseData)
                    if (responseData.length < 1) {
                        SetNoPets(true)
                        console.log("no hay mascotas cerca")
                        return
                    } else {
                        SetData(responseData)
                    }
                }
                console.log("no hay respuesta")
            } catch (error) {
                console.error(error)
            }
        }
        petsLists()
    }, []);


    return (
        <main className={css.myReportsContainer}>
            {noPets ? (
                <NoReports></NoReports>
            ) : (
                <div className={css.petList}>
                    {data && data.map(item =>
                        <PetCard key={item.id} userId={item.userId} petId={item.id} petName={item.name} petPhoto={item.image_URL} zoneReport={item.zone} />
                    )}
                </div>
            )
            }
        </main>
    )
}