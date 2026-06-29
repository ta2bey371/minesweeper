import { useState } from 'react'
import './App.css'

function App() {
  const max = 11;
  const center = Math.floor(max/2);
  const density = 0.2;

  const setup = () => {
    let newBoard = Array.from({length:max},()=> Array.from({length:max},()=>({num:0,flg:"c"})));
    let putCount = 0;
    while(putCount < density*(max*max-9)){
      const i = Math.floor(Math.random()*max);
      const j = Math.floor(Math.random()*max);
      if(newBoard[i][j].num!=="b"&&((i<center-1||i>center+1)||(j<center-1||j>center+1))){
        newBoard[i][j].num = "b";
        for(let k=i-1;k<=i+1;k++) for(let l=j-1;l<=j+1;l++) if(k>=0 && k<max && l>=0 && l<max && newBoard[k][l].num!=="b") newBoard[k][l].num += 1;
        putCount++;
      }
    }
    return newBoard;
  }
  const [board,setBoard] = useState(setup());

  return (
    <>
      <h1>hello</h1>
      {board.map((low,i)=>(
        <div key={i}>{low.map((value,j)=>(
          <button key={j}>{value.num}</button>
        ))}</div>
      ))}
    </>
  )
}

export default App
