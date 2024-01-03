import React from "react";
import { ReportsById } from "Components/ReportsById";
import { Title } from "Components/UI/Title";
import css from "./myreports.css"

export function MyReports() {

    return (
        <div className={css.container}>
            <Title>Mis Reportes</Title>
            <ReportsById />
        </div>
    )
}