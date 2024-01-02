import React, { useState, useEffect } from "react";
import { myReports } from "Lib/api";
import { useDataUserValue, useAppValue, useAddPet } from "Hooks";
import { PetCard } from "Components/PetCard";
import css from "./reportsbyid.css"

export function ReportsById(){
    const [pets, SetPets] = useAddPet()
    const [data, SetData] = useState(null);
    const { id } = useDataUserValue()
    const { token } = useAppValue()

    useEffect(() => {
        async function getPets() {
            try {
                const response = await myReports(id, token)
                if (response.ok) {
                    const responseData = await response.json()
                    SetData(responseData)
                    SetPets(responseData)
                    // console.log(responseData)
                } else {
                    console.log("no hay respuesta")
                }
            } catch (error) {
                console.error(error)
            }
        }
        getPets()
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