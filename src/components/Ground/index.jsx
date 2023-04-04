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
      if (!canvas) return
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
  
  //チームのデータをfetchする処理
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
  const { data:teams, error} = useSWR('https://api-football-v1.p.rapidapi.com/v3/teams?league=39&season=2022', fetcher);

  //チームの選手をとってくる処理
  const fetcher2 = async (url) => {
    const response = await fetch(url, options);
    const data = await response.json();
  
    if (response.ok) {
      console.log(data);
      return data;
    } else {
      throw new Error(data.message);
    }
  };
  const { data:manu_members, memberserror} = useSWR('https://api-football-v1.p.rapidapi.com/v3/players?team=33&league=39&season=2022&page=1', fetcher2);
  

  if(error){
    return <div>ローディングに失敗しました</div>
  }
  if(!teams){
    return <div>loading...</div>
  }
  console.log(teams);
  console.log(manu_members);
  return(
    <div className={styles.ground_container}>
      <div className={styles.header}>
        <p className='text-blue-500'>俺のプレミアベストイレブン（22~23シーズン）</p>
      </div>
      <main>
        <div className ={styles.teamselect}>
          チーム選択画面
          <select className={styles.select} onChange={handleTeamSelect}>
            <option value="">チームを選択してください</option>
            <option value="Manchester City">マンチェスター・シティ</option>
            <option value="Liverpool">リバプール</option>
            <option value="Chelsea">チェルシー</option>
            <option value="Tottenham">トッテナム・ホットスパー</option>
            <option value="Arsenal">アーセナル </option>
            <option value="Manchester United">マンチェスター・ユナイテッド</option>
            <option value="West Ham">ウェストハム・ユナイテッド</option>
            <option value="Leicester">レスター・シティ</option>
            <option value="Brighton">ブライトン</option>
            <option value="Wolves">ウォルバーハンプトン</option>
            <option value="Newcastle">ニューカッスル・ユナイテッド</option>
            <option value="Crystal Palace">クリスタル・パレス</option>
            <option value="Brentford">ブレントフォード</option>
            <option value="Aston Villa">アストン・ビラ</option>
            <option value="Southampton">サウサンプトン</option>
            <option value="Everton">エバートン</option>
            <option value="Leeds">リーズ・ユナイテッド</option>
            <option value="Fulham">フラム</option>
            <option value="Bournemouth">ボーンマス</option>
            <option value="Nottingham Forest">ノッティンガム・フォレスト</option>
          </select>
          <div className={styles.selected_team_name}>選ばれたチームは{selectedTeam}</div>
        </div>
        <div className={styles.gamezone}>
          <canvas ref={canvasRef} width="600" height="600" className={styles.canvas}> サポートされていません</canvas>
          <div className={styles.player_container}>
            ここに{selectedTeam}の選手一覧が入りますよ
            {selectedTeam === "Manchester United" && (
            <>
              {manu_members.response.map((member) => (
                <div key={member.player.id} className={styles.playerlist}>
                  <p>{member.player.name}</p>
                  <img src={member.player.photo} alt={member.player.photo} height="50" width="50"/>
                </div>
              ))}
            </>
          )}

          </div>
        </div>
        <div>
          <div className={styles.team_logos}>
            {teams.response.map((team) => (
              <div className={styles.team_logo} key={team.team.id}>
                <img src={team.team.logo} alt={team.team.name} height="120" width="120"/>
                <p>{team.team.name}</p>
              </div>
            ))}
          </div>
        </div>

      </main>
      <div className={styles.footer}>
        ここがフッターです
        twitter でみんなにシェアしてみよう
      </div>
    </div>
  )
}

