import React, { useState } from 'react';
import css from "./inputs.css";
import { FiMail } from "react-icons/fi";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { TbMapPinSearch } from "react-icons/tb";

type Props = {
    type: "text" | "number" | "search" | "email" | "password",
    name?: string | any
    placeholder: string
    value?: string | any
    required?: boolean
    onChange?: (e?) => void
    onClick?: (e?) => void
};

export function Input(props: Props) {
    const { type, name, placeholder, value, required, onChange } = props;

    return <input
        className={css.input}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
    />
}

export function InputForm({ type, name, placeholder, value, required, onChange }: Props) {
    return <input className={css.inputForm} type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} />


}

export function InputEmail({ type, name, placeholder, value, required, onChange }: Props) {

    return (
        <div className={css.container}>
            <input className={`${css.input} ${css.form}`} type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} />
            <FiMail className={`${css.icon} ${css.iconForm}`} />
        </div>
    )

}

export function InputPassword({ type, name, placeholder, value, required, onChange }: Props) {
    const [inputType, SetInputType] = useState<string>(type);

    function showPassword() {
        SetInputType((prevType) => (prevType === "password" ? 'text' : 'password'))
    }

    return (
        <div className={css.container}>
            <input className={`${css.input} ${css.form}`} type={inputType} name={name} placeholder={placeholder} value={value} onChange={onChange} />
            {inputType === "password" ? (
                <GoEye className={`${css.icon} ${css.iconForm} ${css.cursor}`} onClick={showPassword} />
            ) : (
                <GoEyeClosed className={`${css.icon} ${css.iconForm} ${css.cursor}`} onClick={showPassword} />
            )}

        </div>
    )
}


export function InputSearch({ type, name, placeholder, value, onClick, onChange }: Props) {

    return (
        <div className={css.container}>
            <input className={`${css.input} ${css.search}`} type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} /> 
                <h2 className={`${css.text} ${css.cursor}`} onClick={onClick}>Buscar</h2>   
        </div>
    )
}





