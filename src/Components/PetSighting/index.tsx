import React from "react"
import { reportPet } from "Lib/api"
import { useReportPet } from "Hooks"
import { onNotReportPet, onReportPet } from "Components/Sonner"
import css from "./PetSighting.css"

type Report = {
    petId: string
    namePet: string
}

export function PetSighting({ petId, namePet }: Report) {
    const [data, SetData] = useReportPet()

    function handleInputChange({ target }) {
        const { name, value } = target
        SetData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    async function handleSubmit(event) {
        event.preventDefault()
        try {
            if (data.nameReporter && data.phoneNumber && data.info) {
                const sendReport = await reportPet(petId, data.nameReporter, data.phoneNumber, data.info)
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
        <div className={css.reportContainer}>
            <form onSubmit={handleSubmit}>
                <title>Reportar informacion de {namePet}</title>
                <label  >Nombre</label>
                <input name="nameReporter" type="text" placeholder="ingrese su nombre" value={data.nameReporter} onChange={handleInputChange} required />
                <label  >Celular</label>
                <input name="phoneNumber" type="number" placeholder="ingrese su numero" value={data.phoneNumber} onChange={handleInputChange} required />
                <label htmlFor="">Informacion</label>
                <textarea name="info" cols={30} rows={10} autoCapitalize="sentences" maxLength={200} value={data.info} onChange={handleInputChange} required />
                <button>Reportar</button>
            </form>
        </div>
    )

}