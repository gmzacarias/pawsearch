import React from "react";
import { EditUser } from "Components/EditUser";
import css from "./editprofile.css"

export function EditProfile() {

    return (
        <div className={css.container}>
            <EditUser />
        </div>
    )
}