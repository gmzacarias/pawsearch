import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "Components/Header";
import { Footer } from "Components/Footer"
// import ("./layout.css") //importacion dinamica;
import css from "./layout.css"

export function Layout() {

    return (
        <main className={css.layoutContainer} >
            <Header />
            <div className={css.container}>
                <Outlet />
            </div>
            <div className={css.footerContainer}>
                <Footer />
            </div>
        </main>
    )
}