import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import Home from './Home';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}></Route>
      </Switch>
    </Router>
  );
}

export default App;
