import React from "react";
import css from "./textarea.css"

type Props = {
    name?: string,
    value: string,
    placeHolder:string,
    onChange: (e) => void
}

export function TextArea({ name, value,placeHolder, onChange }: Props) {
    return <textarea className={css.textArea} cols={30} rows={10} wrap="soft" autoCapitalize="sentences" maxLength={200} name={name} value={value} placeholder={placeHolder} onChange={onChange} required />

}
