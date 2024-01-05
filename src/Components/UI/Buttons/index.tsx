import React from "react"
import { FiAlertOctagon, FiEdit, } from "react-icons/fi";
import css from "./buttons.css"

type Props = {
    children?: string | any,
    type?: "button" | "reset" | "submit",
    className?: string | Element,
    color?: "primary" | "secondary" | "delete" | "submit";
    onClick?: (e) => void | any
}

export function Button({ children, type, onClick, color }: Props) {
    const colorClassMap = {
        primary: css.primary,
        secondary: css.secondary,
        delete: css.delete,
        submit: css.submit
    };

    function getColor() {
        return colorClassMap[color || "primary"];
    }

    return <button type={type} onClick={onClick} className={`${css.button} ${getColor()}`} >{children}</button>
}

export function EditButton({ type, onClick }: Props) {
    return <button type={type} onClick={onClick} className={css.buttonCard}>
        Editar
        <FiEdit className={css.iconCard} />
    </button>

}

export function ReportButton({ type, onClick }: Props) {
    return <button type={type} onClick={onClick} className={css.buttonCard}>
        Reportar
        <FiAlertOctagon className={css.iconCard} />
    </button>
}

