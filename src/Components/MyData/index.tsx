import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { myData } from "Lib/api";
import { useDataUser, useDataUserValue, useApp, useAppValue } from "Hooks";
import { Title } from "Components/UI/Title";
import { Label } from "Components/UI/Label";
import { ImageForms } from "Components/UI/ImageForms";
import { Button } from "Components/UI/Buttons";
import { FiLogOut } from "react-icons/fi";
import css from "./mydata.css"
import { SubTitle } from "Components/UI/Subtitle";

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

    return (
        <main className={css.myDataContainer}>
            <Title>Mis datos</Title>
            <div className={css.dataUser}>
                <Label>Usuario: {userName}</Label>
                <Label>
                    Foto de perfil
                    <ImageForms src={profilePhoto} alt="foto de perfil" title="foto de perfil" />
                </Label>
                <Button type="button" onClick={handleChangeData} color="primary" >Modificar datos</Button>
                <div className={css.logoutUser}>
                    <SubTitle>{email}</SubTitle>
                    <Link className={css.link} to="/" onClick={handleLogout}>
                        <FiLogOut className={css.iconClose} />Cerrar sesion
                    </Link>
                </div>
            </div>
        </main>
    )
}