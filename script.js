// Try-Angle Zen Garden - Interactive Audio & Logging
document.addEventListener('DOMContentLoaded', () => {
  console.log("Welcome to Try-Angle. A calm space in the digital landscape.");

  const soundscapeBtn = document.getElementById('soundscape-btn');
  let audioCtx = null;
  let noiseSource = null;
  let gainNode = null;
  let lfo = null;

  // Synthesize Brownian Noise for realistic, organic rain sounds
  function createBrownNoise(ctx) {
    const bufferSize = 2 * ctx.sampleRate;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;
    
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Brownian accumulation formula
      data[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = data[i];
      data[i] *= 3.5; // Compensate for natural low-pass attenuation
    }
    
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    return source;
  }

  function startSoundscape() {
    try {
      // Initialize Audio Context
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      
      // Brownian Noise Source
      noiseSource = createBrownNoise(audioCtx);
      
      // Biquad Filter: Low-pass filter makes noise sound like muffled outdoor rain
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 750; // soft and damp
      filter.Q.value = 0.5;
      
      // Gain node for volume control
      gainNode = audioCtx.createGain();
      gainNode.gain.value = 0.04; // low background ambiance
      
      // LFO: Low Frequency Oscillator modulates volume to mimic moving wind gusts
      lfo = audioCtx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = 0.07; // 14.2 second cycle
      
      const lfoGain = audioCtx.createGain();
      lfoGain.gain.value = 0.015; // modulate volume range slightly
      
      lfo.connect(lfoGain);
      lfoGain.connect(gainNode.gain);
      
      // Connect sound graph
      noiseSource.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      // Begin synthesis
      noiseSource.start(0);
      lfo.start(0);
      
      soundscapeBtn.textContent = '[ Soundscape: On ]';
      soundscapeBtn.classList.add('text-stone-850', 'border-stone-400');
      soundscapeBtn.classList.remove('text-stone-400', 'border-stone-200');
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
    soundscapeBtn.classList.remove('text-stone-850', 'border-stone-400');
    soundscapeBtn.classList.add('text-stone-400', 'border-stone-200');
  }

  soundscapeBtn.addEventListener('click', () => {
    if (audioCtx && audioCtx.state === 'running') {
      stopSoundscape();
    } else {
      startSoundscape();
    }
  });
});