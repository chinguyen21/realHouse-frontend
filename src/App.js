import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import {Typography, Button, AppBar, Toolbar, Avatar } from '@material-ui/core';
import styling from './css/Styling'
import './css/App.css';

import Login from './authentication/Login';
import Signup from './authentication/Signup';
import HomePage from './visual/HomePage';
import SearchPage from './search_page/SearchPage';

const App = () => {
  const [user, setUser] = useState({})
  const [loggedIn, setLoggedIn] = useState(localStorage.token ? true : false)
  const [searchPlace, setSearchPlace] = useState({})

  const handleLogout = () => {
    localStorage.clear();
    setUser({});
    setLoggedIn(false);
    <Redirect to="/"/>
  }

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/finduser", {
      headers: {"Content-Type": "application/json"}})
    .then(res => res.json())
    .then(response => {
      if (response.id) setUser(response)
    })
  },[])

  return (
    <div className={styling().root}>

      <Router>
        {!loggedIn ? 
          <AppBar position="static">
            <Toolbar style={{background: "#f2e9e1"}}>
              <Typography variant="h6" className={styling().title} >
                <Button><Link to= "/" className="appBar">Home</Link></Button>
              </Typography>
              <Button><Link to= "/login" className="appBar">Log In</Link></Button>
              <Button><Link to= "/signup" className="appBar">Sign Up</Link></Button>
            </Toolbar>
          </AppBar>
        :
          <AppBar position="static">
            <Toolbar style={{background: "#f2e9e1"}}>
              <Typography variant="h6" className={styling().title} >
                <Button><Link to= "/" className="appBar">Home</Link></Button>
              </Typography>
              <Button><Link to= "/search-page" className="appBar">All Properties</Link></Button>
              <Button className="appBar" onClick={handleLogout}>Log Out</Button>
              <Avatar>{user.name!==undefined ? user.name.slice(0,1) : null}</Avatar>
            </Toolbar>
          </AppBar>
          }
        <Switch>
          <Route exact path='/'>
            <HomePage loggedIn={loggedIn} setSearchPlace={setSearchPlace}/>
          </Route>
          <Route exact path='/login'>
            <Login setUser={setUser} setLoggedIn={setLoggedIn}/>
          </Route>
          <Route exact path='/signup'>
            <Signup setUser={setUser} setLoggedIn={setLoggedIn}/>
          </Route>
          <Route exact path='/search-page'>
            <SearchPage searchPlace={searchPlace}/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;


