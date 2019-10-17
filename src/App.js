import React from 'react';
import HeaderPage from './HeaderPage/HeaderPage.js'
import StartPage from './StartPage/StartPage.js'
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={HeaderPage} />
        <Route path="/start" component={StartPage} />
      </div>
    </Router>
  );
}

export default App;
