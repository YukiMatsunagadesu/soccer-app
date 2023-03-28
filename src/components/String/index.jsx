import React from 'react'
import Animatext from '../Animatext';
import styles from './String.module.css'

export default function String() {
  return (
        <div className={styles.App}>
          <h1>
            <Animatext text="Hello &nbsp; PremierLeague" />
          </h1>
        </div>
      );
}
