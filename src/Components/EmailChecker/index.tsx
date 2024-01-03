import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { checkEmail } from "Lib/api";
import { useApp } from "Hooks";
import { onCheckUser } from "Components/Sonner";
import { Title } from "Components/UI/Title";
import { Label } from "Components/UI/Label";
import { Input } from "Components/UI/Inputs";
import { Button } from "Components/UI/Buttons";
import css from "./emailchecker.css";



export function EmailChecker() {
    const navigate = useNavigate()
    const [inputValue, SetInputValue] = useState("")
    const [email, setEmail] = useApp()

    function handleInput({ target }) {
        const {value } = target;
        SetInputValue(value)
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
            <Title>Bienvenido</Title>
            <div className={css.Logo}></div>
            <label className={css.labels}>Email</label>
            <Input type="email" name="email" placeholder="example@email.com" value={inputValue} onChange={handleInput} required />
            <Button type="button" onClick={handleAuth}  >Continuar</Button>
            <label className={css.labels}>Aún no tenes cuenta?</label>
            <Link className={css.links} to="/auth/signup">
                <Button type="button" >Registrarse</Button>
            </Link>
        </main>
    )
}