import React from "react";
import { PetSighting } from "Components/PetSighting";
import css from "./reportpet.css"

export function ReportPet() {

  return (
    <div className={css.container}>
      <PetSighting />
    </div>
  )
} 