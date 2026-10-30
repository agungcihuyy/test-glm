import { useEffect, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#@$%&*";

/** Efek "scramble"/acak huruf menuju teks final — dipakai pada judul hero */
export function useScramble(text, { start = false, speed = 28, duration = 1100 } = {}) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!start) {
      setDisplay(text);
      return;
    }
    let frame = 0;
    const totalFrames = Math.floor(duration / speed);
    let raf;
    let last = 0;

    const tick = (t) => {
      if (t - last >= speed) {
        last = t;
        frame++;
        const progress = frame / totalFrames;
        const revealed = Math.floor(progress * text.length);
        setDisplay(
          text
            .split("")
            .map((ch, i) => {
              if (ch === " ") return " ";
              if (i < revealed) return ch;
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );
      }
      if (frame < totalFrames) raf = requestAnimationFrame(tick);
      else setDisplay(text);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, start, speed, duration]);

  return display;
}
