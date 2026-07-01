// Try-Angle Zen Garden - Interactive Audio & Logging
document.addEventListener('DOMContentLoaded', () => {
  console.log("Welcome to Try-Angle. A calm space in the digital landscape.");

  const soundscapeBtn = document.getElementById('soundscape-btn');
  let audioCtx = null;
  let noiseSource = null;
  let gainNode = null;
  let lfo = null;

  // brown noise sounds way more like real rain than white noise does
  function createBrownNoise(ctx) {
    const bufferSize = 2 * ctx.sampleRate;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;
    
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = data[i];
      data[i] *= 3.5;
    }
    
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    return source;
  }

  function startSoundscape() {
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      noiseSource = createBrownNoise(audioCtx);
      
      // muffles it so it feels like it's coming from outside
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 750;
      filter.Q.value = 0.5;
      
      gainNode = audioCtx.createGain();
      gainNode.gain.value = 0.04;
      
      // slow wobble on the volume, like gusts of wind
      lfo = audioCtx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = 0.07; // ~14s per cycle
      
      const lfoGain = audioCtx.createGain();
      lfoGain.gain.value = 0.015;
      
      lfo.connect(lfoGain);
      lfoGain.connect(gainNode.gain);
      
      noiseSource.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      noiseSource.start(0);
      lfo.start(0);
      
      soundscapeBtn.textContent = '[ Soundscape: On ]';
      soundscapeBtn.classList.add('is-active');
    } catch (e) {
      console.warn("Autoplay or audio interface failed to start:", e);
    }
  }

  function stopSoundscape() {
    if (noiseSource) {
      try { noiseSource.stop(); } catch (err) {}
      noiseSource = null;
    }
    if (lfo) {
      try { lfo.stop(); } catch (err) {}
      lfo = null;
    }
    if (audioCtx) {
      audioCtx.close();
      audioCtx = null;
    }
    soundscapeBtn.textContent = '[ Soundscape: Off ]';
    soundscapeBtn.classList.remove('is-active');
  }

  soundscapeBtn.addEventListener('click', () => {
    if (audioCtx && audioCtx.state === 'running') {
      stopSoundscape();
    } else {
      startSoundscape();
    }
  });
});