"use client";

import { useEffect, useState } from "react";

const WIN_RATE = 0.1;
const COUPON_CODE = "MANGO10";

type Result = "won" | "lost";
type Status = "idle" | "rolling" | Result;

export default function LotteryButton() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const draw = () => {
    setStatus("rolling");
    setCopied(false);
    window.setTimeout(() => {
      setStatus(Math.random() < WIN_RATE ? "won" : "lost");
    }, 1200);
  };

  const copyCoupon = async () => {
    try {
      await navigator.clipboard.writeText(COUPON_CODE);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable, user can still read/copy the code manually
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-[#e2793f] px-5 py-3 text-sm font-semibold text-[#122a22] shadow-lg shadow-black/20 transition hover:bg-[#f0904f] hover:shadow-xl"
      >
        <span aria-hidden>🎁</span> 幸運抽獎
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-6"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="lottery-title"
            className="relative w-full max-w-sm rounded-2xl bg-[#f5f1e6] p-8 text-center shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="關閉"
              className="absolute right-4 top-4 text-lg text-[#16302a]/40 transition hover:text-[#16302a]"
            >
              ✕
            </button>

            <span className="inline-block rounded-full border border-[#c65a2e]/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c65a2e]">
              Lucky Draw
            </span>
            <h2
              id="lottery-title"
              className="mt-4 font-serif text-2xl text-[#16302a]"
            >
              幸運大抽獎
            </h2>

            {status === "idle" && (
              <>
                <p className="mt-3 text-sm leading-6 text-[#16302a]/60">
                  可無限次抽獎，每次都有 10% 機會抽中芒果商品 9 折優惠券！
                </p>
                <div className="mt-8 text-6xl">🥭</div>
                <button
                  type="button"
                  onClick={draw}
                  className="mt-8 w-full rounded-full bg-[#e2793f] px-6 py-3 text-sm font-semibold text-[#122a22] transition hover:bg-[#f0904f]"
                >
                  立即抽獎
                </button>
              </>
            )}

            {status === "rolling" && (
              <>
                <p className="mt-3 text-sm leading-6 text-[#16302a]/60">
                  抽獎中，公布你的幸運結果……
                </p>
                <div className="mt-8 animate-spin text-6xl">🥭</div>
                <button
                  type="button"
                  disabled
                  className="mt-8 w-full rounded-full bg-[#e2793f]/50 px-6 py-3 text-sm font-semibold text-[#122a22]/60"
                >
                  抽獎中…
                </button>
              </>
            )}

            {status === "won" && (
              <>
                <p className="mt-3 text-sm leading-6 text-[#16302a]/60">
                  🎉 恭喜中獎！你抽中了芒果商品 9 折優惠券
                </p>
                <div className="mt-8 text-6xl">🎊</div>
                <div className="mt-8 flex items-center justify-between rounded-xl border border-dashed border-[#c65a2e]/40 bg-white px-4 py-3">
                  <span className="font-serif text-lg tracking-widest text-[#c65a2e]">
                    {COUPON_CODE}
                  </span>
                  <button
                    type="button"
                    onClick={copyCoupon}
                    className="rounded-full border border-[#16302a]/15 px-3 py-1.5 text-xs font-semibold text-[#16302a] transition hover:border-[#e2793f] hover:text-[#c65a2e]"
                  >
                    {copied ? "已複製" : "複製折扣碼"}
                  </button>
                </div>
                <p className="mt-3 text-xs text-[#16302a]/40">
                  結帳時輸入折扣碼即可享 9 折優惠
                </p>
                <button
                  type="button"
                  onClick={draw}
                  className="mt-6 w-full rounded-full border border-[#16302a]/15 px-6 py-3 text-sm font-semibold text-[#16302a] transition hover:border-[#e2793f] hover:text-[#c65a2e]"
                >
                  再抽一次
                </button>
              </>
            )}

            {status === "lost" && (
              <>
                <p className="mt-3 text-sm leading-6 text-[#16302a]/60">
                  😢 銘謝惠顧，這次沒有抽中優惠券
                </p>
                <div className="mt-8 text-6xl">🥭</div>
                <button
                  type="button"
                  onClick={draw}
                  className="mt-8 w-full rounded-full bg-[#e2793f] px-6 py-3 text-sm font-semibold text-[#122a22] transition hover:bg-[#f0904f]"
                >
                  再抽一次
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
