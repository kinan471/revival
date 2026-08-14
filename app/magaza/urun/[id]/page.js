import Link from "next/link";
import { getDB } from "../../../../lib/db";
import { score100 } from "../../../../lib/utils";

export default function UrunPage({ params }) {
  const { products, brands, categories, settings } = getDB();
  const p = products.find((x) => x.id === +params.id);
  if (!p)
    return <main className="wrap py-24 text-center">Ürün bulunamadı. <Link className="font-bold text-brand-teal" href="/magaza">← Mağaza</Link></main>;

  const brand = brands.find((b) => b.id === p.brandId);
  const cat = categories.find((c) => c.id === p.categoryId);
  const s100 = score100(p);
  const buy = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(`Merhaba! "${p.name}" ürününü satın almak istiyorum.`)}`;
  const ask = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(`Merhaba! "${p.name}" ürünü hakkında sorum var.`)}`;
  const scoreRows = [
    ["Performans", p.score?.performans],
    ["Temizlik", p.score?.temizlik],
    ["Görünüm", p.score?.gorunum],
    ["Fonksiyon", p.score?.fonksiyon],
  ].filter(([, v]) => v != null);
  const checks = ["Arıza tespiti", "Gerekli onarım", "Derin temizlik + kireç çözme", "Fonksiyon testi", "Güvenlik kontrolü"];

  return (
    <main className="wrap py-10 max-w-5xl mx-auto">
      <div className="text-xs font-bold text-slate-400">
        <Link href="/magaza" className="text-brand-teal">Mağaza</Link> / {brand?.name} / {p.name}
      </div>

      <div className="mt-4 grid lg:grid-cols-2 gap-8">
        <div className="card p-4 sm:p-6 bg-brand-light flex items-center justify-center min-h-72">
          {p.img ? <img src={p.img} alt={p.name} className="rounded-2xl max-h-96 object-contain" /> : <div className="text-8xl">🔌</div>}
        </div>

        <div>
          <div className="text-xs font-bold text-slate-400 uppercase">{brand?.name} • {cat?.name}</div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-brand-dark">{p.name}</h1>
          <div className="mt-2 flex flex-wrap gap-2 text-[11px] font-extrabold">
            {p.condition && <span className="rounded-full bg-brand-light text-brand-teal px-3 py-1">⭐ Durum: {p.condition}/10</span>}
            {s100 && <span className="rounded-full bg-orange-50 text-accent-orange px-3 py-1">♻️ REVIVAL SCORE: {s100}/100</span>}
            <span className="rounded-full bg-green-50 text-green-600 px-3 py-1">🟢 Stokta var</span>
          </div>
          <p className="mt-3 text-sm text-slate-600">{p.desc}</p>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-accent-orange">{p.price} ₺</span>
            {p.oldPrice && <span className="text-lg text-slate-400 line-through">{p.oldPrice} ₺</span>}
          </div>

          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <a href={buy} target="_blank" className="btn btn-orange flex-1">🛒 Satın Al</a>
            <a href={ask} target="_blank" className="btn btn-green flex-1">💬 WhatsApp'ta Sor</a>
          </div>

          {p.note && (
            <div className="mt-4 rounded-2xl bg-orange-50 border border-orange-100 p-4 text-xs text-slate-600">
              🔍 <b>Şeffaflık:</b> {p.note}
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-3 text-[11px] font-extrabold text-slate-500">
            <span>🛡 3 Ay Garanti</span><span>📦 Kargo imkânı</span><span>💬 WhatsApp desteği</span>
          </div>
        </div>
      </div>

      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="font-extrabold text-brand-dark">♻️ REVIVAL SCORE</h2>
          <div className="mt-2 text-4xl font-extrabold text-accent-orange">{s100}<span className="text-base text-slate-400">/100</span></div>
          <div className="mt-4 space-y-3">
            {scoreRows.map(([label, v]) => (
              <div key={label}>
                <div className="flex justify-between text-xs font-extrabold text-slate-500"><span>{label}</span><span>{v}/10</span></div>
                <div className="mt-1 h-2 rounded-full bg-slate-100">
                  <div className="h-2 rounded-full bg-gradient-to-r from-brand-teal to-accent-orange" style={{ width: `${v * 10}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h2 className="font-extrabold text-brand-dark">Bu cihazda neler yapıldı?</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {checks.map((c) => <li key={c} className="flex items-center gap-2"><span className="text-green-600 font-bold">✅</span> {c}</li>)}
            <li className="flex items-center gap-2"><span className="font-bold">🛡</span> 3 ay garanti ile teslim</li>
          </ul>
          <div className="mt-5 rounded-2xl bg-brand-light p-4 text-xs text-slate-600">
            <b className="text-brand-teal">Neden daha ucuz?</b> Bu cihaz daha önce kullanıldı, REVIVAL ekibi tarafından yenilendi ve test edildi. Bu sayede sıfır ürün fiyatının çok altında, garantili olarak sunuluyor.
          </div>
        </div>
      </div>
    </main>
  );
}