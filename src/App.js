import React, { Component } from 'react';
import 'normalize.css';
import './App.css';
import {
  getRunningIntervalState, 
  INTERVAL_STATUS, 
  pause, 
  reset, 
  resume, 
  setRoundsTo, 
  setRoundTimeTo, 
  start,
  stopIfDone
} from './state/appState';
import {pipe} from './util/functional';
import {beep} from './util/sound';
import IntervalConfig from './components/IntervalConfig/IntervalConfig';
import IntervalInstance from './components/IntervalInstance/IntervalInstance';
import IntervalActions from './components/IntervalActions/IntervalActions';

const getEventTargetValue = (event) => event.target.value;

class App extends Component {

  state = {
    request: null,
    config: {
      rounds: 10,
      roundTime: 10,
    },
    instance: {
      rounds: null,
      roundTime: null, // in seconds
      startTime: null,
      pauseTime: null,
    },
  };

  // Animation loop
  tick = () => this.setState(stopIfDone, () => {
    const {instance} = this.state;
    const isRunning = instance.startTime && !instance.pauseTime;
    this.setState({ request: isRunning ? requestAnimationFrame(this.tick) : null });
  });

  // State
  start = pipe(() => this.setState(start), this.tick, beep);
  resume = pipe(() => this.setState(resume), this.tick);
  pause = () => this.setState(pause);
  reset = () => this.setState(reset);

  // Event Listeners
  onRoundsChange = pipe(getEventTargetValue, (rounds) => this.setState(setRoundsTo(rounds)));
  onRoundTimeChange = pipe(getEventTargetValue, (roundTime) => this.setState(setRoundTimeTo(roundTime)));

  render() {
    const {config, instance} = this.state;
    const intervalState = getRunningIntervalState(instance);
    const status = intervalState.status;

    return (
      <div className="app">
        <IntervalConfig config={config}
                        onRoundsChange={this.onRoundsChange}
                        onRoundTimeChange={this.onRoundTimeChange} />
        <div style={{margin: '20px'}}>
          <div className="app__actions">
            <IntervalActions 
              status={status}
              onStart={this.start}
              onPause={this.pause}
              onResume={this.resume}
              onReset={this.reset}
            />
          </div>
          <IntervalInstance {...intervalState} totalRounds={instance.rounds} />
        </div>
      </div>
    );
  }
}

export default App;
