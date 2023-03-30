import Image from 'next/image';
import React, { useEffect,useRef } from 'react'
import { useState } from 'react';
import useSWR from 'swr';
import styles from './Ground.module.css'

export default function Ground() {
  const canvasRef = useRef(null);
  const [selectedTeam, setSelectedTeam] = useState('');


  function handleTeamSelect(event) {
    const teamName = event.target.value;
    setSelectedTeam(teamName);
  }
  useEffect(() => {
    function draw() {
      const canvas = canvasRef.current;
      if (!canvas) return;
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

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '2a494d226amshef23cfde37008f5p1884f8jsnfb9235316ae6',
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
  };
  
  const fetcher = async (url) => {
    const response = await fetch(url, options);
    const data = await response.json();
  
    if (response.ok) {
      console.log(data);
      return data;
    } else {
      throw new Error(data.message);
    }
  };
  const { data, error } = useSWR('https://api-football-v1.p.rapidapi.com/v3/teams?league=39&season=2022', fetcher);
  

  if(error){
    return <div>ローディングに失敗しました</div>
  }
  if(!data){
    return <div>loading...</div>
  }
  console.log(data);
  return(
    <div className={styles.ground_container}>
      <div className={styles.header}>
        <p>俺のプレミアベストイレブン（22~23シーズン）</p>
      </div>
      <main>
        <div className ={styles.teamselect}>
          チーム選択画面
          <select className={styles.select} onChange={handleTeamSelect}>
            <option value="">チームを選択してください</option>
            <option value="マンチェスター・シティ">マンチェスター・シティ</option>
            <option value="リバプール">リバプール</option>
            <option value="チェルシー">チェルシー</option>
            <option value="トッテナム・ホットスパー">トッテナム・ホットスパー</option>
            <option value="アーセナル">アーセナル </option>
            <option value="マンチェスター・ユナイテッド">マンチェスター・ユナイテッド</option>
            <option value="ウェストハム・ユナイテッド">ウェストハム・ユナイテッド</option>
            <option value="レスター・シティ">レスター・シティ</option>
            <option value="ブライトン">ブライトン</option>
            <option value="ウォルバーハンプトン">ウォルバーハンプトン</option>
            <option value="ニューカッスル・ユナイテッド">ニューカッスル・ユナイテッド</option>
            <option value="クリスタル・パレス">クリスタル・パレス</option>
            <option value="ブレントフォード">ブレントフォード</option>
            <option value="アストン・ビラ">アストン・ビラ</option>
            <option value="サウサンプトン">サウサンプトン</option>
            <option value="エバートン">エバートン</option>
            <option value="リーズ・ユナイテッド">リーズ・ユナイテッド</option>
            <option value="フラム">フラム</option>
            <option value="ボーンマス">ボーンマス</option>
            <option value="ノッティンガム・フォレスト">ノッティンガム・フォレスト</option>
          </select>
          <div>選ばれたチームは{selectedTeam}</div>
        </div>
        <div className={styles.gamezone}>
          <canvas ref={canvasRef} width="600" height="600" className={styles.canvas}> サポートされていません</canvas>
          <div className={styles.player}>ここに選手一覧が入ります</div>
        </div>
        <div>
          {data.response.map((team) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={team.team.logo} alt={team.team.name} key={team.team.id}  height="120" width="120"/>
          ))}
        </div>
      </main>
      <div className={styles.footer}>
        ここがフッターです
        twitter でみんなにシェアしてみよう
      </div>
    </div>
  )
}

