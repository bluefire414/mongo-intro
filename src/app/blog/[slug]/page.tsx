import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, posts } from "@/lib/posts";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "找不到文章 | 枋山芒果園" };
  }

  return {
    title: `${post.title} | 枋山芒果園`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

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
        <div className="relative z-10 mx-auto max-w-3xl px-6 py-20 sm:px-10 lg:py-24">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#e2793f] transition hover:gap-3"
          >
            <span aria-hidden>←</span> 返回芒果知識
          </Link>
          <h1 className="mt-6 font-serif text-3xl leading-[1.3] tracking-tight sm:text-4xl">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center gap-3 text-xs uppercase tracking-[0.15em] text-[#f5f1e6]/50">
            <time dateTime={post.date}>{post.date}</time>
            <span aria-hidden>·</span>
            <span>{post.readTime}閱讀</span>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-6 py-16 sm:px-10">
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="mt-10 space-y-6">
          {post.content.map((paragraph, i) => (
            <p key={i} className="text-sm leading-8 text-[#16302a]/75">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-[#16302a]/10 pt-8">
          <Link
            href="/blog"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-[#16302a]/50 transition hover:text-[#c65a2e]"
          >
            ← 返回芒果知識
          </Link>
          <Link
            href="/#products"
            className="inline-flex items-center gap-2 rounded-full bg-[#e2793f] px-6 py-3 text-sm font-semibold text-[#122a22] transition hover:bg-[#f0904f]"
          >
            選購當季芒果 <span aria-hidden>→</span>
          </Link>
        </div>
      </article>
    </>
  );
}
