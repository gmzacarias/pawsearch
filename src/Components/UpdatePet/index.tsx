import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { foundPet, updatePet, deleteReport } from "Lib/api"
import { usePet, useAppValue, usePetsListValue } from "Hooks"
import { Dropzone } from "Components/Dropzone"
import { LeafletMap } from "Components/Leaflet"
import { SearchLeaflet } from "Components/SearchLeaflet"
import { onUpdatePet, onNotUpdatePet, onDeletePet, onFoundPet } from "Components/Sonner"
import { Label } from "Components/UI/Label"
import css from "./updatepet.css"

export function UpdatePet() {
    const navigate = useNavigate()
    const petId = new URLSearchParams(window.location.search).get("petId")
    const getId = parseInt(petId)
    const [pet, SetEditPet] = usePet()
    const { petName, petPhoto, zoneReport, lat, lng, } = pet
    const { token } = useAppValue()
    const data = usePetsListValue()
    const petList = data[0]
    let listLength = petList.length;
    let searchPet = null;
    const currentSearch = zoneReport.split(',')[0].trim()
    const markerPosition: [number, number] = [lat, lng];

    useEffect(() => {
        function getPet() {
            for (let i = 0; i < listLength; i++) {
                let currentPet = petList[i];
                if (currentPet.id === getId) {
                    searchPet = currentPet;
                    break;
                }
                // console.log(currentPet);
            }
            if (searchPet) {
                SetEditPet((prevData) => ({
                    ...prevData,
                    userId: searchPet.userId,
                    id: searchPet.id,
                    petName: searchPet.name,
                    petPhoto: searchPet.image_URL,
                    lat: searchPet.lat,
                    lng: searchPet.lng,
                    zoneReport: searchPet.zone,
                    found: searchPet.found,
                    petPhotoChanged: false,
                }))
                return pet
            } else {
                console.log('No se encontró ninguna mascota con el ID:', petId);
            }
        }
        getPet()
    }, [petId, petList])

    function handleInputChange({ target }) {
        const { name, value } = target
        SetEditPet((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    function handleFileUpload(file) {
        SetEditPet((prevData) => ({
            ...prevData,
            petPhoto: file.dataURL,
            petPhotoChanged: true
        }))
    }

    function handleCoordinates(data) {
        const latString = data.lat;
        const lngString = data.lon;
        const latNumber = parseFloat(latString);
        const lngNumber = parseFloat(lngString);
        SetEditPet((prevData) => ({
            ...prevData,
            lat: latNumber,
            lng: lngNumber,
            zoneReport: data.display_name
        }))
    }

    async function handleSubmit(event) {
        event.preventDefault()
        if (pet.petName || pet.petPhoto || pet.lat || pet.lng || pet.zoneReport)
            try {
                const response = await updatePet(petId, token, pet.petName, pet.petPhoto, pet.lat, pet.lng, pet.zoneReport)
                if (!response) {
                    onNotUpdatePet()
                    // console.log("no se pudo actualizar")
                } else {
                    onUpdatePet()
                    // console.log("datos actualizados", pet)
                    await navigate("/myreports")
                }
            } catch (error) {
                console.error(error)
            }
    }

    async function handleDelete(event) {
        event.preventDefault()
        try {
            const response = await deleteReport(petId, token)
            onDeletePet()
            // console.log("Reporte eliminado")
            await navigate("/myreports")
            return response
        } catch (error) {
            console.error(error)
        }
    }

    async function handleFound(event) {
        event.preventDefault()
        try {
            const response = await foundPet(petId, token)
            if (!response) {
                console.log("no se pudo actualizar el status")
            } else {
                onFoundPet()
                // console.log("Status Actualizado")
                await navigate("/myreports")
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className={css.container}>
            <form className={css.form} onSubmit={handleSubmit}>
                <label htmlFor="petName">Nombre</label>
                <input id="petName" name="petName" type="petName" value={petName} onChange={handleInputChange} placeholder="nombre de la mascota" required />
                <label htmlFor="petPhoto">Foto</label>
                <Dropzone name="petPhoto" onFileUpload={handleFileUpload} currentImage={petPhoto}></Dropzone>
                <label htmlFor="ubicacion">Ubicacion</label>
                <div className={css.mapeo}>
                    <LeafletMap position={markerPosition} zone={zoneReport} />
                    <SearchLeaflet coordinates={handleCoordinates} currentSearch={currentSearch} />
                </div>
                <button type="submit" className={css.button}>Guardar</button>
                <button type="button" className={css.button} onClick={handleFound}>Reportar como encontrado</button>
                <button type="button" className={css.button} onClick={handleDelete}>Eliminar Reporte</button>
            </form>
        </div>
    )
}