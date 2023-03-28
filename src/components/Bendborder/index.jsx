import React from 'react'
import styles from './Bendborder.module.css'
export default function Bendborder() {
  return (
    //背景を定義
    <div className={styles.container}>  
      <div className={styles.box}>
        <div className={styles.heart}></div>
      </div>
    </div>
  );
}
