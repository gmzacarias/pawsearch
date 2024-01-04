import React from "react";
import css from "./textdisplay.css"

type Props = {
    children?: string | any,
}

export function TextDisplay({ children }: Props) {
    return <h3 className={css.textDisplay}>{children}</h3>

}