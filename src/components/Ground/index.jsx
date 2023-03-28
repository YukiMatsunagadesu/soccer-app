import React, { useEffect,useRef } from 'react'
import styles from './Ground.module.css'

export default function Ground() {
  const canvasRef = useRef(null);
  useEffect(() => {
    function draw() {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      // タッチライン
      ctx.beginPath();
      ctx.rect(50, 50, 500, 500);
      ctx.strokeStyle = 'white';
      ctx.stroke();
      // ペナルティエリア
      ctx.beginPath();
      ctx.rect(150, 450, 300, 100);
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // ペナポチ
      ctx.beginPath();
      ctx.arc(300, 475, 1, 0, Math.PI*2);
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // ゴールエリア
      ctx.beginPath();
      ctx.rect(225, 500, 150, 50);
      ctx.strokeStyle = 'white';
      ctx.stroke();

      // センターアーク
      ctx.beginPath();
      ctx.arc(300, 50, 70,0,  Math.PI,false);
      ctx.strokeStyle = 'white';
      ctx.stroke();

      //ペナ楕円
      ctx.beginPath();
      ctx.ellipse(300, 450, 70, 50,0,0,Math.PI, true );
      ctx.strokeStyle = 'white';
      ctx.stroke();
    }
    draw();
  }, []);

  return(
    <div className={styles.ground_container}>
      <div className={styles.header}>
        <p>俺のプレミアベストイレブン（22~23シーズン）</p>
      </div>
      <main>
        <div className ={styles.teamselect}>
          チーム選択画面
          <select className={styles.select}>
            <option value="">チームを選択してください</option>
            <option value="">マンチェスター・シティ</option>
            <option value="">リバプール</option>
            <option value="">チェルシー</option>
            <option value="">トッテナム・ホットスパー</option>
            <option value="">アーセナル </option>
            <option value="">マンチェスター・ユナイテッド</option>
            <option value="">ウェストハム・ユナイテッド</option>
            <option value="">レスター・シティ</option>
            <option value="">ブライトン</option>
            <option value="">ウォルバーハンプトン</option>
            <option value="">ニューカッスル・ユナイテッド</option>
            <option value="">クリスタル・パレス</option>
            <option value="">ブレントフォード</option>
            <option value="">アストン・ビラ</option>
            <option value="">サウサンプトン</option>
            <option value="">エバートン</option>
            <option value="">リーズ・ユナイテッド</option>
            <option value="">フラム</option>
            <option value="">ボーンマス</option>
            <option value="">ノッティンガム・フォレスト</option>
          </select>
        </div>
  
        <div className={styles.gamezone}>
          <canvas ref={canvasRef} width="600" height="600" className={styles.canvas}> サポートされていません</canvas>
          <div className={styles.player}>ここに選手一覧が入ります</div>
        </div>
      </main>
      <div className={styles.footer}>
        ここがフッターです
        twitter でみんなにシェアしてみよう
      </div>
    </div>
  )
}
