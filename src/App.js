import React, { Component } from 'react';
import 'normalize.css';
import './App.css';
import {getRunningIntervalState, pause, reset, resume, setRoundsTo, setRoundTimeTo, start} from './state/appState';
import IntervalConfig from './components/IntervalConfig/IntervalConfig';

class App extends Component {

  state = {
    config: {
      rounds: 10,
      roundTime: 10,
    },
    request: null,
    // interval instance...
    startTime: null,
    pauseTime: null,
    isRunning: false,
  };

  start = () => {
    this.tick();
    this.setState(start);
  };
  pause = () => {
    this.cancelTick();
    this.setState(pause);
  };
  resume = () => {
    this.tick();
    this.setState(resume)
  };
  reset = () => {
    this.cancelTick();
    this.setState(reset)
  };
  onRoundsChange = (event) => this.setState(setRoundsTo(event.target.value));
  onRoundTimeChange = (event) => this.setState(setRoundTimeTo(event.target.value));

  tick = () => this.setState({ request: requestAnimationFrame(this.tick) });
  cancelTick = () => {
    cancelAnimationFrame(this.state.request);
    this.setState({ request: null});
  };

  render() {
    const {config, isRunning, startTime, pauseTime} = this.state;
    const interval = getRunningIntervalState(this.state);

    return (
      <div className="App">
        <IntervalConfig config={config}
                        onRoundsChange={this.onRoundsChange}
                        onRoundTimeChange={this.onRoundTimeChange} />
        <div>
          <button type="button" onClick={this.start}>Start</button>
          <button type="button" onClick={this.pause}>Pause</button>
          <button type="button" onClick={this.resume}>Resume</button>
          <button type="button" onClick={this.reset}>Reset</button>
        </div>
        <div>isRunning: {isRunning}</div>
        <div>startTime: {startTime}</div>
        <div>pauseTime: {pauseTime}</div>
        <div>Current Round: {interval.round}</div>
        <div>Current Round Remaining: {interval.roundRemaining}</div>
      </div>
    );
  }
}

export default App;
