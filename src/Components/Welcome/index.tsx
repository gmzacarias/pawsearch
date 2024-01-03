import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "Hooks";
import { Title } from "Components/UI/Title";
import { SubTitle } from "Components/UI/Subtitle";
import { TextDisplay } from "Components/UI/TextDisplay";
import { Button } from "Components/UI/Buttons";
import { FiMapPin } from "react-icons/fi";
import css from "./welcome.css"

export function Welcome() {
    const navigate = useNavigate();
    const [position, SetPosition] = useApp()

    useEffect(() => {
        SetPosition((prevData) => ({
            ...prevData,
            lat: 0,
            lng: 0,
        }));
    }, []);

    function handleClick() {
        navigate("/about")
    }

    async function handleCoordinates() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    SetPosition((prevData) => ({
                        ...prevData,
                        lat: lat,
                        lng: lng
                    }));
                    navigate(`/near-pets?lat=${lat}&lng=${lng}`);
                },
                (error) => {
                    console.error('Error al obtener la posición:', error);
                }
            );
        } else {
            console.error('Tu navegador no soporta la geolocalización.');
        }
    }

    return (
        <section className={css.welcomeContainer}>
            <Title>Bienvenido a Pets</Title>
            <SubTitle>Reporta y encontra tu mascota</SubTitle>
            <TextDisplay>Encontrá y reportá mascotas perdidas cerca de tu ubicación</TextDisplay>
            <div className={css.buttonsContainer}>
                <button type="submit" className={css.button} onClick={handleCoordinates}>
                    <FiMapPin className={css.icons} />
                    Dar mi ubicación actual</button>
                <Button type="button" onClick={handleClick}  >¿Como Funciona Pawsearch?</Button>
                <div className={css.box}></div>
            </div>
        </section>
    )
}