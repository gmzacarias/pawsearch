import React from "react";
import { Welcome } from "Components/Welcome";
import css from "./home.css"

export function Home() {

    return (
        <div className={css.container}>
            <Welcome />
        </div>
    )
}