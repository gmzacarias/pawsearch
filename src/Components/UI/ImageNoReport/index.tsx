import React from "react"
import dog from "Assets/dog-noreports.png"
import css from "./imagenoreport.css"

type Props = {
    alt: string,
    title: string
}

export function ImageNoReport({ alt, title }: Props) {
    return <img className={css.image} src={dog} alt={alt} title={title} />
}
