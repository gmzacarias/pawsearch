import React from "react";
import { EmailChecker } from "Components/EmailChecker";
import css from "./auth.css"
export function Auth() {

  return (<div className={css.container}>
    <EmailChecker />
  </div>
  );
}

