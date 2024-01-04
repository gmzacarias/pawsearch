import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { NavBar } from "Components/Navbar";
import logo from "Assets/logo.png"
import css from "./header.css"

export function Header() {
    
    return (
        <main className={css.headerContainer}>
            <div className={css.logoContainer}>
                 <Link className={css.links} to="/">
                <img src={logo} className={css.logo} />
            </Link>
            </div>
            <NavBar />
        </main>
    )
}