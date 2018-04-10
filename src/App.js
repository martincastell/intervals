import React, { Component } from 'react';
import 'normalize.css';
import './App.css';
import {getRunningIntervalState, pause, reset, resume, setRoundsTo, setRoundTimeTo, start} from './state/appState';
import IntervalConfig from './components/IntervalConfig/IntervalConfig';
import {pipe} from './util/functional';

const getEventTargetValue = (event) => event.target.value;

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

  // Animation loop functions
  clearAnimationRequest = () => this.setState({ request: null});
  tick = () => this.setState({ request: requestAnimationFrame(this.tick) });
  cancelTick = pipe(() => this.state.request, cancelAnimationFrame, this.clearAnimationRequest);

  // State
  start = pipe(this.tick, () => this.setState(start));
  pause = pipe(this.cancelTick, () => this.setState(pause));
  resume = pipe(this.tick, () => this.setState(resume));
  reset = pipe(this.cancelTick, () => this.setState(reset));

  // Event Listeners
  onRoundsChange = pipe(getEventTargetValue, (rounds) => this.setState(setRoundsTo(rounds)));
  onRoundTimeChange = pipe(getEventTargetValue, (roundTime) => this.setState(setRoundTimeTo(roundTime)));

  render() {
    const {config, isRunning, startTime, pauseTime} = this.state;
    const interval = getRunningIntervalState(this.state);

    return (
      <div className="App">
        <IntervalConfig config={config}
                        onRoundsChange={this.onRoundsChange}
                        onRoundTimeChange={this.onRoundTimeChange} />
        <div>
          { !startTime ? <button type="button" onClick={this.start}>Start</button> : null }
          { startTime && !pauseTime ? <button type="button" onClick={this.pause}>Pause</button> : null }
          { pauseTime ? <button type="button" onClick={this.resume}>Resume</button> : null }
          { startTime ? <button type="button" onClick={this.reset}>Reset</button> : null }
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
