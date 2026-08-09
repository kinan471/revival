"use client";
import { useState } from "react";
import Link from "next/link";

export default function Header({ brands, categories = [] }) {
  const [open, setOpen] = useState(null);   // قوائم الديسكتوب
  const [mob, setMob] = useState(false);    // فتح/غلق البرغر
  const [sec, setSec] = useState(null);     // القسم المفتوح بالأكورديون
  const item = "block rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-brand-light active:bg-brand-light";
  const head = "px-3 pt-2 pb-1 text-[10px] font-extrabold text-slate-400 uppercase";

  const Drop = ({ id, label, children }) => (
    <div className="relative" onMouseEnter={() => setOpen(id)} onMouseLeave={() => setOpen(null)}>
      <button className="px-3 py-2 text-sm font-bold hover:text-brand-teal">{label} ▾</button>
      {open === id && (
        <div className="absolute left-0 top-full z-50 w-60 max-h-[70vh] overflow-auto rounded-2xl bg-white shadow-xl border border-slate-100 p-2">
          {children}
        </div>
      )}
    </div>
  );

  // قسم أكورديون للموبايل
  const Acc = ({ id, label, children }) => (
    <div>
      <button onClick={() => setSec(sec === id ? null : id)}
        className="w-full flex items-center justify-between rounded-xl px-3 py-3 text-sm font-extrabold text-brand-dark active:bg-brand-light">
        {label}
        <span className={`text-xs text-accent-orange transition-transform duration-300 ${sec === id ? "rotate-180" : ""}`}>▼</span>
      </button>
      <div className={`grid transition-all duration-300 ${sec === id ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <div className="ml-4 mb-2 border-l-2 border-brand-light pl-3 space-y-1">{children}</div>
        </div>
      </div>
    </div>
  );

  const close = () => { setMob(false); setSec(null); };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
      <div className="wrap h-14 sm:h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-lg sm:text-xl font-extrabold text-brand-teal">
          <img src="/logo.png" alt="revival " className="h-8 w-8 sm:h-9 sm:w-9 object-contain" /> REViVAL TEKNiK SERViS
        </Link>

        {/* ديسكتوب */}
        <nav className="hidden lg:flex items-center">
          <Drop id="h" label="Hizmetler">
            <Link className={item} href="/talep?type=Tamir">🛠 Tamir Talebi</Link>
            <Link className={item} href="/talep?type=Temizlik">🫧 Temizlik Talebi</Link>
          </Drop>
          <Drop id="m" label="Alışveriş">
            <Link className={item + " text-accent-orange font-extrabold"} href="/magaza">🏷 Tüm Mağaza</Link>
            <div className={head}>Kategoriler</div>
            {categories.map((c) => <Link key={c.id} className={item} href={`/magaza/kategori/${c.id}`}>{c.icon} {c.name}</Link>)}
            <div className={head}>Markalar</div>
            {brands.map((b) => <Link key={b.id} className={item} href={`/magaza/${b.id}`}>{b.name}</Link>)}
          </Drop>
          <Link className="px-3 py-2 text-sm font-bold hover:text-brand-teal" href="/takip">Cihaz Takibi</Link>
          <Link className="px-3 py-2 text-sm font-bold hover:text-brand-teal" href="/iletisim">İletişim</Link>
          <Link href="/talep" className="btn btn-orange !px-5 !py-2.5 text-sm ml-2">Hemen Teklif Alın</Link>
        </nav>

        <button aria-label="Menü" onClick={() => setMob(!mob)}
          className="lg:hidden h-10 w-10 flex items-center justify-center rounded-xl text-2xl active:bg-brand-light">
          {mob ? "✕" : "☰"}
        </button>
      </div>

      {/* موبايل: أكورديون */}
      {mob && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-2 pb-5 max-h-[85vh] overflow-auto">
          <Acc id="hiz" label="🛠 Hizmetler">
            <Link className={item} href="/talep?type=Tamir" onClick={close}>Tamir Talebi</Link>
            <Link className={item} href="/talep?type=Temizlik" onClick={close}>Temizlik Talebi</Link>
          </Acc>
          <Acc id="kat" label="🗂 Kategoriler">
            {categories.map((c) => (
              <Link key={c.id} className={item} href={`/magaza/kategori/${c.id}`} onClick={close}>{c.icon} {c.name}</Link>
            ))}
          </Acc>
          <Acc id="mark" label="🏢 Markalar">
            <Link className={item} href="/magaza" onClick={close}>🏷 Tüm Mağaza</Link>
            {brands.map((b) => (
              <Link key={b.id} className={item} href={`/magaza/${b.id}`} onClick={close}>{b.name}</Link>
            ))}
          </Acc>
          <Link className="block rounded-xl px-3 py-3 text-sm font-extrabold text-brand-dark active:bg-brand-light" href="/takip" onClick={close}>📍 Cihaz Takibi</Link>
          <Link className="block rounded-xl px-3 py-3 text-sm font-extrabold text-brand-dark active:bg-brand-light" href="/iletisim" onClick={close}>📞 İletişim</Link>
          <Link href="/talep" onClick={close} className="btn btn-orange w-full mt-3">Hemen Teklif Alın ⚡</Link>
        </div>
      )}
    </header>
  );
}