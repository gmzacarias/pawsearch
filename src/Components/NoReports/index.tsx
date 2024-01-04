import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { SubTitle } from "Components/UI/Subtitle"
import { Button } from "Components/UI/Buttons"
import { ImageNoReport } from "Components/UI/ImageNoReport"
import css from "./noreports.css"

export function NoReports() {
    const location = useLocation()
    const navigate = useNavigate()
    const host = "127.0.0.1:8080" ? "https://prueba.com" : "https://localhost:8080";
    const [checkPage, SetCheckPage] = useState(false)
    useEffect(() => {
        SetCheckPage(location.pathname === `http:${host}/mypets'`);
    }, [location.pathname]);

    function handleReports() {
        navigate("/createpet")
    }

    return (
        <div className={css.noReportsContainer}>
            <SubTitle>{checkPage ? 'Aún no reportaste mascotas perdidas' : 'No se reportaron mascotas cerca'}</SubTitle>
            <ImageNoReport alt="dog-detective" title="dog-detective" />
            <Button type="button" onClick={handleReports} color="primary">Publicar Reporte</Button>
        </div>
    )

}

