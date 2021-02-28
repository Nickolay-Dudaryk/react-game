import styled from 'styled-components';
//Components
import Square from './Square';

//STYLES
const BoardWrapper = styled.div`
width: 420px;
height: 420px;
display: grid;
grid-template: repeat(3, 1fr) / repeat(3, 1fr);
gap: 0.4rem;
padding: 20px;
margin: 0;
`

const Board = ({ squares, onClick }) => (
  <BoardWrapper>
    {squares.map((square, i) => (
      <Square key={i} value={square} onClick={() => onClick(i)} />
    ))}
  </BoardWrapper>
);

export default Board
