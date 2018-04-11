export const INTERVAL_STATUS = {
  STOPPED: 'STOPPED',
  RUNNING: 'RUNNING',
  PAUSED: 'PAUSED',
};

function updateConfig(config = {}, changes) {
  return {
    ...config,
    ...changes,
  };
}

export function setRoundsTo(rounds) {
  return (state) => ({ config: updateConfig(state.config, {rounds}) });
}

export function setRoundTimeTo(roundTime) {
  return (state) => ({ config: updateConfig(state.config, {roundTime}) });
}

export function start() {
  return {
    startTime: Date.now(),
  };
}

export function reset() {
  return {
    startTime: null,
    pauseTime: null,
  };
}

export function pause() {
  return {
    pauseTime: Date.now(),
  };
}

export function resume({pauseTime, startTime}) {
  const now = Date.now();

  return {
    startTime: (now - pauseTime) + startTime,
    pauseTime: null,
  };
}

function getTotalElapsed({pauseTime, startTime}) {
  return startTime ?
    ((pauseTime || Date.now()) - startTime) / 1000 :
    0;
}

function getRound(totalElapsed, roundTime) {
  return Math.floor(totalElapsed/roundTime) + 1;
}

export function stopIfDone(state) {
  const totalElapsed = getTotalElapsed(state);
  const round = getRound(totalElapsed, state.config.roundTime);
  return round > state.config.rounds ? { startTime: null } : null;
}

export function getRunningIntervalState({config, startTime, pauseTime}) {
  if (startTime) {
    const totalElapsed = getTotalElapsed({pauseTime, startTime});
    const round = getRound(totalElapsed, config.roundTime);
    const roundRemaining = round * config.roundTime - totalElapsed;

    return {
      status: pauseTime ? INTERVAL_STATUS.PAUSED : INTERVAL_STATUS.RUNNING,
      round,
      roundRemaining: roundRemaining.toFixed(1),
    }
  } else {
    return {
      status: INTERVAL_STATUS.STOPPED,
      round: 1,
      roundRemaining: config.roundTime,
    }
  }
}
