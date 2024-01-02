import React, { useEffect, useState } from "react";
import { Title } from "Components/UI/Title";
import { TextDisplay } from "Components/UI/TextDisplay";
import css from "./about.css";

export function About() {
 
  return (
    <main className={css.aboutContainer}>
      <div className={css.about}>
        <Title>Nosotros</Title>
        <TextDisplay>En "Pets App", nos preocupamos por reunir a las mascotas con sus dueños lo más rápido posible. ¡Únete a nuestra comunidad y ayuda a hacer la diferencia en la vida de estas adorables criaturas!.<br></br> ¡Regístrate hoy mismo y forma parte de nuestra red solidaria para encontrar mascotas perdidas!</TextDisplay>
        
      </div>
    </main>
  );
}

