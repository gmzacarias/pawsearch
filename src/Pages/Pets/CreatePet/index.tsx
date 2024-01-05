import React from "react";
import { NewPet } from "Components/NewPet";
import css from "./createpet.css"

export function CreatePet() {

    return (
        <div className={css.container}>
            <NewPet />
        </div>
    )

}