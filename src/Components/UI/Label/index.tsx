import React from "react";
import css from "./label.css"

type Props={
    value:string,
    className?:string,
}

export function Label({value,className}:Props){
    return (
        <label className={css.label}>{value}</label>
    )
}
