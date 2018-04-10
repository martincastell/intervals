import React, { Component } from 'react';
import 'normalize.css';
import './App.css';
import {
  getRunningIntervalState, INTERVAL_STATUS, pause, reset, resume, setRoundsTo, setRoundTimeTo, start,
  stopIfDone
} from './state/appState';
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
  };

  // Animation loop
  tick = () => this.setState(stopIfDone, () => {
    const isRunning = this.state.startTime && !this.state.pauseTime;
    this.setState({ request: isRunning ? requestAnimationFrame(this.tick) : null });
  });

  // State
  start = pipe(() => this.setState(start), this.tick);
  resume = pipe(() => this.setState(resume), this.tick);
  pause = () => this.setState(pause);
  reset = () => this.setState(reset);

  // Event Listeners
  onRoundsChange = pipe(getEventTargetValue, (rounds) => this.setState(setRoundsTo(rounds)));
  onRoundTimeChange = pipe(getEventTargetValue, (roundTime) => this.setState(setRoundTimeTo(roundTime)));

  render() {
    const {config} = this.state;
    const {status, round, roundRemaining} = getRunningIntervalState(this.state);

    return (
      <div className="App">
        <IntervalConfig config={config}
                        onRoundsChange={this.onRoundsChange}
                        onRoundTimeChange={this.onRoundTimeChange} />
        <div>
          { status === INTERVAL_STATUS.STOPPED ? <button type="button" onClick={this.start}>Start</button> : null }
          { status === INTERVAL_STATUS.RUNNING ? <button type="button" onClick={this.pause}>Pause</button> : null }
          { status === INTERVAL_STATUS.PAUSED ? <button type="button" onClick={this.resume}>Resume</button> : null }
          { status === INTERVAL_STATUS.RUNNING || status === INTERVAL_STATUS.PAUSED ?
            <button type="button" onClick={this.reset}>Reset</button> :
            null
          }
        </div>
        <div>Current Round: {round}</div>
        <div>Current Round Remaining: {roundRemaining}</div>
      </div>
    );
  }
}

export default App;
