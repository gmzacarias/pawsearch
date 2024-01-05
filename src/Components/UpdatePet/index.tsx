import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { foundPet, updatePet, deleteReport } from "Lib/api"
import { usePet, useAppValue, usePetsListValue } from "Hooks"
import { onUpdatePet, onNotUpdatePet, onDeletePet, onFoundPet } from "Components/Sonner"
import { Title } from "Components/UI/Title";
import { Label } from "Components/UI/Label"
import { InputForm } from "Components/UI/Inputs";
import { Dropzone } from "Components/Dropzone"
import { LeafletMap } from "Components/Leaflet"
import { SearchLeaflet } from "Components/SearchLeaflet"
import { Button } from "Components/UI/Buttons";
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
                    await navigate("/mypets")
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
            await navigate("/mypets")
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
                await navigate("/mypets")
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <main className={css.editPetContainer}>
            <div className={css.cardContainer}>
                <form className={css.form} onSubmit={handleSubmit}>
                    <Title>Reportar mascota</Title>
                    <Label>Editar foto
                        <Dropzone onFileUpload={handleFileUpload} currentImage={petPhoto} />
                    </Label>
                    <Label>
                        Arrastra y suelta un archivo,o haz clic para seleccionarlo
                    </Label>
                    <Label>Editar nombre
                        <InputForm type="text" name="petName" placeholder="Nombre de la mascota" value={petName} onChange={handleInputChange} />
                    </Label>
                    <Label>Ubicacion
                        <LeafletMap position={markerPosition} zone={zoneReport} />
                        <SearchLeaflet coordinates={handleCoordinates} currentSearch={currentSearch} />
                    </Label>
                    <Label>
                        Buscá un punto de referencia para reportar la mascota. Por ejemplo, la ubicación donde lo viste por última vez.
                    </Label>
                    <div className={css.buttons}>
                        <Button type="submit" color="primary">Guardar</Button>
                        <Button type="submit" onClick={handleFound} color="submit">Reportar como encontrado</Button>
                        <Button type="submit" onClick={handleDelete} color="delete">Eliminar Reporte</Button>
                    </div>
                </form>
            </div>
            <div className={css.blobBounce}></div>
        </main>
    )
}