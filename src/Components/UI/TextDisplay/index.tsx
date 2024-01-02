import React from "react";
import css from "./text-display.css"

export function TextDisplay(props) {
    return <p className={css.textDisplay}>{props.children}</p>
}
