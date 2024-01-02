import React from "react";
import { useRouteError } from "react-router-dom";

export function ErrorPage() {
    const error = useRouteError();
    console.log(error)


    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{(error as Error)?.message ||(error as { statusText?: string })?.statusText}</i>
            </p>
        </div>
    )
}