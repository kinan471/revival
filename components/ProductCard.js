import Link from "next/link";
import { daysAgo, score100 } from "../lib/utils";

export default function ProductCard({ p, brand, wa }) {
  const ask = `https://wa.me/${wa}?text=${encodeURIComponent(`Merhaba! "${p.name}" ürünü hakkında sorum var.`)}`;
  const fresh = p.createdAt && daysAgo(p.createdAt) <= 3;
  const disc = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
  const s = score100(p);

  return (
    <div className="card overflow-hidden flex flex-col group active:scale-[.98]">
      <Link href={`/magaza/urun/${p.id}`} className="relative h-44 sm:h-52 bg-brand-light overflow-hidden">
        {p.img ? (
          <img src={p.img} alt={p.name} className="h-full w-full object-cover group-hover:scale-105 transition duration-500" />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-5xl sm:text-6xl">🔌</div>
        )}
        <div className="absolute top-2 left-2 flex gap-1.5">
          {fresh && <span className="rounded-full bg-accent-orange text-white px-2.5 py-1 text-[10px] font-extrabold">🔥 Yeni Geldi</span>}
          {disc > 0 && <span className="rounded-full bg-red-500 text-white px-2.5 py-1 text-[10px] font-extrabold">-%{disc}</span>}
        </div>
        {p.condition && (
          <span className="absolute top-2 right-2 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-extrabold text-brand-teal">⭐ {p.condition}/10</span>
        )}
      </Link>

      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between text-[10px] sm:text-xs font-bold text-slate-400 uppercase">
          <span>{brand}</span>
          {s && <span className="text-accent-orange font-extrabold">REVIVAL {s}/100</span>}
        </div>
        <Link href={`/magaza/urun/${p.id}`} className="font-extrabold text-brand-dark mt-1 text-sm sm:text-base hover:text-brand-teal">{p.name}</Link>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 flex-1">{p.desc}</p>

        <div className="mt-2 text-sm" title="Fonksiyon testi • Temizlik • Güvenlik • Garanti">🔧 ⚡ </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg sm:text-xl font-extrabold text-accent-orange">{p.price} ₺</span>
          {p.oldPrice && <span className="text-xs sm:text-sm text-slate-400 line-through">{p.oldPrice} ₺</span>}
        </div>

        <div className="mt-3 flex gap-2">
          <Link href={`/magaza/urun/${p.id}`} className="btn btn-teal !px-4 !py-2 text-xs sm:text-sm flex-1">İncele</Link>
          <a href={ask} target="_blank" className="btn btn-green !px-4 !py-2 text-xs sm:text-sm flex-1">Soru Sor</a>
        </div>
      </div>
    </div>
  );
}