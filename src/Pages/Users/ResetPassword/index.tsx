import React from "react"
import { NewPassword } from "Components/NewPassword"
import css from "./reset-password.css"

export function ResetPassword() {

    return (
        <div className={css.container}>
        <NewPassword />
        </div>
    )
}