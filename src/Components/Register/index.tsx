import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "Lib/api";
import { useDataUser } from "Hooks";
import { Dropzone } from "Components/Dropzone";
import { onRegister,onChangePhoto } from "Components/Sonner";
import { Title } from "Components/UI/Title";
import { Label } from "Components/UI/Label";
import { Input } from "Components/UI/Inputs";
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
        <main className={css.signUpContainer}>
            <Title>Crea tu cuenta</Title>
            <div className={css.imagen}></div>
            <form className={css.formContainer} onSubmit={handleSubmit}>
                <div className={css.pictureContainer}>
                    <Dropzone name="profilePhoto" onFileUpload={handleFileUpload}  ></Dropzone>
                    <label htmlFor="">Arrastra y suelta un archivo <br></br> o haz clic para seleccionarlo</label>
                </div>
                <div className={css.inputsContainer}>
                    <label>Email:</label>
                    <Input
                        type="email"
                        name="email"
                        placeholder="*****@mail.com"
                        value={dataUser.email}
                        onChange={handleInputChange}
                        width="300px"
                        required
                    />
                    <label>Password:</label>
                    <Input
                        type="password"
                        name="password"
                        placeholder=""
                        value={dataUser.password}
                        onChange={handleInputChange}
                        width="300px"
                        required
                    />
                    <label>Username:</label>
                    <Input
                        type="text"
                        name="userName"
                        placeholder=""
                        value={dataUser.userName}
                        onChange={handleInputChange}
                        width="300px"
                        required
                    />
                    <button type="submit">Submit</button>
                </div>
            </form>
        </main>
    )
}