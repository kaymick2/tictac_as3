import { useState, useEffect } from 'react';
import './App.css';

var clickCount = 0;
var gameStatus="TIC TAC TOE";

const Timer = ({ timerActive, settimerActive }) => {
  const [seconds, setSeconds] = useState(2);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timerActive) {
        setSeconds(prevSeconds => prevSeconds - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timerActive]);

  useEffect(() => {
    if (seconds === 0) {
      settimerActive(false); // Stop the timer in the parent component
      setSeconds(5);
      clickCount=0;
    }
  }, [seconds, settimerActive]);

 
};
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export function handleClicks(setSquare, setBoard, settimerActive, index) {
  clickCount += 1;
  settimerActive(true); // Start the timer
  let value;

  // if (clickCount % 3 === 1) {
  //   value = "X";
  // } else if (clickCount % 3 === 2) {
  //   value = "O";
  // } else {
  //   value = "";
  // }
  if (clickCount % 2 === 1) {
    value = "X";
  } else {
    value = "O";
  } 
  setSquare(value);
  setBoard(prevBoard => {
    const newBoard = [...prevBoard];
    newBoard[index] = value;
    if (calculateWinner(newBoard)!=null){
      gameStatus="WINNER:"+calculateWinner(newBoard);
    } else if (calculateWinner(newBoard)==null & !newBoard.includes("")){
      gameStatus="Game Over! Refresh the page to play again. ";
      
    }else{
      gameStatus="";
    }
    return newBoard;

  });

}

function handleRefresh(){
    window.location.reload();
  };

export default function App() {
  const [sq1, setSq1] = useState("");
  const [sq2, setSq2] = useState("");
  const [sq3, setSq3] = useState("");
  const [sq4, setSq4] = useState("");
  const [sq5, setSq5] = useState("");
  const [sq6, setSq6] = useState("");
  const [sq7, setSq7] = useState("");
  const [sq8, setSq8] = useState("");
  const [sq9, setSq9] = useState("");
  const [board, setBoard] = useState(Array(9).fill(""));

  const [timerActive, setTimerActive] = useState(false);

  return (
    <>
      <Timer timerActive={timerActive} settimerActive={setTimerActive} />
<h1 className='status'>{gameStatus}</h1>
      <div className='board-row'>
        <button className="square" onClick={() => handleClicks(setSq1, setBoard, setTimerActive, 0)}> {sq1} </button>
        <button className="square" onClick={() => handleClicks(setSq2, setBoard, setTimerActive, 1)}> {sq2} </button>
        <button className="square" onClick={() => handleClicks(setSq3, setBoard, setTimerActive, 2)}> {sq3} </button>
      </div>
      <div className='board-row'>
        <button className="square" onClick={() => handleClicks(setSq4, setBoard, setTimerActive, 3)}> {sq4} </button>
        <button className="square" onClick={() => handleClicks(setSq5, setBoard, setTimerActive, 4)}> {sq5} </button>
        <button className="square" onClick={() => handleClicks(setSq6, setBoard, setTimerActive, 5)}> {sq6} </button>
      </div>
      <div className='board-row'>
        <button className="square" onClick={() => handleClicks(setSq7, setBoard, setTimerActive, 6)}> {sq7} </button>
        <button className="square" onClick={() => handleClicks(setSq8, setBoard, setTimerActive, 7)}> {sq8} </button>
        <button className="square" onClick={() => handleClicks(setSq9, setBoard, setTimerActive, 8)}> {sq9} </button>
      </div>
      <br></br>
      <div>
        <button onClick={handleRefresh}>Do it all over again!</button>
        <h3>board state (dev purposes :3)</h3>
        <pre>{JSON.stringify(board, null, 2)}</pre>
      </div>
    </>
  );
}
