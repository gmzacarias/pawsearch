import React from "react"
import { SendEmail } from "Components/SendEmail"
import css from "./forgotpassword.css"

export function ForgotPassword() {

    return (
        <div className={css.container}>
            <SendEmail />
        </div>
    )
}