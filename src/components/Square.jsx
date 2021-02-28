import styled from 'styled-components';

// STYLES
const StyledButton = styled.button`
width: 100%;
cursor: pointer;
font-size: 4rem;
outline: none;
`

const Square = ({ value, onClick }) => (
  <StyledButton onClick={onClick}>{value}</StyledButton>
)


export default Square
