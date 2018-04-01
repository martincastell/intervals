import React from 'react';

const configStyles = {
  background: 'lightgray',
  display: 'flex',
  padding: 14,
};

const fieldStyles = {
  marginLeft: 14,
};

export default function IntervalConfig({ config, onRoundsChange, onRoundTimeChange }) {
  return <div style={configStyles}>
    <div style={fieldStyles}>
      <label htmlFor="config-rounds">Number of rounds:</label>
      <input id="config-rounds" type="number" value={config.rounds} onChange={onRoundsChange} />
    </div>

    <div style={fieldStyles}>
      <label htmlFor="config-round-time">Round time:</label>
      <input id="config-round-time" type="number" value={config.roundTime} onChange={onRoundTimeChange} />
    </div>
  </div>;
}
