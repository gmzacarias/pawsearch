import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { myData } from "Lib/api";
import { useDataUser, useDataUserValue, useApp, useAppValue } from "Hooks";
import { Dropzone } from "Components/Dropzone";
import { Title } from "Components/UI/Title";
import { Input } from "Components/UI/Inputs";
import css from "./mydata.css"

export function MyData() {
    const navigate = useNavigate()
    const { token } = useAppValue()
    const { id } = useDataUserValue()
    const [dataUser, SetDataUser] = useDataUser()
    const [logged, SetLogged] = useApp()
    const { userName, profilePhoto, email } = dataUser

    useEffect(() => {
        async function getData() {
            try {
                const responseData = await myData(id, token)
                if (responseData) {
                    SetDataUser((prevDataUser) => ({
                        ...prevDataUser,
                        ...responseData
                    }))
                    // console.log(dataUser)
                }
            } catch (error) {
                console.error(error)
            }
            return dataUser
        }
        getData()
    }, [id, token, dataUser])


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
    };

    function handleChangeData() {
        navigate("/myprofile/edit-user")
    }

    return (<main className={css.myDataContainer}>
        <h1>Mis Datos</h1>
        <div className={css.dataUserContainer}>
            <label htmlFor="">foto de perfil
                <img className={css.img} src={profilePhoto} alt="" title="foto de perfil" />
            </label>
            <label htmlFor="">Nombre de usuario
                <h2 >{userName}</h2>
            </label>
            <button onClick={handleChangeData}>modificar datos personales</button>
        </div>
        <h2>{email}</h2>
        <Link to="/" onClick={handleLogout}>Cerrar sesion</Link>
    </main>)
}