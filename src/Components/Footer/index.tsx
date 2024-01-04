import React from "react";
import { Link } from "react-router-dom";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi"
import logo from "Assets/logo.png"
import css from "./footer.css"

export function Footer() {
    const DATE = new Date();
    const YEAR = DATE.getFullYear();

    return (
        <footer className={css.footerContainer}>
            <div className={css.logoContainer}>
                <Link className={css.links} to="/">
                    <img src={logo} className={css.logo} />
                </Link>
            </div>
            <h1 className={css.titleFooter}>Social Links</h1>
            <div className={css.linksContainer}>
                <Link className={css.links} to="https://www.linkedin.com/in/gastonmzacarias/" target="_blank">
                    <FiLinkedin className={css.footerIcons} />
                </Link>
                <Link className={css.links} to="https://github.com/gmzacarias" target="_blank">
                    <FiGithub className={css.footerIcons} />
                </Link>
                <Link className={css.links} to="mailto:gastonmzacarias@gmail.com" target="_blank">
                    <FiMail className={css.footerIcons} />
                </Link>
            </div>
            <div className={css.copyrightContainer}>
                <h3 className={css.copyright}>Copyright©{YEAR} Gaston Mauro Zacarias</h3>
            </div>
        </footer>
    )
}