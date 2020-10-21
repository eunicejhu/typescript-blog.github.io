import React, {Component} from 'react'
import "./Event.css"
export default class Event extends Component{
    state = {
        pageX: document.body.clientWidth/2,
        pageY: document.body.clientHeight/2
    }
    
    onMouseEnter = () => {
        const randomPageX = Math.floor(Math.random() * document.body.clientWidth)
        const randomPageY = Math.floor(Math.random() * document.body.clientHeight)
        this.setState({pageX: randomPageX, pageY: randomPageY})
    }   
    render() {
        const {pageX, pageY} = this.state
        return <p style={{position:"absolute", left: pageX, top: pageY}} onMouseEnter={this.onMouseEnter} className="event_label">30 Days of React</p>
    }
}