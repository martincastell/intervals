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
