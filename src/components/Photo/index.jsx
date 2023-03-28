import React from "react";
import styles from "./Photo.module.css";
import buildingimage from"../../../public/12A767DC-E26B-4E18-9443-E58E992BDC90_1_105_c.jpeg"
import Image from "next/image";

export default function Photo() {
  return (
    <div className={styles.container}>
      
      <div className={styles.image_container}>
        <Image
          className={styles.image}
          alt="写真"
          src={buildingimage}
        />
      </div>
    </div>
  );
}
