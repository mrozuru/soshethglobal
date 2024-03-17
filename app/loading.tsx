import React from "react";
import styles from "../styles/loading.module.css";

const Loading: React.FC = () => {
  return (
    <div className={styles.loadingOverlay}>
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <h2>Loading...</h2>
      </div>
    </div>
  );
};

export default Loading;
