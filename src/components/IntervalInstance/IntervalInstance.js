import React, {Fragment} from 'react';
import {INTERVAL_STATUS} from '../../state/appState';
import {beep} from '../../util/sound';

export default class IntervalInstance extends React.Component {

  componentDidUpdate(prevProps) {
    if (prevProps.round !== this.props.round) {
      console.warn('round just changed to ', this.props.round);
    }
    if (Number.parseInt(prevProps.roundRemaining, 10) !== Number.parseInt(this.props.roundRemaining, 10) && 
      Number.parseInt(this.props.roundRemaining, 10) < 2) {
      console.warn('roundRemaining just changed to ', this.props.roundRemaining);
      beep();
    }
  }
  
  render() {
    const {roundRemaining, round, status, totalRounds} = this.props;
    return (<Fragment>
      <div style={{fontSize: 36, margin: '12px 0'}}>{roundRemaining}</div>
      { status !== INTERVAL_STATUS.STOPPED ? <div>Round: {round} out of {totalRounds}</div> : null }
    </Fragment>);
  }
}
