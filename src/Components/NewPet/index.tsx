import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { createNewPet } from "Lib/api"
import { usePet, useDataUserValue, useSearchLocationValue, useAppValue } from "Hooks"
import { onChangePhoto, onNewPet } from "Components/Sonner"
import { Title } from "Components/UI/Title";
import { Label } from "Components/UI/Label"
import { InputForm } from "Components/UI/Inputs";
import { Dropzone } from "Components/Dropzone"
import { LeafletMap } from "Components/Leaflet"
import { SearchLeaflet } from "Components/SearchLeaflet"
import { Button } from "Components/UI/Buttons";
import css from "./newpet.css"

export function NewPet() {
    const navigate = useNavigate()
    const { token } = useAppValue()
    const { id } = useDataUserValue()
    const { lat, lon, display_name } = useSearchLocationValue()
    const markerPosition: [number, number] = [lat, lon];
    const zone = display_name
    const [pet, SetPet] = usePet()

    useEffect(() => {
        SetPet((prevData) => ({
            ...prevData,
            id: "",
            petName: "",
            petPhoto: "",
            lat: 0,
            lng: 0,
            zoneReport: "",
            found: false,
            petPhotoChanged: false,
            userId: 0
        }))
    }, [SetPet]);


    function handleInputChange({ target }) {
        const { name, value } = target
        SetPet((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    function handleFileUpload(file) {
        SetPet((prevData) => ({
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
        SetPet((prevData) => ({
            ...prevData,
            lat: latNumber,
            lng: lngNumber,
            zoneReport: data.display_name
        }))
    }

    function handleCancel() {
        navigate("/")
    }

    async function handleSubmit(event) {
        event.preventDefault()
        if (!pet.petPhotoChanged) {
            onChangePhoto()
        }
        if (pet.petName && pet.petPhoto && pet.lat && pet.lng && pet.zoneReport) {
            try {
                const response = await createNewPet(id, token, pet.petName, pet.petPhoto, pet.lat, pet.lng, pet.zoneReport)
                if (response) {
                    SetPet((prevData) => ({
                        ...prevData,
                        id: response.id,
                        userId: response.userId,
                    }))
                    onNewPet()
                    await navigate("/mypets")
                    return [pet]
                }
            } catch (error) {
                console.error(error)
            }
        }
    }

    return (
        <main className={css.newPetContainer}>
            <div className={css.cardContainer}>
                <form className={css.form} onSubmit={handleSubmit}>
                    <Title>Reportar mascota</Title>
                    <Label>Foto
                        <Dropzone onFileUpload={handleFileUpload} />
                    </Label>
                    <Label>
                        Arrastra y suelta un archivo,o haz clic para seleccionarlo
                    </Label>
                    <Label>Nombre
                        <InputForm type="text" name="petName" placeholder="Nombre de la mascota" onChange={handleInputChange} required />
                    </Label>
                    <Label>Ubicacion
                        <LeafletMap position={markerPosition} zone={zone} />
                        <SearchLeaflet coordinates={handleCoordinates} required />
                    </Label>
                    <Label>
                        Buscá un punto de referencia para reportar la mascota. Por ejemplo, la ubicación donde lo viste por última vez.
                    </Label>
                    <div className={css.buttons}>
                        <Button type="submit" color="submit" >Reportar Mascota</Button>
                        <Button type="button" onClick={handleCancel} color="secondary" >Cancelar</Button>
                    </div>
                </form>
            </div>
            <div className={css.blobBounce}></div>
        </main >
    )
}
