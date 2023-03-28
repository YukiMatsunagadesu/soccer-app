import Link from 'next/link'
import React from 'react'
import styles from './Header.module.css'

export default function Header() {
  return (
    <div className={styles.container}>
      <Link href='/' className={styles.index}> indexpageへ</Link>
      <Link href='about' className={styles.about}>グラウンドへ</Link>
    </div>
  )
}
