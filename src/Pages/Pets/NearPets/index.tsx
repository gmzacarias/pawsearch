import React from "react";
import { AroundPets } from "Components/AroundPets";
import { Title } from "Components/UI/Title";
import css from "./nearpets.css"

export function NearPets() {

  return (<div className={css.container}>
    <Title>Mascotas perdidas cerca</Title>
    <AroundPets />
  </div>
  )
} 