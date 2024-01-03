// 
import React, { useState } from 'react';
import css from "./inputs.css";
import { TbMapPinSearch } from "react-icons/tb";


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


export function InputForm({type,name,placeholder,value,required,onChange}:Props) {
    return <input className={css.inputForm} type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} />


}

export function InputSearch() {


}

export function InputEmail() {


}

export function InputPassword() {


}


