import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { resetPasswordConfirmation } from "Lib/api"
import { useForgotPassword } from "Hooks";
import { onNotResetPassword, onResetPassword, onErrorResetPassword } from "Components/Sonner";
import { Title } from "Components/UI/Title"
import { CgPassword } from "react-icons/cg";
import { Label } from "Components/UI/Label"
import { InputPassword } from "Components/UI/Inputs"
import { Button } from "Components/UI/Buttons"
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

    function handleRedirect() {
        navigate("/")
    }

    async function handleResetPassword() {
        if (password !== confirmPassword) {
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
        <main className={css.newPasswordContainer}>
            <div className={css.cardContainer}>
                <Title>Restablecer contraseña</Title>
                <CgPassword className={css.icon} />
                <Label>Nueva contraseña
                    <InputPassword type="password" name="password" placeholder="********" value={password} onChange={handleNewPassword} required />
                </Label>
                <Label>Confirmar contraseña
                    <InputPassword type="password" name="confirmPassword" placeholder="********" value={confirmPassword} onChange={handleNewPassword} required />
                </Label>
                <div className={css.buttons}>
                    <Button type="submit" onClick={handleResetPassword} color="submit" >Confirmar</Button>
                    <Button type="button" onClick={handleRedirect} color="secondary">Cancelar</Button>
                </div>
            </div>
            <div className={css.blobBounce}></div>
        </main>
    )
}