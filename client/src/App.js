import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from "./pages/Home";
import Nyse from "./pages/Nyse";
import Nasdaq from "./pages/Nasdaq";
import CryptoCurrency from "./pages/Crypto";
import Portfolio from "./pages/Portfolio";
import Nav from "./components/Nav";



const App = () => (
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/nyse" component={Nyse} />
        <Route exact path="/nasdaq" component={Nasdaq} />
        <Route exact path="/crypto" component={CryptoCurrency} />
        <Route exact path="/portfolio" component={Portfolio} />
      </Switch>
    </div>
  </Router>
);

export default App;
