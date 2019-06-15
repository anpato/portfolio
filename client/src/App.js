import React from 'react';
import Header from './components/Header';
import './styles/App.scss';
import Admin from './components/Admin';
import Public from './components/Public';
import {Route,Switch} from 'react-router-dom';
import Private from './components/Private';
import {Scroll} from 'react-fns'

function App() {

  return (

    <Scroll render={({x,y}) => (
      <div className="app">
      <Header yHeight={y}/>
      <Switch>
        <Route exact path='/' component={(props)=><Public {...props}/>}/>
        <Route exact path='/admin/login' component={(props)=> <Admin {...props}/>}/>
        <Route exact path='/admin/authenticated' component={(props)=> <Private {...props}/>}/>
      </Switch>
      </div>
    )}/>

  );
}

export default App;
