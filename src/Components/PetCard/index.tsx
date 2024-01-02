import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useAppValue, useDataUserValue } from "Hooks";
import { PetSighting } from "Components/PetSighting";
import { FiAlertOctagon, FiEdit } from "react-icons/fi";
import css from "./card.css"

type Card = {
    petId: number,
    petName: string,
    petPhoto: string,
    zoneReport: string,
    userId: number,
}

export function PetCard({ petId, petName, petPhoto, zoneReport, userId }: Card, key) {
    const Navigate = useNavigate()
    const [showReport, SetShowReport] = useState(false);
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
        SetShowReport(true)
    }

    return (
        <div className={css.card}>
            <img className={css.picture} src={petPhoto} alt={petPhoto} title={petName} />
            <h2 className={css.name}>{name}</h2>
            <p className={css.zone}>Zona:{zone}</p>
            {showEditButton ? (
                <button className={css.buttonCard} onClick={onEdit}>
                    <Link to="/myreports/edit-pet">
                        Editar
                        <FiEdit className={css.iconCard} />
                    </Link>
                </button>
            ) : (
                <div>
                    <button className={css.buttonCard} onClick={onReport}>
                        Reportar
                        <FiAlertOctagon className={css.iconCard} />
                    </button>
                    {showReport && (
                        <div>
                            <PetSighting petId={idReport} namePet={petName} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}