import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './Landing';
import About from './About';
import Music from './Music';
import NotFound from './NotFound';

const routing = (
    <Router>
        <Switch>
             <Route path="/about" component={About} />
             <Route path="/music" component={Music} />
            <Route path="/" exact component={Landing} />
            <Route component={NotFound} />
        </Switch>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));

