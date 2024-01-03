import React from "react";
import css from "./label.css"

type Props = {
    children?: string | any,
}

export function Label({ children }: Props) {
    return <label className={css.label}>{children}</label>
}
