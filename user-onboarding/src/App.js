import React from 'react';
import logo from './logo.svg';
import './App.css';
 import OnboardForm from "./Form";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Sign Up Now!</h1>

        <OnboardForm />
      </header>
    </div>
  );
}

export default App;
