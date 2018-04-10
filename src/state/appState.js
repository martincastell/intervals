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
    isRunning: true,
    startTime: Date.now(),
  };
}

export function reset() {
  return {
    isRunning: false,
    startTime: null,
    pauseTime: null,
  };
}

export function pause() {
  return {
    isRunning: false,
    pauseTime: Date.now(),
  };
}

export function resume({pauseTime, startTime}) {
  const now = Date.now();

  return {
    isRunning: true,
    startTime: (now - pauseTime) + startTime,
    pauseTime: null,
  };
}

export function getRunningIntervalState({isRunning, config, startTime, pauseTime}) {
  if (startTime) {
    const now = Date.now();
    const totalElapsed = ((pauseTime || now) - startTime) / 1000;
    const round = Math.floor(totalElapsed/config.roundTime) + 1;
    const roundRemaining = round * config.roundTime - totalElapsed;

    return {
      round,
      roundRemaining: roundRemaining.toFixed(1),
    }
  } else {
    return {
      round: 1,
      roundRemaining: config.roundTime,
    }
  }
}
