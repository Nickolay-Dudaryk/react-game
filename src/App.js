import React, { useState } from 'react';
import useSound from 'use-sound';
import Board from './components/Board';
import styled from 'styled-components';

import clickSoundX from './assets/sounds/click-1.mp3';
import clickSoundO from './assets/sounds/click-2.mp3';

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

const StyledButton = styled.button`
width: 125px;
height: 45px;
border-radius: 5px;
background-color: transparent;
cursor: pointer;
padding: 5px;
margin: 5px 0;
font-size: 1rem;
`

const App = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);

  const [playX] = useSound(clickSoundX);
  const [playO] = useSound(clickSoundO);
  
  
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
    squares[i] === 'X' ? playX() : playO();
    setHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
    setXisNext(!xIsNext);
  }

  const jumpTo = (step) => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };

  const restartGame = () => {
    setStepNumber(0);
    setXisNext(true);
    setHistory([Array(9).fill(null)]);
  }

  const renderMoves = () => 
    history.map((_step, move) => {
      const destination = move ? `move # ${move}` : 'Go to start';
      return (
        <ListItem key={move}>
          <StyledButton onClick={() => jumpTo(move)}>{destination}</StyledButton>
        </ListItem>
      )
    }
  );

  return (
    <AppWrapper>
      <Board squares={history[stepNumber]} onClick={handleClick} />
      <HistoryWrapper>
        <button onClick={() => restartGame()}>Restart</button>
        <h3 style={winner ? {backgroundColor: 'lightgreen'} : null}>
          {winner ? `winner: ${winner}` : `next player: ${xO}`}
        </h3>
        {renderMoves()}
      </HistoryWrapper>
    </AppWrapper>
  )
}

export default App;
