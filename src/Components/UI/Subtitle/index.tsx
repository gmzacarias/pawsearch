import React from "react";
import css from "./subtitle.css"

type Props={
    children:string|any
}

export function SubTitle(props:Props){
    return <h3 className={css.subTitle}>{props.children}</h3>
}
