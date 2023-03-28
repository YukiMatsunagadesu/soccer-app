import React, {useState } from 'react'
import styles from './Explain.module.css'

export default function Photo() {
  const [showBox1, setShowBox1] = useState(false);
  const [showBox2, setShowBox2] = useState(false);
  const [showBox3, setShowBox3] = useState(false);

  const handleButtonClick = (buttonNumber) => {
    switch (buttonNumber) {
      case 1:
        setShowBox1(true);
        break;
      case 2:
        setShowBox2(true);
        break;
      case 3:
        setShowBox3(true);
        break;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.button1}>
        <button className={styles.button} onClick={() => handleButtonClick(1)}>説明1</button>
        <div
          className={`${styles.box} ${showBox1 ? styles.show : ""}`}
        ></div>
      </div>
      <div className={styles.button2}>
        <button className={styles.button} onClick={() => handleButtonClick(2)}>説明2</button>
        <div
          className={`${styles.box} ${showBox2 ? styles.show : ""}`}
        ></div>
      </div>
      <div className={styles.button3}>
        <button className={styles.button} onClick={() => handleButtonClick(3)}>説明3</button>
        <div
          className={`${styles.box} ${showBox3 ? styles.show : ""}`}
        ></div>
      </div>
    </div>
  );
}
