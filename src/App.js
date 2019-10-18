import React from 'react';
import HeaderPage from './HeaderPage/HeaderPage.js'
import CountStartPage from './CountStartPage/CountStartPage.js'
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

function App() {
  return (
    <Router basename="/inventory-control">
      <div>
        <Route exact path="/" ><HeaderPage testParam="test value"/></Route>
        <Route path="/start"><CountStartPage /></Route>
      </div>
    </Router>
  );
}

export default App;
