import React from "react"
import css from "./imageforms.css"

type Props = {
    src:string,
    alt?: string,
    title?: string
}

export function ImageForms({src,alt, title }: Props) {
    return <img className={css.image} src={src} alt={alt} title={title} />
}
