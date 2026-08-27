"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "mango-visitor-name";

export default function WelcomeGate() {
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      // ignore read failures (e.g. private browsing)
    }

    if (stored) {
      setName(stored);
      setShowBanner(true);
    } else {
      setShowModal(true);
    }
    setMounted(true);
  }, []);

  const submitName = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    try {
      window.localStorage.setItem(STORAGE_KEY, trimmed);
    } catch {
      // ignore write failures (e.g. private browsing)
    }
    setName(trimmed);
    setShowModal(false);
    setShowBanner(true);
  };

  if (!mounted) return null;

  return (
    <>
      {showBanner && name && (
        <div className="relative z-30 flex items-center justify-center gap-3 bg-[#e2793f] px-6 py-2.5 text-center text-sm font-medium text-[#122a22]">
          <span>
            👋 嗨，{name}！歡迎來到枋山芒果園，今天想帶點芒果回家嗎？
          </span>
          <button
            type="button"
            onClick={() => setShowBanner(false)}
            aria-label="關閉歡迎訊息"
            className="text-[#122a22]/60 transition hover:text-[#122a22]"
          >
            ✕
          </button>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 px-6">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="welcome-title"
            className="w-full max-w-sm rounded-2xl bg-[#f5f1e6] p-8 text-center shadow-2xl"
          >
            <div className="text-5xl">🥭</div>
            <h2
              id="welcome-title"
              className="mt-4 font-serif text-2xl text-[#16302a]"
            >
              歡迎光臨枋山芒果園
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#16302a]/60">
              想怎麼稱呼你呢？讓我們為你獻上專屬的歡迎。
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitName();
              }}
              className="mt-6 flex flex-col gap-3"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="輸入你的稱呼"
                autoFocus
                maxLength={20}
                className="w-full rounded-full border border-[#16302a]/15 bg-white px-5 py-3 text-center text-sm text-[#16302a] outline-none transition focus:border-[#e2793f]"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="w-full rounded-full bg-[#e2793f] px-6 py-3 text-sm font-semibold text-[#122a22] transition hover:bg-[#f0904f] disabled:cursor-not-allowed disabled:opacity-50"
              >
                進入網站
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
