import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { checkEmail } from "Lib/api";
import { useApp } from "Hooks";
import { onCheckUser } from "Components/Sonner";
import { FiLogIn } from "react-icons/fi";
import { Title } from "Components/UI/Title";
import { Label } from "Components/UI/Label";
import { InputEmail } from "Components/UI/Inputs";
import { Button } from "Components/UI/Buttons";
import css from "./emailchecker.css";



export function EmailChecker() {
    const navigate = useNavigate()
    const [inputValue, SetInputValue] = useState("")
    const [email, setEmail] = useApp()

    function handleInput({ target }) {
        const { value } = target;
        SetInputValue(value)
    }

    function handleRegister() {
        navigate("/auth/signup")
    }

    async function handleAuth() {
        const exists = await checkEmail(inputValue)
        if (!exists) {
            onCheckUser()
        } else if (exists) {
            setEmail((prevData) => ({
                ...prevData,
                email: inputValue
            }))
            await navigate("/auth/signin")
        }
        SetInputValue("")
        return email
    }

    return (
        <main className={css.EmailCheckerContainer}>
            <Title>INGRESAR</Title>
            <FiLogIn className={css.icon} />
            <Label>Email
                <InputEmail type="email" name="email" placeholder="mail@dominio.com" value={inputValue} onChange={handleInput} required />
            </Label>
            <Button type="button" onClick={handleAuth} color="submit"  >Continuar</Button>
            <p className={css.text}>Aún no tenes cuenta?</p>
            <Link className={css.link} to="/auth/signup">
                Registrate
            </Link>
        </main>
    )
}