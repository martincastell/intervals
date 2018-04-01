import React from 'react';

export default function IntervalConfig({ config, onRoundsChange, onRoundTimeChange }) {
  return <div>
    <div>
      <label htmlFor="config-rounds">Number of rounds:</label>
      <input id="config-rounds" type="number" value={config.rounds} onChange={onRoundsChange} />
    </div>

    <div>
      <label htmlFor="config-round-time">Round time:</label>
      <input id="config-round-time" type="number" value={config.roundTime} onChange={onRoundTimeChange} />
    </div>
  </div>;
}
