"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/#products", label: "本季商品" },
  { href: "/blog", label: "芒果知識" },
  { href: "/game", label: "小遊戲" },
  { href: "/#story", label: "產地故事" },
  { href: "/#about", label: "聯絡我們" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-20 bg-[#122a22] text-[#f5f1e6]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-10">
        <Link href="/" className="font-serif text-xl tracking-wide">
          枋山芒果園
        </Link>

        <nav className="hidden gap-8 text-xs font-medium uppercase tracking-[0.2em] text-[#f5f1e6]/70 sm:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-[#f5f1e6]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="開啟選單"
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 sm:hidden"
        >
          <span
            className={`h-px w-5 bg-[#f5f1e6] transition-transform ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-5 bg-[#f5f1e6] transition-transform ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-white/10 px-6 pb-6 pt-2 text-sm font-medium uppercase tracking-[0.2em] text-[#f5f1e6]/70 sm:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-3 transition hover:bg-white/5 hover:text-[#f5f1e6]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}

      <div className="h-px w-full bg-linear-to-r from-transparent via-[#f5f1e6]/15 to-transparent" />
    </header>
  );
}
