"use client";

import { useEffect, useRef, useState } from "react";

const GAME_DURATION = 30;
const SPAWN_INTERVAL_MS = 900;
const BEST_SCORE_KEY = "mango-catch-best-score";

type Status = "idle" | "playing" | "ended";

type FallingMango = {
  id: number;
  left: number;
  duration: number;
};

export default function MangoCatchGame() {
  const [status, setStatus] = useState<Status>("idle");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [mangoes, setMangoes] = useState<FallingMango[]>([]);
  const [bestScore, setBestScore] = useState<number | null>(null);

  const idRef = useRef(0);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(BEST_SCORE_KEY);
      if (raw) setBestScore(Number(raw));
    } catch {
      // ignore read failures (e.g. private browsing)
    }
  }, []);

  useEffect(() => {
    if (status !== "playing") return;

    const spawnId = window.setInterval(() => {
      idRef.current += 1;
      setMangoes((prev) => [
        ...prev,
        {
          id: idRef.current,
          left: 8 + Math.random() * 80,
          duration: 2.2 + Math.random() * 1.8,
        },
      ]);
    }, SPAWN_INTERVAL_MS);

    const timerId = window.setInterval(() => {
      setTimeLeft((t) => Math.max(0, t - 1));
    }, 1000);

    return () => {
      window.clearInterval(spawnId);
      window.clearInterval(timerId);
    };
  }, [status]);

  useEffect(() => {
    if (status !== "playing" || timeLeft > 0) return;

    setStatus("ended");
    setMangoes([]);
    setBestScore((prev) => {
      const newBest = prev === null ? score : Math.max(prev, score);
      try {
        window.localStorage.setItem(BEST_SCORE_KEY, String(newBest));
      } catch {
        // ignore write failures (e.g. private browsing)
      }
      return newBest;
    });
  }, [timeLeft, status, score]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setMangoes([]);
    setStatus("playing");
  };

  const catchMango = (id: number) => {
    setMangoes((prev) => prev.filter((m) => m.id !== id));
    setScore((s) => s + 1);
  };

  const missMango = (id: number) => {
    setMangoes((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      {status === "playing" && (
        <div className="mb-4 flex items-center justify-between text-sm font-semibold text-[#16302a]">
          <span>分數：{score}</span>
          <span>剩餘時間：{timeLeft}s</span>
        </div>
      )}

      <div className="relative h-[420px] w-full overflow-hidden rounded-2xl border border-[#16302a]/15 bg-linear-to-b from-[#dcebe0] to-[#fdf3e2] shadow-inner shadow-black/5 sm:h-[480px]">
        {status === "idle" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-8 text-center">
            <div className="text-6xl">🥭</div>
            <h2 className="font-serif text-2xl text-[#16302a]">接芒果小遊戲</h2>
            <p className="max-w-xs text-sm leading-6 text-[#16302a]/60">
              芒果會從上方掉落，時間內點擊越多顆芒果，分數越高！挑戰看看你能接到幾顆。
            </p>
            {bestScore !== null && (
              <p className="text-xs uppercase tracking-[0.2em] text-[#c65a2e]">
                最高紀錄：{bestScore} 顆
              </p>
            )}
            <button
              type="button"
              onClick={startGame}
              className="mt-2 rounded-full bg-[#e2793f] px-8 py-3 text-sm font-semibold text-[#122a22] transition hover:bg-[#f0904f]"
            >
              開始遊戲
            </button>
          </div>
        )}

        {status === "playing" &&
          mangoes.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => catchMango(m.id)}
              onAnimationEnd={() => missMango(m.id)}
              aria-label="接住芒果"
              className="animate-mango-fall absolute -translate-x-1/2 cursor-pointer select-none text-4xl leading-none sm:text-5xl"
              style={{ left: `${m.left}%`, animationDuration: `${m.duration}s` }}
            >
              🥭
            </button>
          ))}

        {status === "ended" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#f5f1e6]/95 px-8 text-center">
            <h2 className="font-serif text-2xl text-[#16302a]">遊戲結束！</h2>
            <p className="text-lg text-[#c65a2e]">本次分數：{score} 顆</p>
            {bestScore !== null && (
              <p className="text-xs uppercase tracking-[0.2em] text-[#16302a]/50">
                最高紀錄：{bestScore} 顆
                {score === bestScore && score > 0 ? "（新紀錄！）" : ""}
              </p>
            )}
            <button
              type="button"
              onClick={startGame}
              className="mt-2 rounded-full bg-[#e2793f] px-8 py-3 text-sm font-semibold text-[#122a22] transition hover:bg-[#f0904f]"
            >
              再玩一次
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
