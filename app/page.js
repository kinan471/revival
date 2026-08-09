import Link from "next/link";
import ProductCard from "../components/ProductCard";
import { getDB } from "../lib/db";

export default function Home() {
  const { products, brands, settings } = getDB();

  const services = [
    { icon: "🛠", t: "Tamir", d: "Kahve makinesi, süpürge, ütü, mikser, kettle... Profesyonel onarım.", href: "/talep?type=Tamir", cta: "Talep Oluştur" },
    { icon: "🫧", t: "Temizlik", d: "Derinlemesine temizlik ve kireç çözme. Cihazın fabrikadan çıkmış gibi.", href: "/talep?type=Temizlik", cta: "Talep Oluştur" },
    { icon: "🏷", t: "Alışveriş", d: "sıfır,Yenilenmiş, garantili küçük ev aletleri ve yedek parça.", href: "/magaza", cta: "Mağazayı Gez" },
  ];

  const steps = [
    ["📝", "Bize Yazın", "Formu doldurun, talebiniz anında WhatsApp'ımıza düşsün."],
    ["📦", "Cihazı Teslim Edin", "Elden veya kargoyla bize ulaştırın."],
    ["🛠", "Tamir + Temizlik", "Uzman ekip ve orijinal yedek parçayla bakım."],
    ["✨", "Yeniden Canlanma", "Cihazınız 3 ay garantili, ilk günkü gibi teslim."],
  ];

  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-light via-white to-orange-50">
        <div className="wrap py-12 md:py-20 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="animate-fadeUp text-center lg:text-left">
            <span className="inline-block rounded-full bg-white shadow px-4 py-1.5 text-[11px] sm:text-xs font-extrabold text-brand-teal">🛡 3 Ay Garanti • ⚡ Hızlı Teslim</span>
            <h1 className="mt-4 md:mt-5 text-3xl sm:text-4xl md:text-6xl font-extrabold text-brand-dark leading-tight">
              Tamir, Temizlik ve{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange to-accent-dark">Yeniden Canlanma</span>
            </h1>
            <p className="mt-3 md:mt-4 text-base sm:text-lg text-slate-600">Küçük ev aletleriniz yeniden hayat buluyor.</p>
            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/talep" className="btn btn-orange w-full sm:w-auto">Hemen Teklif Alın</Link>
              <Link href="/magaza" className="btn btn-teal w-full sm:w-auto">Mağazayı Keşfet</Link>
            </div>
          </div>
          <div className="relative flex justify-center animate-fadeUp">
            <div className="absolute h-52 w-52 sm:h-72 sm:w-72 rounded-full bg-gradient-to-tr from-brand-teal/20 to-accent-orange/20 blur-2xl" />
            <img src="/logo.png" alt="revival" className="relative h-48 sm:h-64 md:h-80 object-contain animate-float" />
          </div>
        </div>
      </section>

      {/* كروت الخدمات */}
      <section className="wrap relative z-10 mt-8 md:mt-0 md:-mt-8 grid md:grid-cols-3 gap-4 sm:gap-6">
        {services.map((s) => (
          <Link key={s.t} href={s.href} className="card p-6 sm:p-7 group active:scale-[.98]">
            <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-gradient-to-br from-brand-teal to-brand-dark text-white text-xl sm:text-2xl flex items-center justify-center group-hover:scale-110 transition">
              {s.icon}
            </div>
            <h3 className="mt-3 sm:mt-4 text-lg sm:text-xl font-extrabold text-brand-dark">{s.t}</h3>
            <p className="mt-1.5 sm:mt-2 text-sm text-slate-500">{s.d}</p>
            <span className="mt-3 sm:mt-4 inline-block text-sm font-extrabold text-accent-orange">{s.cta} →</span>
          </Link>
        ))}
      </section>

      {/* كيف نعمل */}
      <section className="wrap pt-14 md:pt-20">
        <h2 className="section-title">Nasıl Çalışıyoruz?</h2>
        <div className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {steps.map(([i, t, d], idx) => (
            <div key={t} className="card p-5 sm:p-6 text-center relative">
              <span className="absolute top-4 right-4 text-3xl sm:text-4xl font-extrabold text-brand-light">{idx + 1}</span>
              <div className="text-3xl sm:text-4xl">{i}</div>
              <h3 className="mt-2 sm:mt-3 font-extrabold text-brand-teal text-sm sm:text-base">{t}</h3>
              <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-slate-500">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* معرض المنتجات */}
      <section className="wrap pt-14 md:pt-20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <h2 className="section-title !text-left sm:text-2xl md:text-3xl">Öne Çıkan Ürünler</h2>
          <Link href="/magaza" className="btn btn-teal !px-5 !py-2.5 text-sm w-full sm:w-auto">Tümünü Gör →</Link>
        </div>
        <div className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {products.slice(0, 6).map((p) => (
            <ProductCard key={p.id} p={p} wa={settings.whatsapp} brand={brands.find((b) => b.id === p.brandId)?.name} />
          ))}
        </div>
      </section>

      {/* CTA أخير */}
      <section className="wrap pt-14 md:pt-20">
        <div className="rounded-3xl bg-gradient-to-r from-brand-teal to-brand-dark p-7 sm:p-10 md:p-14 text-center text-white relative overflow-hidden">
          <div className="absolute -top-10 -right-10 h-32 w-32 sm:h-40 sm:w-40 rounded-full bg-accent-orange/30 blur-2xl" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">Cihazınız eskidi mi? Atmayın, canlandırın!</h2>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-white/80">Formu doldurun, dakikalar içinde dönüş yapalım.</p>
          <Link href="/talep" className="btn btn-orange mt-5 sm:mt-6 w-full sm:w-auto">📝 Talep Formu</Link>
        </div>
      </section>
    </main>
  );
}