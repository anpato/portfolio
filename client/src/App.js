import React from 'react';
import Header from './components/Header';
import './App.css';
import Admin from './components/Admin';
import Public from './components/Public';
import {Route,Switch} from 'react-router-dom';
import Private from './components/Private';
function App() {
  return (
    <div>
      <Header/>
      <Switch>
        <Route exact path='/' component={Public}/>
        <Route exact path='/admin/login' component={Admin}/>
        <Route exact path='/admin/authenticated' component={Private}/>
      </Switch>
    </div>
  );
}

export default App;
