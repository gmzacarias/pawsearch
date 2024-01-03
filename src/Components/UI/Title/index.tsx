import React from "react";
import css from "./title.css"

type Props={
    children?:string|any
}

export function Title({children}:Props){
    return <h1 className={css.title}>{children}</h1>
}
