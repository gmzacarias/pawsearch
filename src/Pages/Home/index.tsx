import React from "react";
import { Welcome } from "Components/Welcome";
import css from "./home.css"

export function Home() {

    return (
        <main className={css.container}>
            <Welcome />
        </main>
    )
}