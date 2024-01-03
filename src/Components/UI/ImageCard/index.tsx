import React from "react";
import css from "./imagecard.css"

type Props = {
    src: string,
    alt: string,
    title: string
}

export function ImageCard({ src, alt, title }: Props) {
    return <img className={css.imageCard} src={src} alt={alt} title={title} />
}
