import React, { useState } from "react";
import { Login } from "Components/Login";
import css from "./signin.css"

export function SignIn() {
  
  return (
    <div className={css.container}>
    <Login/>
    </div>
  )
}