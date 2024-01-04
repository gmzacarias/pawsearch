import React from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "Components/UI/Buttons"
import { SubTitle } from "Components/UI/Subtitle"
import { Label } from "Components/UI/Label"
import { ImageError404 } from "Components/UI/ImageError404"
import css from "./error404.css"

export function Error404() {
    const navigate = useNavigate()

    function handleRedirect() {
        navigate("/")
    }

    return (
        <main className={css.errorContainer}>
            <div className={css.card}>
                <ImageError404 alt="pagina no encontrada" title="pagina no encontrada" ></ImageError404>
                <SubTitle>Página no encontrada.</SubTitle>
                <Label>visita nuestra página de inicio para encontrar lo que necesitas.</Label>
                <Button type="button" onClick={handleRedirect} color="primary">volver al home</Button>
            </div>
        </main>
    )

}