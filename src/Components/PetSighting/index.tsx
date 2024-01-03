import React, { useState, useEffect } from "react"
import { reportPet } from "Lib/api"
import { useReportPet } from "Hooks"
import { onNotReportPet, onReportPet } from "Components/Sonner"
import { SubTitle } from "Components/UI/Subtitle"
import { Label } from "Components/UI/Label"
import { InputForm } from "Components/UI/Inputs"
import { TextArea } from "Components/UI/TextArea"
import { CloseButton, ReportButton } from "Components/UI/Buttons"
import css from "./PetSighting.css"

type Report = {
    petId: string,
    namePet: string,
    onHideCard: () => void,
}

export function PetSighting({ petId, namePet, onHideCard }: Report) {
    const [inputValue, SetInputValue] = useState({
        nameReporter: "",
        phoneNumber: "",
        info: ""
    })
    const { nameReporter, phoneNumber, info } = inputValue
    const [data, SetData] = useReportPet()
    const upperNamePet = namePet.toUpperCase()

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
    function closeCard() {
        onHideCard()
    }

    async function handleSubmit(event) {
        event.preventDefault()
        try {
            if (data.nameReporter && data.phoneNumber && data.info) {
                const sendReport = await reportPet(petId, data.nameReporter, data.phoneNumber, data.info)
                closeCard()
                onReportPet()
                // console.log("Se Envio el mail con exito")
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
            <form onSubmit={handleSubmit}>
                <CloseButton type="button" onClick={closeCard} />
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
                <div className={css.buttonContainer}>
                    <ReportButton type="submit" children={"Enviar"} />
                </div>
            </form>
        </main>
    )
}


