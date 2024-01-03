import React from "react"
import { FiAlertOctagon, FiEdit, } from "react-icons/fi";
import { FaWindowClose } from "react-icons/fa";
import css from "./buttons.css"

type Props = {
    children?: string | any,
    type?: "button" | "reset" | "submit",
    className?: string | Element,
    onClick?: (e) => void | any
}

export function Button({ children, type, onClick }: Props) {
    return <button className={css.container} onClick={onClick}>{children}</button>
}


export function EditButton({ type, onClick }: Props) {
    return <button type={type} onClick={onClick} className={css.buttonCard}>
        Editar
        <FiEdit className={css.iconCard} />
    </button>

}

export function ReportButton({ type,children, onClick }: Props) {
    return <button type={type} onClick={onClick} className={css.buttonCard}>
        {children}
        <FiAlertOctagon className={css.iconCard} />
    </button>
}

export function CloseButton({ type,onClick }: Props) {
    return <button onClick={onClick} type={type} className={css.buttonClose}><FaWindowClose className={css.iconClose}/></button>
}