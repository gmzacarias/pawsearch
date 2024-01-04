import React, { useState } from 'react';
import css from "./inputs.css";
import { FiMail } from "react-icons/fi";
import { GoEye, GoEyeClosed } from "react-icons/go";


type Props = {
    type: "text" | "number" | "search" | "email" | "password",
    name: string | any
    placeholder: string
    value?: string | any
    required?: boolean
    onChange?: (e?) => void
};



export function Input(props: Props) {
    const { type, name, placeholder, value, required, onChange } = props;

    return <input
        className={css.input}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={onChange}
    />
}

export function InputForm({ type, name, placeholder, value, required, onChange }: Props) {
    return <input className={css.inputForm} type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} />


}

export function InputEmail({ type, name, placeholder, value, required, onChange }: Props) {

    return (
        <div className={css.container}>
            <input className={css.input} type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} />
            <FiMail className={css.iconInput} />
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
            <input className={css.input} type={inputType} name={name} placeholder={placeholder} value={value} onChange={onChange} />
            {inputType === "password" ? (
                <GoEye className={css.iconInput} onClick={showPassword} />
            ) : (
                <GoEyeClosed className={css.iconInput} onClick={showPassword} />
            )}

        </div>
    )
}


export function InputSearch() {


}



