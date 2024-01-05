import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { recoverPassword } from "Lib/api"
import { useForgotPassword } from "Hooks"
import { onSendEmail } from "Components/Sonner"
import { Title } from "Components/UI/Title"
import { FiMail } from "react-icons/fi";
import { Label } from "Components/UI/Label"
import { InputEmail } from "Components/UI/Inputs"
import { Button } from "Components/UI/Buttons"
import css from "./sendemail.css"

export function SendEmail() {
    const navigate = useNavigate()
    const [data, SetData] = useForgotPassword()
    const { email, token } = data

    useEffect(() => {
        SetData((prevData) => ({
            ...prevData,
            email: "",
            token: "",
        }))
    }, []);

    function handleInputChange({ target }) {
        const { name, value } = target
        SetData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    function handleRedirect() {
        navigate("/")
    }

    async function handleSubmit() {
        if (email) {
            try {
                const response = await recoverPassword(email, token)
                SetData((prevData) => ({
                    ...prevData,
                    token: response.token
                }))
                onSendEmail()
                await navigate("/")
            } catch (error) {
                console.error("hubo un error al enviar el email", error)
            }
        }
    }

    return (
        <main className={css.sendEmailContainer}>
            <div className={css.cardContainer}>
                <Title>Recuperar contraseña</Title>
                <FiMail className={css.icon} />
                <Label>Email
                    <InputEmail type="email" name="email" placeholder="mail@dominio.com" value={email} onChange={handleInputChange} required />
                </Label>
                <Label>Te enviaremos un codigo asi podes ingresar</Label>
                <div className={css.buttons}>
                    <Button type="button" onClick={handleSubmit} color="submit" >Reenviar codigo</Button>
                    <Button type="button" onClick={handleRedirect} color="secondary">Volver</Button>
                </div>
            </div>
            <div className={css.blobBounce}></div>
        </main>
    )

}