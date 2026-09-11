// Synthesized Gamelan (Slendro & Pelog) Chime using Web Audio API
// No external assets required. Uses tuned sine/triangle harmonics with exponential decay.

class GamelanAudioEngine {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;

  private initContext() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  }

  // Play a resonant bronze gong or bonang bell sound
  public playChime(type: "bonang" | "gender" | "gong" | "ting" = "bonang") {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      // Frequencies inspired by Javanese Slendro scale: Barang, Gulu, Dada, Lima, Nem
      // [432Hz, 488Hz, 560Hz, 648Hz, 720Hz]
      let fundamental = 560; // Gamelan Dada
      let duration = 1.2;
      let gainVal = 0.18;

      if (type === "ting") {
        fundamental = 720;
        duration = 0.6;
        gainVal = 0.12;
      } else if (type === "gender") {
        fundamental = 488;
        duration = 1.5;
        gainVal = 0.15;
      } else if (type === "gong") {
        fundamental = 144; // Deep resonant gong
        duration = 2.5;
        gainVal = 0.25;
      }

      // Main tone
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator(); // Metallic overtone
      const gainNode = this.ctx.createGain();

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(fundamental, now);

      // Bronze overtone (slightly inharmonic typical of forged bronze)
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(fundamental * 2.76, now);

      // Gain Envelope: Fast attack, natural bronze decay
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(gainVal, now + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + duration);
      osc2.stop(now + duration);
    } catch (e) {
      // Audio might be blocked by user browser policy
      console.debug("Audio play blocked or unavailable", e);
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (!this.isMuted) {
      this.playChime("bonang");
    }
    return this.isMuted;
  }
}

export const gamelanAudio = new GamelanAudioEngine();
