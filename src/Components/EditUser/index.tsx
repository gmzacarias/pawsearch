import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateUser } from "Lib/api";
import { useDataUser, useDataUserValue, useAppValue } from "Hooks";
import { Dropzone } from "Components/Dropzone";
import { onUserDataChangeError, onUserDataChange } from "Components/Sonner";
import { Title } from "Components/UI/Title";
import { Label } from "Components/UI/Label";
import { InputForm, InputPassword } from "Components/UI/Inputs";
import { Button } from "Components/UI/Buttons";
import css from "./edituser.css"

export function EditUser() {
    const navigate = useNavigate()
    const { token } = useAppValue()
    const { id, userName, password, profilePhoto } = useDataUserValue()
    const [dataUser, SetDataUser] = useDataUser()

    useEffect(() => {
        console.log("datos del user", dataUser)
    }, [])

    function handleUpload(file) {
        SetDataUser((prevData) => ({
            ...prevData,
            profilePhoto: file.dataURL,
        }))
    }

    function handleInputChange({ target }) {
        const { name, value } = target
        SetDataUser((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    function handleCancel() {
        navigate("/myprofile")
    }

    async function handleSubmit(event) {
        event.preventDefault()
        if (dataUser.userName || dataUser.profilePhoto || dataUser.password) {
            try {
                const updateResponse = await updateUser(id, dataUser, token)
                if (!updateResponse) {
                    onUserDataChangeError()
                } else {
                    // console.log("datos actualizados", dataUser)
                    onUserDataChange()
                    await navigate("/myprofile")
                }
            } catch (error) {
                console.error(error)
            }
        }
    }

    return (
        <main className={css.editUserContainer}>
            <div className={css.cardContainer}>
                <form onSubmit={handleSubmit} >
                    <Title>Editar datos</Title>
                    <Label>Editar foto
                        <Dropzone currentImage={profilePhoto} onFileUpload={handleUpload} />
                    </Label>
                    <Label>Editar nombre
                        <InputForm type="text" name="userName" placeholder="Ingrese un nombre de usuario" value={userName} onChange={handleInputChange} />
                    </Label>
                    <Label>Contraseña
                        <InputPassword type="password" name="password" placeholder="********" value={password} onChange={handleInputChange} />
                    </Label>
                    <div className={css.buttons}>
                    <Button type="submit" color="submit" >Guardar datos</Button>
                    <Button type="button" onClick={handleCancel} color="secondary" >Cancelar</Button>
                    </div>
                </form>
            </div>
            <div className={css.blobBounce}></div>
        </main>)
}