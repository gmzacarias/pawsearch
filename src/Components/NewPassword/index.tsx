import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { resetPasswordConfirmation } from "Lib/api"
import { useForgotPassword } from "Hooks";
import { onNotResetPassword, onResetPassword,onErrorResetPassword } from "Components/Sonner";
import css from "./newpassword.css"

export function NewPassword() {
    const navigate = useNavigate()
    const token = new URLSearchParams(window.location.search).get("token");
    const [newPassword, SetNewPassword] = useForgotPassword()
    const { password, confirmPassword } = newPassword

    useEffect(() => {
        SetNewPassword((prevData) => ({
            ...prevData,
            password: "",
            confirmPassword: ""
        }))
    }, []);

    function handleNewPassword({ target }) {
        const { name, value } = target
        SetNewPassword((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    async function handleResetPassword() {
        if (password !== confirmPassword){
            onNotResetPassword()
            return newPassword
        }
            try {
                const response = await resetPasswordConfirmation(token, password)
                if (!response) {
                    onErrorResetPassword()
                }
                onResetPassword()
                await navigate("/auth")

            } catch (error) {
                console.error("hubo un error al actualizar la contraseña", error)
            }
        return newPassword
    }

    return (
        <main className={css.maincont}>
            <div className={css.resetcontainer}>
                <h1>Restablecer Contraseña</h1>
                <h1>nueva contraseña</h1>
                <label>
                    Nueva Contraseña:
                    <input name="password" type="password" value={password} onChange={handleNewPassword} required />
                </label>
                <label>
                    Confirmar Contraseña:
                    <input name="confirmPassword" type="password" value={confirmPassword} onChange={handleNewPassword} required />
                </label>
                <button type="submit" onClick={handleResetPassword}>Restablecer contraseña</button>
            </div>
        </main>
    )
}