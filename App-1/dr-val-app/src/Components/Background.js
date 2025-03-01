import { useState } from "react";
import styles from "./Back.module.css";

const Back = ({ children }) => {
  return (
    <div className={styles["back-container"]}>
      {children}
    </div>
  );
};

export default Back;
