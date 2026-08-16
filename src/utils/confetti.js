import confetti from 'canvas-confetti';

export const triggerConfetti = (type = 'standard') => {
  if (typeof window === 'undefined') return;

  if (type === 'gold') {
    // Gold and stadium green celebratory blast
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ffd700', '#facc15', '#22c55e', '#ffffff', '#eab308']
    });
  } else if (type === 'fireworks') {
    const duration = 2.5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.4), y: Math.random() - 0.2 },
        colors: ['#22c55e', '#00f0ff', '#facc15', '#ff007f']
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.6, 0.9), y: Math.random() - 0.2 },
        colors: ['#22c55e', '#00f0ff', '#facc15', '#ff007f']
      });
    }, 250);
  } else {
    // Standard burst
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#22c55e', '#00f0ff', '#eab308', '#ffffff']
    });
  }
};
