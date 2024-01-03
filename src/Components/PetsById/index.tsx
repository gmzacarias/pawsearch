import React, { useState, useEffect } from "react";
import { myPets } from "Lib/api";
import { useDataUserValue, useAppValue, useAddPet } from "Hooks";
import { PetCard } from "Components/PetCard";
import { NoReports } from "Components/NoReports";
import css from "./petsbyid.css"

export function PetsById() {
    const [noReports, SetNoReports] = useState(false)
    const [pets, SetPets] = useAddPet()
    const [data, SetData] = useState(null);
    const { id } = useDataUserValue()
    const { token } = useAppValue()

    useEffect(() => {
        async function getPets() {
            try {
                const response = await myPets(id, token)
                if (response.ok) {
                    const responseData = await response.json()
                    console.log(responseData)
                    if (responseData.length < 1) {
                        SetNoReports(true)
                        // console.log("no hay mascotas")
                        return
                    } else {
                        SetData(responseData)
                        SetPets(responseData)
                    }
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
            {noReports ? (
                <NoReports></NoReports>
            ) : (
                <div className={css.petList}>
                    {data && data.map(item =>
                        <PetCard key={item.id} userId={item.userId} petId={item.id} petName={item.name} petPhoto={item.image_URL} zoneReport={item.zone} />
                    )}
                </div>
            )}
        </main>
    )
}
