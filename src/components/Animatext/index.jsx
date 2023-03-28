import React from 'react'
import styles from './Animatext.module.css'

export default function Animatext(props) {
  return (
      <span className={styles.AnimaText}>
        {props.text.split('').map((char, index) => {
          return <span key={index}>{char}</span>;
        })}
      </span>
    );
}
