import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "Lib/api";
import { useDataUser } from "Hooks";
import { Dropzone } from "Components/Dropzone";
import { onRegister, onChangePhoto } from "Components/Sonner";
import { Title } from "Components/UI/Title";
import { Label } from "Components/UI/Label";
import { InputEmail, InputForm, InputPassword } from "Components/UI/Inputs";
import { Button } from "Components/UI/Buttons";
import css from "./register.css"

export function Register() {
    const navigate = useNavigate()
    const [dataUser, SetDataUser] = useDataUser()

    useEffect(() => {
        SetDataUser((prevData) => ({
            ...prevData,
            email: "",
            password: "",
            userName: "",
            profilePhoto: "",
            profilePhotoChanged: false,
        }))
    }, [SetDataUser]);

    function handleFileUpload(file) {
        SetDataUser((prevData) => ({
            ...prevData,
            profilePhoto: file.dataURL,
            profilePhotoChanged: true
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
        navigate("/")
    }

    async function handleSubmit(event) {
        event.preventDefault()
        if (!dataUser.profilePhotoChanged) {
            onChangePhoto()
        }
        if (dataUser.userName && dataUser.email && dataUser.password && dataUser.profilePhoto) {
            try {
                const response = await signUp(dataUser.userName, dataUser.email, dataUser.password, dataUser.profilePhoto)
                if (response) {
                    SetDataUser((prevData) => ({
                        ...prevData,
                        id: response.id,
                    }))
                }
                onRegister()
                await navigate("/auth")

            } catch (error) {
                console.error("Hubo un error al enviar el formulario", error)
            }
        } else {
            console.log("hay un error en el formulario")
        }
    }

    return (
        <main className={css.registerContainer}>
            <div className={css.cardContainer}>
                <form onSubmit={handleSubmit}>
                    <Title>Crea tu cuenta</Title>
                    <Label>Foto
                        <Dropzone onFileUpload={handleFileUpload} />
                    </Label>
                    <Label>
                        Arrastra y suelta un archivo,o haz clic para seleccionarlo
                    </Label>
                    <Label>
                        Nombre de usuario
                        <InputForm type="text" name="userName" placeholder="Ingrese un nombre de usuario" value={dataUser.userName} onChange={handleInputChange} required />
                    </Label>
                    <Label>
                        Email
                        <InputEmail type="email" name="email" placeholder="mail@dominio.com" value={dataUser.email} onChange={handleInputChange} required />
                    </Label>
                    <Label>
                        Contraseña
                        <InputPassword type="password" name="password" placeholder="********" value={dataUser.password} onChange={handleInputChange} required />
                    </Label>
                    <div className={css.buttons}>
                        <Button type="submit" color="submit" >Confirmar</Button>
                        <Button type="button" onClick={handleCancel} color="secondary" >Cancelar</Button>
                    </div>
                </form>
            </div>
            <div className={css.blobBounce}></div>
        </main>
    )
}