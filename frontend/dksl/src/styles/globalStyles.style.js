import { createGlobalStyle, css } from 'styled-components';

const GlobalStyles = createGlobalStyle`

#root {
  width: 100vw;
  height: 100%;
}

:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #f0f0f0;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;

  --maincolor-depth1: #3E7CB1;
  --maincolor-depth2: #DBE4EE;
  --mainbg: #f0f0f0;
  --text-gray: #758592;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 600;
  font-family: inherit;
  color: white;
  background-color: var(--maincolor-depth1);
  cursor: pointer;
  transition: all 0.25s;
}

button:hover {
  transform: scale(.25rem);
  filter: drop-shadow(0 0 .1rem var(--maincolor-depth1));
}

a {
  text-decoration: none;
  color: black;
  transition: all .2s;
}

a:link { color: black; }
a:visited { color: black; }

input:focus {
  outline: none;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #f5f5f5;
  }
  a:hover {
    color: var(--maincolor-depth1);
  }
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes loadEffect {
    0% {
      opacity: 0;
      transform: scale(0.7);
    }
    65% {
      opacity: 0.65;
      transform: scale(1.01);
    }
    85% {
      opacity: 0.85;
      transform: scale(0.97);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

@keyframes typing {
  from {
    width: 0
  }
}
    
@keyframes blink {
  50% {
    border-color: transparent
  }
}

@keyframes animloader {
  0% { width: ${48 / 10}px;}
  100% { width: 48px;}
}
`;

export const Tag = css`
  width: 4.5rem;
  height: 1.75rem;
  margin: 0;
  border: 2px solid transparent;
  border-radius: 50vw;
  color: white;
  font-size: small;
  display: flex;
  justify-content: center;
  align-items: center;

  & .text {
    width: fit-content;
    height: fit-content;
    text-align: center;
  }
`;

export const Card = css`
  background-color: white;
  margin: 0.5rem;
  margin-left: auto;
  margin-right: auto;
  border: 2px solid #dfdfdf;
  border-radius: 10px;

  & .title {
    width: 98%;
    margin-top: 0.2rem;
    padding: 1.2rem 0;
    padding-left: 2%;
    border-bottom: 1px solid #dfdfdf;
    font-size: medium;
    font-weight: bold;
  }
`;

export default GlobalStyles;
