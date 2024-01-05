import React from "react";
import { Register } from "Components/Register";
import css from "./signup.css"

export function SignUp() {

    return (
        <div className={css.container}>
            <Register />
        </div>
    )
}
