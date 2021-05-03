import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  var A = '10';
  var B = 10;
  var C = ['A', 'B', 'C'];
  var D = {
    a: 'A',
    b:'B',
  }
  console.log(A);
  console.log(B);
  console.log(C);
  console.log(D);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and lưu lại.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
