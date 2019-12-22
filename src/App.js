import React from "react";
import HeaderPage from "./HeaderPage/HeaderPage.js";
import CountStartPage from "./CountStartPage/CountStartPage.js";
import ScanPage from "./ScanPage/ScanPage.js";
import ReviewPage from "./ReviewPage/ReviewPage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  toast.configure();
  return (
    <Router basename="/inventory-control">
      <div>
        <Route exact path="/">
          <HeaderPage />
        </Route>
        <Route exact path="/start">
          <CountStartPage />
        </Route>
        <Route exact path="/scan">
          <ScanPage />
        </Route>
        <Route exact path="/review">
          <ReviewPage />
        </Route>
      </div>
    </Router>
  );
}

export default App;
