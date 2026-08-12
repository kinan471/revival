import Link from "next/link";
import ProductCard from "../components/ProductCard";
import { getDB } from "../lib/db";
import { daysAgo } from "../lib/utils";

export default function Home() {
  const { products, brands, settings, reviews } = getDB();
  const avg = (reviews.reduce((a, r) => a + r.stars, 0) / (reviews.length || 1)).toFixed(1);
  const fresh = [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3);

  const wants = [
    { i: "🛠", t: "Cihazımı Onar", d: "Arızanı bildir, ücretsiz ön değerlendirme al.", href: "/talep?type=Tamir" },
    { i: "🫧", t: "Derin Temizlik", d: "Kireç çözme ve hijyenik bakım.", href: "/talep?type=Temizlik" },
    { i: "♻️", t: "Yenilenmiş Cihaz Al", d: "Test edilmiş, garantili cihazlar.", href: "/magaza" },
    { i: "💰", t: "Cihazını Bize Sat", d: "Kullanmadığın cihazı nakite çevir.", href: "/talep?type=Satis" },
  ];

  const steps = [
    ["📝", "Bize Yazın", "Form veya WhatsApp ile ulaşın."],
    ["📦", "Teslim Edin", "Elden veya kargoyla gönderin."],
    ["🔍", "Tespit + Teklif", "Sorunu belirleyip net fiyat verelim."],
    ["🛠", "Tamir + Temizlik", "Uygun parça ve derin bakım."],
    ["✅", "Kontrol + Teslim", "Test edilmeden çıkmaz, 3 ay garanti."],
  ];

  const why = [
    ["🛡", "Net Garanti", "Hizmet ve ürünlerde 3 ay garanti."],
    ["🔧", "Test Edilmeden Çıkmaz", "Her cihaz çoklu kontrolden geçer."],
    ["🧼", "Gerçek Derin Temizlik", "Sadece tamir değil, hijyen de."],
    ["♻️", "İkinci Hayat", "Atık yerine yenileme."],
    ["💬", "Doğrudan İletişim", "WhatsApp ile anında dönüş."],
  ];

  const trust = ["🛡 3 Ay Garanti", "🔧 Test Edilmiş", "🧼 Derin Temizlik", "📦 Kargo İmkânı", "💬 WhatsApp Desteği"];

  return (
    <main>
      {/* HERO: رسالة قوية + مساران */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-light via-white to-orange-50">
        <div className="wrap py-12 md:py-20 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="animate-fadeUp text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-dark leading-tight">
              Cihazın bozuldu mu?<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange to-accent-dark">Atma. Hayata döndürüyoruz.</span>
            </h1>
            <p className="mt-4 text-sm sm:text-lg text-slate-600">
              Tamir • Temizlik • Yenileme • Garantili yenilenmiş cihazlar
              <br />🛡 3 ay garanti • ⚡ hızlı WhatsApp hizmeti
            </p>
            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/talep" className="btn btn-orange w-full sm:w-auto">🛠 Cihazımı Onarın</Link>
              <Link href="/magaza" className="btn btn-teal w-full sm:w-auto">♻️ Yenilenmiş Cihazlar</Link>
            </div>
          </div>
          <div className="relative flex justify-center animate-fadeUp">
            <div className="absolute h-52 w-52 sm:h-72 sm:w-72 rounded-full bg-gradient-to-tr from-brand-teal/20 to-accent-orange/20 blur-2xl" />
            <img src="/logo.png" alt="revival" className="relative h-48 sm:h-64 md:h-80 object-contain animate-float" />
          </div>
        </div>
        {/* شريط الثقة */}
        <div className="border-t border-slate-100 bg-white/70 backdrop-blur">
          <div className="wrap py-3 flex gap-4 sm:gap-8 overflow-x-auto no-scrollbar justify-start sm:justify-center text-[11px] sm:text-xs font-extrabold text-slate-500">
            {trust.map((t) => <span key={t} className="shrink-0">{t}</span>)}
          </div>
        </div>
      </section>

      {/* ماذا تريد اليوم؟ 4 مسارات */}
      <section className="wrap pt-10 md:pt-16">
        <h2 className="section-title">Bugün ne istiyorsun?</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {wants.map((w) => (
            <Link key={w.t} href={w.href} className="card p-6 text-center group active:scale-[.98]">
              <div className="mx-auto h-14 w-14 rounded-2xl bg-gradient-to-br from-brand-teal to-brand-dark text-white text-2xl flex items-center justify-center group-hover:scale-110 transition">{w.i}</div>
              <h3 className="mt-3 font-extrabold text-brand-dark text-sm sm:text-base">{w.t}</h3>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-500">{w.d}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* كيف نعمل – 5 خطوات */}
      <section className="wrap pt-14 md:pt-20">
        <h2 className="section-title">Nasıl Çalışıyoruz?</h2>
        <div className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map(([i, t, d], idx) => (
            <div key={t} className="card p-5 text-center relative">
              <span className="absolute top-3 right-3 text-3xl font-extrabold text-brand-light">{idx + 1}</span>
              <div className="text-3xl">{i}</div>
              <h3 className="mt-2 font-extrabold text-brand-teal text-sm">{t}</h3>
              <p className="mt-1.5 text-xs text-slate-500">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* وصل حديثاً */}
      <section className="wrap pt-14 md:pt-20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h2 className="section-title !text-left sm:text-2xl md:text-3xl">🔥 Yeni Gelenler</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">Son yenilenen ve mağazaya eklenen cihazlar.</p>
          </div>
          <Link href="/magaza" className="btn btn-teal !px-5 !py-2.5 text-sm w-full sm:w-auto">Tümünü Gör →</Link>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {fresh.map((p) => (
            <ProductCard key={p.id} p={p} wa={settings.whatsapp} brand={brands.find((b) => b.id === p.brandId)?.name} />
          ))}
        </div>
      </section>

      {/* لماذا REVIVAL */}
      <section className="wrap pt-14 md:pt-20">
        <h2 className="section-title">Neden REVIVAL?</h2>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4">
          {why.map(([i, t, d]) => (
            <div key={t} className="rounded-3xl bg-white border border-slate-100 p-5 text-center shadow-sm">
              <div className="text-3xl">{i}</div>
              <h3 className="mt-2 font-extrabold text-brand-dark text-xs sm:text-sm">{t}</h3>
              <p className="mt-1 text-[11px] sm:text-xs text-slate-500">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* التقييمات */}
      <section className="wrap pt-14 md:pt-20">
        <div className="card p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <div className="text-center sm:text-left shrink-0">
              <div className="text-5xl font-extrabold text-brand-dark">{avg}<span className="text-lg text-slate-400">/5</span></div>
              <div className="text-accent-orange text-lg mt-1">{"★".repeat(Math.round(avg))}{"☆".repeat(5 - Math.round(avg))}</div>
              <div className="text-xs font-bold text-slate-400 mt-1">{reviews.length} müşteri yorumu</div>
            </div>
            <div className="grid sm:grid-cols-3 gap-4 flex-1 w-full">
              {reviews.map((r, i) => (
                <div key={i} className="rounded-2xl bg-brand-light/60 p-4">
                  <div className="text-accent-orange text-sm">{"★".repeat(r.stars)}{"☆".repeat(5 - r.stars)}</div>
                  <p className="mt-1.5 text-xs text-slate-600">"{r.text}"</p>
                  <div className="mt-2 text-xs font-extrabold text-brand-teal">{r.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="wrap pt-14 md:pt-20">
        <div className="rounded-3xl bg-gradient-to-r from-brand-teal to-brand-dark p-7 sm:p-10 md:p-14 text-center text-white relative overflow-hidden">
          <div className="absolute -top-10 -right-10 h-32 w-32 sm:h-40 sm:w-40 rounded-full bg-accent-orange/30 blur-2xl" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">Cihazınız eskidi mi? Atmayın, canlandırın!</h2>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-white/80">Ücretsiz ön değerlendirme için formu doldurun.</p>
          <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/talep" className="btn btn-orange w-full sm:w-auto">📝 Talep Formu</Link>
            <Link href="/fiyat" className="btn btn-green w-full sm:w-auto">💰 Fiyat Listesi</Link>
          </div>
        </div>
      </section>
    </main>
  );
}