import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { reportPet } from "Lib/api"
import { useReportPet } from "Hooks"
import { onNotReportPet, onReportPet } from "Components/Sonner"
import { SubTitle } from "Components/UI/Subtitle"
import { TbReport } from "react-icons/tb";
import { Label } from "Components/UI/Label"
import { InputForm } from "Components/UI/Inputs"
import { TextArea } from "Components/UI/TextArea"
import { Button } from "Components/UI/Buttons"
import css from "./PetSighting.css"

export function PetSighting() {
    const navigate = useNavigate()
    const petId = new URLSearchParams(window.location.search).get("petId")
    const [pet, SetEditPet] = useReportPet()
    const { petName } = pet
    const upperNamePet = petName.toUpperCase()
    const [inputValue, SetInputValue] = useState({
        nameReporter: "",
        phoneNumber: "",
        info: ""
    })
    const { nameReporter, phoneNumber, info } = inputValue
    const [data, SetData] = useReportPet()

    useEffect(() => {
        SetInputValue({
            nameReporter: "",
            phoneNumber: "",
            info: ""
        })
    }, []);


    function handleInputChange({ target }) {
        const { name, value } = target
        SetInputValue((prevData) => ({
            ...prevData,
            [name]: value
        }))
        savedData();
    }

    function savedData() {
        const phone = parseInt(phoneNumber)
        // console.log(phone)
        SetData((prevData) => ({
            ...prevData,
            nameReporter: nameReporter,
            phoneNumber: phone,
            info: info
        }))
    }

    function handleCancel() {
        navigate("/")
    }

    async function handleSubmit(event) {
        event.preventDefault()
        try {
            if (data.nameReporter && data.phoneNumber && data.info) {
                const sendReport = await reportPet(petId, data.nameReporter, data.phoneNumber, data.info)
                onReportPet()
                // console.log("Se Envio el mail con exito")
                navigate("/")
                return sendReport
            } else {
                onNotReportPet()
                // console.log("hubo un error")
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (

        <main className={css.reportContainer}>
            <div className={css.cardContainer}>
                <TbReport className={css.icon} />
                <form onSubmit={handleSubmit}>
                    <SubTitle>Reportar info de {upperNamePet}</SubTitle>
                    <Label>Nombre
                        <InputForm type={"text"} name="nameReporter" placeholder="ingrese su nombre" value={inputValue.nameReporter} onChange={handleInputChange} required />
                    </Label>
                    <Label >Teléfono
                        <InputForm type={"number"} name="phoneNumber" placeholder="ingrese su teléfono" value={inputValue.phoneNumber} onChange={handleInputChange} required />
                    </Label>
                    <Label >¿Dónde lo viste?
                        <TextArea name="info" placeHolder="ingrese informacion donde vio la mascota por ultima vez" value={inputValue.info} onChange={handleInputChange} />
                    </Label>
                    <div className={css.buttons}>
                        <Button type="submit" color="submit" >Enviar</Button>
                        <Button type="button" onClick={handleCancel} color="secondary" >Cancelar</Button>
                    </div>
                </form>
            </div>
            <div className={css.blobBounce}></div>
        </main>
    )
}


