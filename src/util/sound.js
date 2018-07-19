const type = 'sine';
const frequency = 440;
const context = new AudioContext();

export function beep() {
  const o = context.createOscillator();
  const g = context.createGain();
  o.type = type;
  o.connect(g);
  o.frequency.value = frequency;
  g.connect(context.destination);
  o.start(0);
  g.gain.exponentialRampToValueAtTime(0.00001,context.currentTime+1);
}
