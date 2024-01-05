import React from "react";
import { UpdatePet } from "Components/UpdatePet";
import css from "./editpet.css"

export function EditPet() {

    return (
        <div className={css.container}>
            <UpdatePet />
        </div>
    )
}