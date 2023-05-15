import React from 'react';
import logo from './logo.svg';
import './App.css';
import Right from './components/right/Right';
import Left from './components/left/Left';

function App() {
  return (
    <div className="App">
      <div className='container'>
        <Right/>
        <Left/>
      </div>
    </div>
  );
}

export default App;
