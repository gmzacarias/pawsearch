import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { recoverPassword } from "Lib/api"
import { useForgotPassword } from "Hooks"
import { onSendEmail } from "Components/Sonner"
import { Title } from "Components/UI/Title"
import { SubTitle } from "Components/UI/Subtitle"
import { Label } from "Components/UI/Label"
import { Input } from "Components/UI/Inputs"
import { Button } from "Components/UI/Buttons"

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
        const {name, value } = target
        SetData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    async function handleSubmit() {
        if (email) {
            try {
                const response = await recoverPassword(email, token)
                SetData((prevData)=>({
                    ...prevData,
                    token:response.token
                }))
                onSendEmail()
                await navigate("/")
            } catch (error) {
                console.error("hubo un error al enviar el email", error)
            }
        }
    }

    return (
        <main>
            <Title>Recuperar contraseña</Title>
            <SubTitle>ingresa tu email,para poder enviarte un codigo asi podes ingresar</SubTitle>
            <label>Email</label>
            <Input
                type="email"
                name="email"
                placeholder="ingrese un email"
                value={email}
                onChange={handleInputChange}
                required
            />
            <Button type="submit" onClick={handleSubmit} >Reenviar codigo</Button>
        </main>
    )

}