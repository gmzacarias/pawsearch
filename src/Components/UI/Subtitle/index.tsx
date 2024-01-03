import React from "react";
import css from "./subtitle.css"

type Props={
    children?:string|any
}

export function SubTitle({children}:Props){
    return <h2 className={css.subTitle}>{children}</h2>
}
