import React, { useState, useEffect } from 'react';
import useSound from 'use-sound';
import styled from 'styled-components';
// COMPONENTS
import Board from './components/Board';
import Flex from './components/Flex';
import Title from './components/Title'
// SOUNDS
import clickSoundX from './assets/sounds/click-1.mp3';
import clickSoundO from './assets/sounds/click-2.mp3';
import endGameSound from './assets/sounds/end-game.mp3';

// STYLES
const AppWrapper = styled.div`
max-width: 500px;
min-height: 100vh;
display: flex;
justify-content: center;
align-items: center;
`
const ListItem = styled.li`
list-style: none;
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
  const [playEndGame] = useSound(endGameSound);
  
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

  const calculateIsOccupied = () => history[stepNumber].indexOf(null) === - 1

  const winner = calculateWinner(history[stepNumber]);
  const isOccupied = calculateIsOccupied()
  const xO = xIsNext ? 'X' : 'O';

  useEffect(() => {
    if (winner || isOccupied) {
      playEndGame()
    };
  }, [playEndGame, winner, isOccupied])

  const handleClick = (i) => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current];
    if (winner || isOccupied) return; //if won || occupied
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
      <Flex justify='center' align='center'>
        <Flex justify='center' align='center' direction='column'>
          <Board squares={history[stepNumber]} onClick={handleClick} />
          <Title bgcolor={winner ? 'lightgreen' : null}>
            {winner
             ? `winner: ${winner}`
             : isOccupied ? 'Draw'
             : `next player: ${xO}`
            }
          </Title>
          <StyledButton 
            style={winner || isOccupied ? {backgroundColor: 'lightblue'} : null}
            onClick={() => restartGame()}
          >
            Restart
          </StyledButton>
        </Flex>

        <ul>
          {renderMoves()}
        </ul>
      </Flex>
    </AppWrapper>
  )
}

export default App;
