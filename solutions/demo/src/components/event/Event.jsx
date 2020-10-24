import React, {Component} from 'react'
import "./Event.css"
import EventStyles from "../../styles/Event.module.scss"
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
        return <p className={EventStyles.event_p}  style={{position:"absolute", left: pageX, top: pageY}} onMouseEnter={this.onMouseEnter}>30 Days of React<span>Congratulations!</span></p>
    }
}