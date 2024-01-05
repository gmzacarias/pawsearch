import React, { useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { signIn } from "Lib/api";
import { useDataUser, useApp, useAppValue } from "Hooks";
import { onLoginFailure, onLoginSuccess } from "Components/Sonner";
import { Title } from "Components/UI/Title"
import { SubTitle } from "Components/UI/Subtitle";
import { Label } from "Components/UI/Label";
import { InputPassword } from "Components/UI/Inputs";
import { Button } from "Components/UI/Buttons";
import { PiPasswordBold } from "react-icons/pi";
import css from "./login.css"

export function Login() {
  const navigate = useNavigate();
  const { email } = useAppValue()
  const [id, SetId] = useDataUser()
  const [data, SetData] = useApp()
  const { password } = data

  useEffect(() => {
    SetData((prevData) => ({
      ...prevData,
      password: ""
    }))
  }, []);

  function handlePassword({ target }) {
    const { name, value } = target
    SetData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  async function handleSignIn() {
    if (email && password) {
      try {
        const response = await signIn(email, password)
        // console.log(response)
        const { userId, token } = response
        if (token === undefined) {
          onLoginFailure()
          SetData((prevData) => ({
            ...prevData,
            token: "token",
            isLogged: false
          }))
        } else {
          SetData((prevData) => ({
            ...prevData,
            token: token,
            isLogged: true
          }))
          SetId((prevDataUser => ({
            ...prevDataUser,
            id: userId
          })))
          onLoginSuccess()
          await navigate("/")
        }
      } catch (error) {
        console.error("hubo un error al iniciar sesion", error)
      }
    }
  }

  return (
    <main className={css.loginContainer}>
       <div className={css.cardContainer}>
      <Title >Iniciar Sesion</Title>
      <PiPasswordBold className={css.icon} />
      <Label>Bienvenido</Label>
      <SubTitle>{email}</SubTitle>
      <Label>Contraseña
        <InputPassword type="password" name="password" placeholder="********" value={password} onChange={handlePassword} required />
      </Label>
      <Button type="button" onClick={handleSignIn} color="submit" >Iniciar sesion</Button>
      <Link className={css.link} to="/forgot-password">
        Olvide mi contraseña
      </Link>
       </div>
       <div className={css.blobBounce}></div>
    </main>
  )
}