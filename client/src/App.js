import logo from './logo.svg';
import './App.css';
import './'
import ChatDisplay from './components/ChatDisplay';
import {Login} from "./components/Login";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import React, { Component } from 'react'
import AdminLogin from './components/admin/AdminLogin';
import RoomAdd from './components/admin/RoomAdd'

export default class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }
  // using componentDidMount() to call io("localhost:4000") otherwise it would run
  // the connection event twice
  componentDidMount(){

  }

  componentWillUnmount(){
    // this.socket
    
  }

  render() {
    return (
      <div className= "App">
        <Router>
          <Switch>
            <Route exact path= "/" >
              <Login/>
            </Route>
            <Route path="/chat">
              <ChatDisplay/>
            </Route>
            <Route path="/adminlogin">
              <AdminLogin/>
            </Route>
            <Route path="/room/add">
              <RoomAdd/>
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}


// export default App;
