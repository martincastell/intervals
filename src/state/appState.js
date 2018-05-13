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

export function start({config}) {
  return {
    instance: {
      rounds: config.rounds,
      roundTime: config.roundTime,
      startTime: Date.now(),
    },
  };
}

export function reset() {
  return {
    instance: {
      rounds: null,
      roundTime: null,
      startTime: null,
      pauseTime: null,
    },
  };
}

export function pause({instance}) {
  return {
    instance: {
      ...instance,
      pauseTime: Date.now(),
    },
  };
}

export function resume({instance}) {
  const {pauseTime, startTime} = instance;
  const now = Date.now();

  return {
    instance: {
      ...instance,
      startTime: (now - pauseTime) + startTime,
      pauseTime: null,
    },
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

export function stopIfDone({instance}) {
  const totalElapsed = getTotalElapsed(instance);
  const round = getRound(totalElapsed, instance.roundTime);
  return round > instance.rounds ? { startTime: null } : null;
}

export function getRunningIntervalState({rounds, roundTime, startTime, pauseTime}) {
  if (startTime) {
    const totalElapsed = getTotalElapsed({pauseTime, startTime});
    const round = getRound(totalElapsed, roundTime);
    const roundRemaining = round * roundTime - totalElapsed;

    return {
      status: pauseTime ? INTERVAL_STATUS.PAUSED : INTERVAL_STATUS.RUNNING,
      round,
      roundRemaining: roundRemaining.toFixed(1),
    }
  } else {
    return {
      status: INTERVAL_STATUS.STOPPED,
      round: 1,
      roundRemaining: roundTime,
    }
  }
}
