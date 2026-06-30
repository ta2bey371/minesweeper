import { useEffect, useState } from 'react'
import './App.css'

function App() {
  let count = 0;
  const max = 11;
  const center = Math.floor(max/2);
  const density = 0.15;

  const [playerColor,setColor] = useState("red");
  const [putflg,setFlg] = useState(false);
  const [cellCount,setCellCount] = useState(max*max);
  const [cellPoints,setCellPoints] = useState({red:0,aqua:0});
  const [bombPoints,setBombPoints] = useState({red:0,aqua:0});

  const open = (array,i,j,color) => {
    if(array[i][j].flg === "c"){
      count++;
      array[i][j] = {num:array[i][j].num===0?"":array[i][j].num,flg:"o",color:color,text:"black"};
      if(array[i][j].num === "") for(let k=i-1;k<=i+1;k++) for(let l=j-1;l<=j+1;l++) if(k>=0 && k<max && l>=0 && l<max && array[k][l].flg==="c") open(array,k,l,color);
    }
    return array;
  }

  const useflg = (array,i,j,color) => {
    let bombPoint = bombPoints;
    if(array[i][j].flg === "c"){
      array[i][j] = {num:array[i][j].num,flg:"f",color:"gray",text:color};
      setCellCount(cellCount-1);
      if(array[i][j].num === "x") bombPoint[color]+=5;
    }else if(array[i][j].flg === "f" && playerColor===array[i][j].text){
      array[i][j] = {num:array[i][j].num,flg:"c",color:"gray",text:"black"};
      setCellCount(cellCount+1);
      if(array[i][j].num === "x") bombPoint[color]-=5;
    }
    setBombPoints(bombPoint);
    return array;
  }

  const setup = () => {
    let newBoard = Array.from({length:max},()=> Array.from({length:max},()=>({num:0,flg:"c",color:"gray",text:"black"})));
    let putCount = 0;
    while(putCount < density*(max*max-9)){
      const i = Math.floor(Math.random()*max);
      const j = Math.floor(Math.random()*max);
      if(newBoard[i][j].num!=="x"&&((i<center-1||i>center+1)||(j<center-1||j>center+1))){
        newBoard[i][j].num = "x";
        for(let k=i-1;k<=i+1;k++) for(let l=j-1;l<=j+1;l++) if(k>=0 && k<max && l>=0 && l<max && newBoard[k][l].num!=="x") newBoard[k][l].num += 1;
        putCount++;
      }
    }
    newBoard = open(newBoard,center,center,"white");
    setCellCount(cellCount-count);
    return newBoard;
  }
  const [board,setBoard] = useState(()=>setup());

  return (
    <>
      <h1>hello</h1>
      <div>
        <button onClick={()=>setFlg(putflg?false:true)}>flg</button>
        <span>旗置きフラグ：{putflg?"ON":"OFF"}</span>
        <span>現在のプレイヤー：{playerColor}</span>
      </div>
      <p>残りマス数：{cellCount}</p>
      <p>{cellPoints.red}：{cellPoints.aqua}</p>
      <p>{bombPoints.red}：{bombPoints.aqua}</p>
      {board.map((low,i)=>(
        <div key={i} className='low'>{low.map((value,j)=>(
          <button 
            style={{backgroundColor:value.color,color:value.text}}
            onClick={()=>{
              if(putflg === false) {
                let cellPoint = cellPoints;
                setBoard(open(structuredClone(board),i,j,playerColor));
                setCellCount(cellCount-count);
                cellPoint[playerColor]+=count;
                setCellPoints(cellPoint);
              }
              else setBoard(useflg(structuredClone(board),i,j,playerColor));
              if(value.flg==="c"||(value.flg==="f"&&playerColor===value.color))setColor(playerColor==="red"?"aqua":"red");
            }} 
            key={j}>
            {value.flg=="o"?value.num:value.flg=="f"?"f":""}
          </button>
        ))}</div>
      ))}
    </>
  )
}

export default App
