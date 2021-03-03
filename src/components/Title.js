import styled from 'styled-components';

const StyledTitle = styled.h2`
border: none;
border-radius: 5px;
padding: 5px;
background-color: ${props => props.bgcolor || 'transparent'};
`

const Title = (props) => <StyledTitle {...props} />

export default Title
