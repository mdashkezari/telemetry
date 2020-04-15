import React from 'react';
import './App.css';
import {Route, Switch, BrowserRouter} from 'react-router-dom'

import LandingPage from './components/landing_page/landing_page';
import Home from './components/home/home'
import UtilDB from './components/util-db/util_db'
import UtilAPI from './components/util-api/util_api'
import UtilUsage from './components/util-usage/util_usage'



class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path='/' exact component={LandingPage} />
            <Route path='/utils' exact component={Home} />
            <Route path='/utils/db' exact component={UtilDB} />
            <Route path='/utils/api' exact component={UtilAPI} />
            <Route path='/utils/usage' exact component={UtilUsage} />
          </Switch>  
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
