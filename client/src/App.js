import logo from './logo.svg';
import './App.css';
import './'
import Welcome from './components/ChatDisplay';
import {io} from "socket.io-client"

import React, { Component } from 'react'

export default class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }
  // using componentDidMount() to call io("localhost:4000") otherwise it would run
  // the connection event twice
  componentDidMount(){
    this.socket = io("localhost:4000");
  }

  componentWillUnmount(){
    this.socket.disconnect()
    
  }

  render() {
    return (
      <div>
      </div>
    )
  }
}


// export default App;
