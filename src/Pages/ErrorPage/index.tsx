import React from "react";
import { Error404 } from "Components/Error404";
import css from "./errorpage.css"

export function ErrorPage() {

    return (
        <div className={css.container}>
            <Error404 />
        </div>
    )
}