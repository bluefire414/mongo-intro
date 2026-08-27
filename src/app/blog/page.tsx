import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "芒果知識 | 枋山芒果園",
  description: "關於芒果的挑選、營養與料理食譜，果農帶你認識更多芒果的大小事。",
};

export default function BlogPage() {
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
            Journal
          </span>
          <h1 className="mt-6 font-serif text-4xl leading-[1.2] tracking-tight sm:text-5xl">
            芒果知識
          </h1>
          <p className="mt-6 max-w-md text-sm leading-7 text-[#f5f1e6]/70">
            從挑選、營養到料理，果農整理了關於芒果的實用知識，讓你更懂得品嚐每一口甜。
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[#16302a]/10 bg-white transition hover:shadow-lg hover:shadow-[#16302a]/10"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.15em] text-[#16302a]/40">
                  <time dateTime={post.date}>{post.date}</time>
                  <span aria-hidden>·</span>
                  <span>{post.readTime}閱讀</span>
                </div>
                <h2 className="font-serif text-lg leading-snug text-[#16302a]">
                  {post.title}
                </h2>
                <p className="flex-1 text-sm leading-6 text-[#16302a]/60">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#c65a2e] transition-all group-hover:gap-3">
                  閱讀全文 <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
