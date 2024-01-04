import React from "react";
import { MyData } from "Components/MyData";
import css from "./mydata.css"

export function MyProfile() {

    return (
        <div className={css.container}>
            <MyData />
        </div>
    )
}