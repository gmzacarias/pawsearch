import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateUser } from "Lib/api";
import { useDataUser, useDataUserValue, useAppValue } from "Hooks";
import { onUserDataChangeError, onUserDataChange } from "Components/Sonner";
import { Dropzone } from "Components/Dropzone";
import { Title } from "Components/UI/Title";
import { Input } from "Components/UI/Inputs";
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
                    await navigate("/about")
                }
            } catch (error) {
                console.error(error)
            }
        }
    }

    return (<div>
        <form onSubmit={handleSubmit} >
            <label htmlFor="">editar imagen
                <Dropzone name="picture"
                    currentImage={profilePhoto}
                    onFileUpload={handleUpload} />
            </label>
            <Input
                type="text"
                name="userName"
                placeholder=""
                value={userName}
                onChange={handleInputChange}
            />
            <Input
                type="text"
                name="password"
                placeholder=""
                value={password}
                onChange={handleInputChange}
            />
            <button type="submit">Modificar Datos</button>
        </form>
    </div>)
}