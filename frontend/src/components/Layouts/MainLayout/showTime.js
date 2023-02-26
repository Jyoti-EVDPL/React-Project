import React, { Component } from "react";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = { time: new Date() };
    this.tick = () => setInterval(() => this.setState({ time: new Date() }),1000);
  }
  componentDidMount(){
    this.tick();
  }
  render() {
    return (
      <span>
       Time: {this.state.time.toLocaleTimeString()}
      </span>
    );
  }
}
export default Timer;