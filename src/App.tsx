import React from 'react';
// import logo from './logo.svg';
import './App.css';
import FavoriteQuestions from './components/FavoriteQuestions/FavoriteQuestions';
import Questions from './components/Questions/Qustions';
import { questions_ru } from './data/questions';

function App() {
  return (
    <div className='App'>
      <Questions questions={questions_ru} />

      <br />
      <h3>Избранное</h3>
      <FavoriteQuestions questions={questions_ru} />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
