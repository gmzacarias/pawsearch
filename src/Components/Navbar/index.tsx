import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useApp, useDataUser, useAppValue } from "Hooks";
import { FiMenu, FiX, FiUser, FiLogIn, FiLogOut } from "react-icons/fi";
import { MdPets, MdReport } from "react-icons/md";
import css from "./navbar.css"

export function NavBar() {
    const {email,isLogged} = useAppValue()
    const [logged,SetLogged] = useApp()
    const [datauser, SetDataUser] = useDataUser()
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1000) {
                setIsOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    function handleLogout() {
        SetDataUser((prevData) => ({
            ...prevData,
            id: "",
            email: "",
            password: "",
            userName: "",
            profilePhoto: "",
            profilePhotoChanged: false,
        }))
        SetLogged((prevData) => ({
            ...prevData,
            isLogged: false
        }));
        closeMenu()
    };


    function handleToggleMenu() {
        setIsOpen(!isOpen)
    }

    function closeMenu() {
        setIsOpen(false);
    }

    return (
        <nav>
            <div className={css.navbarContainer} >
                <div className={css.navMenu} onClick={handleToggleMenu}>
                    {isOpen ? <FiX className={css.iconsMenu} /> : <FiMenu className={css.iconsMenu} />}
                </div>
                <ul className={`${css.navBar} ${isOpen ? css.open : "none"}`}>
                    {isLogged ?
                        (
                            <>
                                <li className={css.navItem}>
                                    <Link to="/createpet" className={css.navLink} onClick={closeMenu}>
                                        <MdPets className={css.icons} />
                                        Reportar mascota
                                    </Link>
                                </li>
                                <li className={css.navItem}>
                                    <Link to="/mypets" className={css.navLink} onClick={closeMenu}>
                                        <MdReport className={css.icons} />
                                        Mis reportes
                                    </Link>
                                </li>
                                <li className={css.navItem}>
                                    <Link to="/myprofile" className={css.navLink} onClick={closeMenu}>
                                        <FiUser className={css.icons} />
                                        {email}
                                    </Link>
                                </li>
                                <li className={css.navItem}>
                                    <Link to="/" className={css.navLink} onClick={handleLogout}>
                                        <FiLogOut className={css.icons} />
                                        Cerrar Sesion
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className={css.navItem}>
                                    <Link to="/auth" className={css.navLink} onClick={closeMenu}>
                                        <MdPets className={css.icons} />
                                        Reportar mascota
                                    </Link>
                                </li>
                                <li className={css.navItem}>
                                    <Link to="/auth" className={css.navLink} onClick={closeMenu}>
                                        <MdReport className={css.icons} />
                                        Mis reportes
                                    </Link>
                                </li>
                                <li className={css.navItem}>
                                    <Link to="/auth" className={css.navLink} onClick={closeMenu}>
                                        <FiUser className={css.icons} />
                                        Mis datos
                                    </Link>
                                </li>
                                <li className={css.navItem}>
                                    <Link to="/auth" className={css.navLink} onClick={closeMenu}>
                                        <FiLogIn className={css.icons} />
                                        Iniciar sesion
                                    </Link>
                                </li>
                            </>
                        )
                    }
                </ul>
            </div>
        </nav>
    )
}

