import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useApp, useAppValue, useDataUserValue } from "Hooks";
import { PetSighting } from "Components/PetSighting";
import { EditButton, ReportButton } from "Components/UI/Buttons";
import css from "./card.css"
import { SubTitle } from "Components/UI/Subtitle";
import { ImageCard } from "Components/UI/ImageCard";
import { TextCard } from "Components/UI/TextCard";

type Card = {
    petId: number,
    petName: string,
    petPhoto: string,
    zoneReport: string,
    userId: number,
}

export function PetCard({ petId, petName, petPhoto, zoneReport, userId }: Card) {
    const Navigate = useNavigate()
    const [showCard, SetShowCard] = useState(false)
    const [isVisible, SetIsVisible] = useState(true)
    const { isLogged } = useAppValue()
    const { id } = useDataUserValue()
    const showEditButton = isLogged && id === userId
    const name = petName.toUpperCase()
    const zone = zoneReport.split(',')[0].trim()
    const idReport = petId.toString()




    function onEdit() {
        Navigate(`/myreports/edit-pet?petId=${petId}`)
    }

    function onReport() {
        SetShowCard(true)
        SetIsVisible(true)
    }

    function onHide() {
        SetIsVisible(false)
    }


    return (
        <div className={css.card}>
            <ImageCard src={petPhoto} alt={petName} title={petName} />
            <SubTitle>{name}</SubTitle>
            <div className={css.textContainer}>
                <TextCard>Zona de {zone}</TextCard>
                <div className={css.buttonContainer}>
                    {showEditButton ? (
                        <EditButton type="button" onClick={onEdit} />
                    ) : (
                        <div>
                            <ReportButton type="button" children={"Reportar"} onClick={onReport} />
                            {showCard && isVisible && (
                                <div className={css.reportCard}>
                                    <PetSighting petId={idReport} namePet={petName} onHideCard={onHide} />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}