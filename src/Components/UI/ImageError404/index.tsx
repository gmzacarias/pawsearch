import React from "react"
import image from "Assets/error404.svg"
import css from "./imageerror404.css"

type Props = {
    alt: string,
    title: string
}

export function ImageError404({alt, title }: Props) {
    return <img className={css.image} src={image} alt={alt} title={title} />
}
