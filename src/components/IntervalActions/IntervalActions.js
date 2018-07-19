import React, {Fragment} from 'react';
import Button from '../Button/Button';
import {INTERVAL_STATUS} from '../../state/appState';

export default function IntervalActions({ status, onStart, onPause, onResume, onReset }) {
  return <Fragment>
    { status === INTERVAL_STATUS.STOPPED ? <Button onClick={onStart}>Start</Button> : null }
    { status === INTERVAL_STATUS.RUNNING ? <Button onClick={onPause}>Pause</Button> : null }
    { status === INTERVAL_STATUS.PAUSED ? <Button onClick={onResume}>Resume</Button> : null }
    {
      status === INTERVAL_STATUS.RUNNING || status === INTERVAL_STATUS.PAUSED ?
        <Button className="button--secondary" onClick={onReset}>Reset</Button> :
        null
    }
  </Fragment>;
}
