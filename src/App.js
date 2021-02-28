import React, { useState } from 'react';
import Board from './components/Board';
import styled from 'styled-components';

// STYLES
const AppWrapper = styled.div`
max-width: 500px;
min-height: 100vh;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column; 
`

const ListItem = styled.li`
list-style: none;
`

const HistoryWrapper = styled.div`
min-height: 300px;
width: 100%;
display: flex;
align-items: center;
flex-direction: column;
`

const App = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  
  const calculateWinner = (squares) => {
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

  const winner = calculateWinner(history[stepNumber]);
  const xO = xIsNext ? 'X' : 'O';

  const handleClick = (i) => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current];
    if (winner || squares[i]) return; //if won || occupied
    squares[i] = xO;
    setHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
    setXisNext(!xIsNext);
  }

  const jumpTo = (step) => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };

  const renderMoves = () => 
    history.map((_step, move) => {
      const destination = move ? `move # ${move}` : 'Go to start';
      return (
        <ListItem key={move}>
          <button onClick={() => jumpTo(move)}>{destination}</button>
        </ListItem>
      )
    }
  );

  return (
    <AppWrapper>
      <Board squares={history[stepNumber]} onClick={handleClick} />
      <HistoryWrapper>
        <h3>{winner ? `winner: ${winner}` : `next player: ${xO}`}</h3>
        {renderMoves()}
      </HistoryWrapper>
    </AppWrapper>
  )
}

export default App;
