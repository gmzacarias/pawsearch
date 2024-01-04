import React from "react"
import image from "Assets/dog&cat.png"
import css from "./imagehome.css"

type Props = {
    alt: string,
    title: string
}

export function ImageHome({alt, title }: Props) {
    return <img className={css.image} src={image} alt={alt} title={title} />
}
