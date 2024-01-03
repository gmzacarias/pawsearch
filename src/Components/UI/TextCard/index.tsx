import React from "react";
import css from "./textcard.css"

type Props = {
    children?: string | any,
}

export function TextCard({ children }: Props) {
    return <h3 className={css.textCard}>{children}</h3>

}
