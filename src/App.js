import React, { Component } from 'react';
import './App.css';
import IntervalConfig from './components/IntervalConfig/IntervalConfig';
import {setRoundsTo, setRoundTimeTo} from './state/appState';

class App extends Component {

  state = {
    config: {
      rounds: 10,
      roundTime: 60,
    },
  };

  onRoundsChange = (event) => this.setState(setRoundsTo(event.target.value));
  onRoundTimeChange = (event) => this.setState(setRoundTimeTo(event.target.value));

  render() {
    const {config} = this.state;
    const {onRoundsChange, onRoundTimeChange} = this;

    return (
      <div className="App">
        <IntervalConfig config={config}
                        onRoundsChange={onRoundsChange}
                        onRoundTimeChange={onRoundTimeChange} />
      </div>
    );
  }
}

export default App;
