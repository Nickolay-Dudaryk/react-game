import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createGlobalStyle } from 'styled-components';

// STYLES
const Global = createGlobalStyle`
* {
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
}
`

ReactDOM.render(
  <>
    <Global />
    <App />
  </>,
 document.getElementById('root')
);
