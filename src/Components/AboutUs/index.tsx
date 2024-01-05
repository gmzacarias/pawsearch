import React from "react";
import { useNavigate } from "react-router-dom";
import { Title } from "Components/UI/Title";
import { TextDisplay } from "Components/UI/TextDisplay";
import { Button } from "Components/UI/Buttons";
import css from "./aboutus.css";

export function AboutUs() {
    const navigate = useNavigate()

    function handleReports() {
        navigate("/createpet")
    }

    return (
        <main className={css.aboutUsContainer}>
            <div className={css.cardContainter}>
                <Title>Nosotros</Title>
                <TextDisplay>En Pawsearch, nos preocupamos por reunir a las mascotas con sus dueños lo más rápido posible. ¡Únete a nuestra comunidad y ayuda a hacer la diferencia en la vida de estas adorables criaturas!.<br></br> ¡Regístrate hoy mismo y forma parte de nuestra red solidaria para encontrar mascotas perdidas!</TextDisplay>
                <Button type="button" onClick={handleReports} color="primary">Publicar Reporte</Button>
            </div>
            <div className={css.blobBounce}></div>
        </main>
    );
}

