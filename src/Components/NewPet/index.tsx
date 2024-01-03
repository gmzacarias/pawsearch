import React, { useEffect} from "react"
import { useNavigate } from "react-router-dom"
import { createNewPet } from "Lib/api"
import { usePet, useDataUserValue, useSearchLocationValue,useAppValue } from "Hooks"
import { Dropzone } from "Components/Dropzone"
import { LeafletMap } from "Components/Leaflet"
import { SearchLeaflet } from "Components/SearchLeaflet"
import { onChangePhoto, onNewPet } from "Components/Sonner"
import { Label } from "Components/UI/Label"
import css from "./newpet.css"

export function NewPet() {
    const navigate = useNavigate()
    const {token}=useAppValue()
    const {id} = useDataUserValue()
    const { lat, lon, display_name } = useSearchLocationValue()
    const markerPosition: [number, number] = [lat, lon];
    const zone = display_name
    const [pet, SetPet] = usePet()

    useEffect(() => {
        SetPet((prevData)=>({
            ...prevData,
            id: "",
            petName: "",
            petPhoto: "",
            lat: 0,
            lng: 0,
            zoneReport: "",
            found: false,
            petPhotoChanged: false,
            userId:0
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
                        userId:response.userId,
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
        <main className={css.container}>
            <form className={css.form} onSubmit={handleSubmit}>
                <label htmlFor="petName">Nombre</label>
                <input id="petName" name="petName" type="petName" onChange={handleInputChange} placeholder="nombre de la mascota" required />
                <label htmlFor="petPhoto">Foto</label>
                <Dropzone name="petPhoto" onFileUpload={handleFileUpload}  ></Dropzone>
                <label htmlFor="ubicacion">Ubicacion</label>
                <div className={css.mapeo}>
                    <LeafletMap position={markerPosition} zone={zone} />
                    <SearchLeaflet coordinates={handleCoordinates} />
                </div>
                <button type="submit" className={css.button}>Reportar</button>
                <button className={css.button} onClick={handleCancel}>Cancelar</button>
            </form>
        </main>
    )
}
