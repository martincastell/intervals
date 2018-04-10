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

export function getRunningIntervalState({config, startTime, pauseTime}) {
  if (startTime) {
    const now = Date.now();
    const totalElapsed = ((pauseTime || now) - startTime) / 1000;
    const round = Math.floor(totalElapsed/config.roundTime) + 1;
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
