import React from "react";
import css from "./title.css"

type Props={
    children:string
}

export function Title(props:Props){
    return <h1 className={css.title}>{props.children}</h1>
}
