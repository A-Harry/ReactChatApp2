import React from "react"


export default class Welcome extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render(){
        return <h1>Welcome {this.props.name}</h1>
    }
}