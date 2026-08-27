import type { Metadata } from "next";
import MangoCatchGame from "@/components/MangoCatchGame";

export const metadata: Metadata = {
  title: "接芒果小遊戲 | 枋山芒果園",
  description: "純娛樂小遊戲，時間內點擊掉落的芒果來得分，挑戰你的最高紀錄。",
};

export default function GamePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#122a22] text-[#f5f1e6]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 82% 15%, rgba(217,98,43,0.25), transparent 55%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 sm:px-10 lg:py-24">
          <span className="inline-block rounded-full border border-[#f5f1e6]/25 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#e2793f]">
            Just for Fun
          </span>
          <h1 className="mt-6 font-serif text-4xl leading-[1.2] tracking-tight sm:text-5xl">
            接芒果小遊戲
          </h1>
          <p className="mt-6 max-w-md text-sm leading-7 text-[#f5f1e6]/70">
            休息一下，玩個小遊戲！30 秒內盡量點擊掉落的芒果，純娛樂計分，看看你能拿下多高的分數。
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-10">
        <MangoCatchGame />
      </section>
    </>
  );
}
