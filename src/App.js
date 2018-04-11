import React, { Component } from 'react';
import 'normalize.css';
import './App.css';
import {
  getRunningIntervalState, INTERVAL_STATUS, pause, reset, resume, setRoundsTo, setRoundTimeTo, start,
  stopIfDone
} from './state/appState';
import IntervalConfig from './components/IntervalConfig/IntervalConfig';
import {pipe} from './util/functional';
import Button from './components/Button/Button';

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
      <div className="app">
        <IntervalConfig config={config}
                        onRoundsChange={this.onRoundsChange}
                        onRoundTimeChange={this.onRoundTimeChange} />
        <div style={{margin: '20px'}}>
          <div className="app__actions">
            { status === INTERVAL_STATUS.STOPPED ? <Button onClick={this.start}>Start</Button> : null }
            { status === INTERVAL_STATUS.RUNNING ? <Button onClick={this.pause}>Pause</Button> : null }
            { status === INTERVAL_STATUS.PAUSED ? <Button onClick={this.resume}>Resume</Button> : null }
            {
              status === INTERVAL_STATUS.RUNNING || status === INTERVAL_STATUS.PAUSED ?
                <Button className="button--secondary" onClick={this.reset}>Reset</Button> :
                null
            }
          </div>
          <div style={{fontSize: 36, margin: '12px 0'}}>{roundRemaining}</div>
          <div>Round: {round} out of {config.rounds}</div>
        </div>
      </div>
    );
  }
}

export default App;
