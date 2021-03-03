import React, { useState, useEffect } from 'react';
import useSound from 'use-sound';
import styled, { createGlobalStyle } from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './Themes';
import { calculateWinner } from './utils';
// COMPONENTS
import Board from './components/Board';
import Flex from './components/Flex';
import Title from './components/Title';
import Footer from './components/Footer'
// SOUNDS
import clickSoundX from './assets/sounds/click-1.mp3';
import clickSoundO from './assets/sounds/click-2.mp3';
import endGameSound from './assets/sounds/end-game.mp3';

// STYLES
const GlobalStyles = createGlobalStyle`
* {
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
}
body {
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
  transition: all 0.50s linear;
}
`
const AppWrapper = styled.div`
max-width: 500px;
min-height: 95vh;
display: flex;
justify-content: center;
align-items: center;
`
const ListItem = styled.li`
list-style: none;
`
const StyledButton = styled.button`
width: 150px;
height: 45px;
border-radius: 5px;
background-color: ${({ theme }) => theme.body};
color: ${({ theme }) => theme.text};
cursor: pointer;
padding: 5px;
margin: 5px 0;
font-size: 1rem;
`

const App = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const [theme, setTheme] = useState('light');
  const [volumeLevel, setVolumeLevel] = useState(true);

  const [playX] = useSound(clickSoundX, {volume: volumeLevel ? 1 : 0});
  const [playO] = useSound(clickSoundO, {volume: volumeLevel ? 1 : 0});
  const [playEndGame] = useSound(endGameSound, {volume: volumeLevel ? 1 : 0});

  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }

  const calculateIsDraw = () => history[stepNumber].indexOf(null) === - 1

  const winner = calculateWinner(history[stepNumber]);
  const isDraw = calculateIsDraw()
  const xO = xIsNext ? 'X' : 'O';

  useEffect(() => {
    if (winner || isDraw) {
      playEndGame()
    };
  }, [playEndGame, winner, isDraw])

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
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <>
        <GlobalStyles />
          <AppWrapper>
            <Flex justify='center' align='center'>
              <Flex justify='center' align='center' direction='column'>
                <Flex justify='center' align='center'>
                  <h3 style={{marginRight: '15px'}}>Sounds</h3>
                  <input
                   type='checkbox'
                   style={{width: '25px', height: '25px'}}
                   checked={volumeLevel}
                   onChange={() => {
                    setVolumeLevel(!volumeLevel);
                    }} 
                  />
                </Flex>

                <Board squares={history[stepNumber]} onClick={handleClick} />
                <Title bgcolor={winner ? 'lightgreen' : null}>
                  {winner
                   ? `winner: ${winner}`
                   : isDraw ? 'Draw'
                   : `next player: ${xO}`
                  }
                </Title>
                <StyledButton 
                  style={winner || isDraw ? {backgroundColor: 'lightblue'} : null}
                  onClick={() => restartGame()}
                >
                  Restart
                </StyledButton>
                <StyledButton onClick={themeToggler}>Switch Theme</StyledButton>
              </Flex>
                
              <ul>
                {renderMoves()}
              </ul>
            </Flex>        
          </AppWrapper>
          <Footer />
      </>

    </ThemeProvider>
  )
}

export default App;
