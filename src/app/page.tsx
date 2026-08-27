import Image from "next/image";

type Product = {
  name: string;
  tagline: string;
  price: string;
  unit: string;
  image: string;
  badge?: string;
};

const products: Product[] = [
  {
    name: "愛文芒果禮盒",
    tagline: "3公斤裝，甜度16度以上，送禮首選",
    price: "NT$680",
    unit: "/ 盒",
    image: "/images/mango-1.jpg",
    badge: "熱銷第一",
  },
  {
    name: "冰鎮芒果切盒",
    tagline: "農場現切分裝，開箱即食，消暑必備",
    price: "NT$150",
    unit: "/ 盒",
    image: "/images/mango-3.jpg",
  },
  {
    name: "特選單顆芒果",
    tagline: "農場直採，顆顆飽滿多汁，隨到隨吃",
    price: "NT$90",
    unit: "/ 顆",
    image: "/images/mango-2.jpg",
  },
  {
    name: "芒果箱裝任選",
    tagline: "10台斤裝，全家共享的夏日限定滋味",
    price: "NT$1,280",
    unit: "/ 箱",
    image: "/images/mango-5.jpg",
    badge: "季節限定",
  },
];

const highlights = [
  { title: "產地直送", desc: "屏東枋山果園採收後 24 小時內出貨" },
  { title: "在欉紅", desc: "果實在樹上自然熟成，甜度更飽滿" },
  { title: "友善栽培", desc: "無施用除草劑，安心吃得到原味" },
  { title: "壞損保障", desc: "到貨如有損傷，7 日內全額退換" },
];

export default function Home() {
  return (
    <>
      {/* hero */}
      <section className="relative overflow-hidden bg-[#122a22] text-[#f5f1e6]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 82% 15%, rgba(217,98,43,0.25), transparent 55%)",
          }}
        />
        <div className="relative z-10 mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-28">
          <div>
            <span className="inline-block rounded-full border border-[#f5f1e6]/25 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#e2793f]">
              Pingtung Mango Farm
            </span>
            <h1 className="mt-6 font-serif text-4xl leading-[1.2] tracking-tight sm:text-6xl">
              在欉紅愛文芒果
              <br />
              產地直送到你家
            </h1>
            <p className="mt-6 max-w-md text-sm leading-7 text-[#f5f1e6]/70">
              來自屏東枋山的第二代果農，果實在樹上自然熟成才採收，鎖住最濃郁的香氣與甜度，24
              小時內冷藏出貨，把夏天的第一口甜直接送到你手上。
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <a
                href="#products"
                className="inline-flex items-center gap-2 rounded-full bg-[#e2793f] px-6 py-3 text-sm font-semibold text-[#122a22] transition hover:bg-[#f0904f]"
              >
                立即選購 <span aria-hidden>→</span>
              </a>
              <a
                href="#story"
                className="inline-flex items-center gap-2 border-b border-[#e2793f] pb-1 text-sm font-semibold text-[#e2793f] transition-all hover:gap-3"
              >
                認識我們的果園
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-white/15 shadow-2xl shadow-black/30">
              <Image
                src="/images/mango-4.jpg"
                alt="新鮮愛文芒果"
                width={800}
                height={800}
                priority
                className="aspect-square w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 rounded-2xl border border-white/15 bg-[#122a22]/90 p-5 backdrop-blur-2xl shadow-xl shadow-black/30 sm:-bottom-8 sm:-left-8">
              <p className="font-serif text-3xl text-[#e2793f]">16°</p>
              <p className="text-[10px] uppercase tracking-widest text-[#f5f1e6]/60">
                平均甜度 Brix
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* highlights */}
      <section className="border-b border-[#16302a]/10 bg-[#f5f1e6]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-12 sm:px-10 md:grid-cols-4">
          {highlights.map((item) => (
            <div key={item.title}>
              <h3 className="font-serif text-lg text-[#16302a]">{item.title}</h3>
              <p className="mt-1 text-xs leading-6 text-[#16302a]/60">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* products */}
      <section id="products" className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
        <div className="mb-10 flex items-end justify-between border-b border-[#16302a]/10 pb-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c65a2e]">
              Shop
            </span>
            <h2 className="mt-2 font-serif text-3xl text-[#16302a]">
              本季熱賣商品
            </h2>
          </div>
          <span className="hidden font-serif text-sm text-[#16302a]/30 sm:block">
            01 — 04
          </span>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.name}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[#16302a]/10 bg-white transition hover:shadow-lg hover:shadow-[#16302a]/10"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                {product.badge && (
                  <span className="absolute left-3 top-3 rounded-full bg-[#e2793f] px-3 py-1 text-[10px] font-semibold text-[#122a22]">
                    {product.badge}
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <h3 className="font-serif text-lg text-[#16302a]">{product.name}</h3>
                <p className="flex-1 text-xs leading-6 text-[#16302a]/60">
                  {product.tagline}
                </p>
                <div className="mt-2 flex items-end justify-between">
                  <p className="font-serif text-xl text-[#c65a2e]">
                    {product.price}
                    <span className="ml-1 text-xs font-sans text-[#16302a]/40">
                      {product.unit}
                    </span>
                  </p>
                  <button className="rounded-full border border-[#16302a]/15 px-4 py-2 text-xs font-semibold text-[#16302a] transition hover:border-[#e2793f] hover:text-[#c65a2e]">
                    加入購物車
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* story */}
      <section id="story" className="relative overflow-hidden bg-[#122a22] text-[#f5f1e6]">
        <div className="mx-auto grid max-w-6xl gap-0 sm:px-10 lg:grid-cols-2 lg:items-stretch">
          <div className="relative min-h-[320px] lg:min-h-full">
            <Image
              src="/images/mango-5.jpg"
              alt="剛採收的新鮮芒果"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center px-6 py-16 sm:px-0 sm:pl-10 lg:py-20">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#e2793f]">
              Our Story
            </span>
            <h2 className="mt-4 font-serif text-3xl leading-snug">
              一顆芒果，
              <br />
              三代人的堅持
            </h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-[#f5f1e6]/70">
              從阿公種下第一棵芒果樹開始，我們家在屏東枋山的山坡地已經照顧愛文芒果超過
              30
              年。堅持不催熟、不打蠟，讓每一顆果實留在樹上曬足陽光，才捨得摘下，只為了讓你吃到最真實的產地滋味。
            </p>
            <div className="mt-8 grid grid-cols-3 gap-6 border-t border-white/10 pt-6">
              <div>
                <p className="font-serif text-2xl text-[#e2793f]">30+</p>
                <p className="text-[10px] uppercase tracking-widest text-[#f5f1e6]/50">
                  年種植經驗
                </p>
              </div>
              <div>
                <p className="font-serif text-2xl text-[#e2793f]">100%</p>
                <p className="text-[10px] uppercase tracking-widest text-[#f5f1e6]/50">
                  在欉熟成
                </p>
              </div>
              <div>
                <p className="font-serif text-2xl text-[#e2793f]">24hr</p>
                <p className="text-[10px] uppercase tracking-widest text-[#f5f1e6]/50">
                  產地直送
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
