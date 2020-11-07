import React, { Component } from "react";
import classNames from "classnames/bind";
import { AiFillAlert } from "react-icons/ai";
import "./Event.css";
import EventStyles from "../../styles/Event.module.scss";

const cx = classNames.bind(EventStyles);

export default class Event extends Component {
  state = {
    pageX: document.body.clientWidth / 2,
    pageY: document.body.clientHeight / 2,
    type: "warnning",
  };

  onMouseEnter = () => {
    const randomPageX = Math.floor(Math.random() * document.body.clientWidth);
    const randomPageY = Math.floor(Math.random() * document.body.clientHeight);
    this.setState({ pageX: randomPageX, pageY: randomPageY });
  };

  render() {
    const { pageX, pageY, type } = this.state;
    const spanClassNames = cx({
      error: type === "error",
      warnning: type === "warnning",
      info: type === "info",
    });
    return (
      <p
        className={EventStyles.event_p}
        style={{ position: "absolute", left: pageX, top: pageY }}
        onMouseEnter={this.onMouseEnter}
      >
        30 Days of React
        <AiFillAlert style={{ width: "10em" }} color="yellow" />
        <span className={spanClassNames}>Congratulations!</span>
      </p>
    );
  }
}
