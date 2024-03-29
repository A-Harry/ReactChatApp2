import logo from './logo.svg';
import './App.css';
import "./assets/styles.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import './'
import ChatDisplay from './components/ChatDisplay';
import {Login} from "./components/Login";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import React, { Component } from 'react'
import AdminLogin from './components/admin/AdminLogin';
import RoomAdd from './components/admin/RoomAdd'
import Admin from './components/admin/Admin';

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
            <Route exact path= "/" component={Login}/>
            <Route path="/chat" component={ChatDisplay}/>
            <Route path="/adminlogin" component={AdminLogin}/>
            <Route path="/admin" component={Admin} />
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
