import React from "react";
import { AboutUs } from "Components/AboutUs";
import css from "./about.css";

export function About() {

  return (
    <div className={css.container}>
      <AboutUs />
    </div>
  );
}

