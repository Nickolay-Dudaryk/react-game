import styled from 'styled-components';

// STYLES
const StyledButton = styled.button`
width: 100%;
cursor: pointer;
font-size: 4rem;
outline: none;
background-color: ${({ theme }) => theme.body};
color: ${({ theme }) => theme.text};
`

const Square = ({ value, onClick }) => (
  <StyledButton onClick={onClick}>
    {value}
  </StyledButton>
)


export default Square
