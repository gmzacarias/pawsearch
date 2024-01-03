import React, { useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { signIn } from "Lib/api";
import { useDataUser, useApp, useAppValue } from "Hooks";
import { onLoginFailure, onLoginSuccess } from "Components/Sonner";
import { Title } from "Components/UI/Title"
import { SubTitle } from "Components/UI/Subtitle";
import { Label } from "Components/UI/Label";
import { Input } from "Components/UI/Inputs";
import { Button } from "Components/UI/Buttons";
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
      <Title >Inicio de Sesion</Title>
      <SubTitle>bienvenido:{email}</SubTitle>
      <label>Password</label>
      <Input type="text" name="password" placeholder="Ingrese su contraseña" value={password} onChange={handlePassword} required></Input>
      <Button type="button" onClick={handleSignIn} >Iniciar sesion</Button>
      <Link className={css.links} to="/forgot-password">
        <p>olvide mi contraseña</p>
      </Link>
    </main>
  )
}