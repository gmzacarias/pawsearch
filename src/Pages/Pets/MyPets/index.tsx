import React from "react";
import { PetsById } from "Components/PetsById";
import { Title } from "Components/UI/Title";
import css from "./mypets.css"

export function MyPets() {

    return (
        <div className={css.container}>
            <Title>Mis Mascotas</Title>
            <PetsById />
        </div>
    )
}