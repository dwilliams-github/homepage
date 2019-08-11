import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from './Landing';


const routing = (
    <Router>
      <div>
        <Route path="/" component={Landing} />
      </div>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));

