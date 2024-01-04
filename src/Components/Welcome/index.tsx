import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "Hooks";
import { ImageHome } from "Components/UI/ImageHome";
import { SubTitle } from "Components/UI/Subtitle";
import { TextDisplay } from "Components/UI/TextDisplay";
import { Button } from "Components/UI/Buttons";
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
        <main className={css.welcomeContainer}>
            <ImageHome alt="dog&cat" title="dog&cat" />
            <SubTitle>Reporta y encontra tu mascota</SubTitle>
            <TextDisplay>Encontrá y reportá mascotas perdidas.</TextDisplay>
            <div className={css.buttons}>
            <Button type="button" onClick={handleCoordinates} color="submit" >Dar mi ubicación actual</Button>
            <Button type="button" onClick={handleClick} color="primary" >¿Como Funciona Pawsearch?</Button>
            </div>
        </main>
    )
}