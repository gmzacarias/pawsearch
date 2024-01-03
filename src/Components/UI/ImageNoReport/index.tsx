import React from "react"
import css from "./imagereport.css"

type Props = {
    src: string,
    alt: string,
    title: string
}

export function ImageNoReport({ src, alt, title }: Props) {
    return <img className={css.ImageNoReport} src={src} alt={alt} title={title} />
}
