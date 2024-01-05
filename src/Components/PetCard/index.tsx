import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAppValue, useDataUserValue, useReportPet } from "Hooks";
import { SubTitle } from "Components/UI/Subtitle";
import { ImageCard } from "Components/UI/ImageCard";
import { EditButton, ReportButton } from "Components/UI/Buttons";
import { TextCard } from "Components/UI/TextCard";
import { PetSighting } from "Components/PetSighting";
import css from "./petcard.css"

type Card = {
    petId: number,
    petName: string,
    petPhoto: string,
    zoneReport: string,
    userId: number,
    found: boolean,
}

export function PetCard({ petId, petName, petPhoto, zoneReport, userId, found }: Card) {
    const navigate = useNavigate()
    const { isLogged } = useAppValue()
    const { id } = useDataUserValue()
    const [data, SetData] = useReportPet()
    const showEditButton = isLogged && id === userId
    const name = petName.toUpperCase()
    const zone = zoneReport.split(',')[0].trim()
    const idReport = petId.toString()



    function onEdit() {
        navigate(`/mypets/edit-pet?petId=${petId}`)
    }

    async function onReport() {
        SetData((prevData) => ({
            ...prevData,
            petName: petName
        }))
        // console.log(data)
        await navigate(`/report?petId=${idReport}`)
    }

    return (
        <div className={css.petCardContainer}>
            {found ? (
                <div>
                    <div className={css.cardContainer}>
                        <ImageCard src={petPhoto} alt={petName} title={petName} />
                        <SubTitle>{name}</SubTitle>
                            <TextCard>Zona de {zone}</TextCard>
                            <TextCard>¡Mascota encontrada!</TextCard>
                            <div className={css.buttonContainer}>
                                {showEditButton ? (
                                    <EditButton type="button" onClick={onEdit} />
                                ) : (
                                    <ReportButton type="button" children={"Reportar"} onClick={onReport} />
                                )}
                            </div>
                    </div>
                    <div className={`${css.blobBounce} ${css.foundBlob}`}></div>
                </div>
            ) : (
                <div>
                    <div className={css.cardContainer}>
                        <ImageCard src={petPhoto} alt={petName} title={petName} />
                        <SubTitle>{name}</SubTitle>
                        <TextCard>Zona de {zone}</TextCard>
                        <TextCard>Mascota perdida</TextCard>
                        <div className={css.buttonContainer}>
                            {showEditButton ? (
                                <EditButton type="button" onClick={onEdit} />
                            ) : (
                                <ReportButton type="button" onClick={onReport} />
                            )}
                        </div>
                    </div>
                    <div className={`${css.blobBounce} ${css.notFoundBlob}`}></div>
                </div>
            )}
        </div>
    );
}