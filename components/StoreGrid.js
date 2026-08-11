"use client";
import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";

export default function StoreGrid({ items, wa, brands = [], cats = [] }) {
  const [sort, setSort] = useState("new");
  const [fb, setFb] = useState("all");
  const [fc, setFc] = useState("all");
  const [price, setPrice] = useState("all");
  const [cond, setCond] = useState("all");

  const list = useMemo(() => {
    let l = [...items];
    if (fb !== "all") l = l.filter((p) => p.brandId === fb);
    if (fc !== "all") l = l.filter((p) => p.categoryId === fc);
    if (price === "0-1000") l = l.filter((p) => p.price < 1000);
    if (price === "1000-2000") l = l.filter((p) => p.price >= 1000 && p.price < 2000);
    if (price === "2000+") l = l.filter((p) => p.price >= 2000);
    if (cond !== "all") l = l.filter((p) => (p.condition || 0) >= +cond);
    if (sort === "asc") l.sort((a, b) => a.price - b.price);
    else if (sort === "desc") l.sort((a, b) => b.price - a.price);
    else l.sort((a, b) => b.id - a.id);
    return l;
  }, [items, sort, fb, fc, price, cond]);

  const chip = (on) =>
    `shrink-0 rounded-full px-4 py-2 text-xs font-extrabold transition touch-manipulation ${on ? "bg-brand-teal text-white shadow" : "bg-white border border-slate-200 text-slate-500 hover:border-brand-teal"}`;
  const sel = "input !w-full sm:!w-auto !py-2.5 text-xs font-extrabold";

  return (
    <div>
      {/* شرائح الماركة/الفئة: تمرير أفقي على الموبايل */}
      <div className="mt-5 flex gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0 sm:flex-wrap">
        {cats.length > 0 && <span className="shrink-0 self-center text-xs font-extrabold text-slate-400">Kategori:</span>}
        {cats.length > 0 && <button className={chip(fc === "all")} onClick={() => setFc("all")}>Tümü</button>}
        {cats.map((c) => <button key={c.id} className={chip(fc === c.id)} onClick={() => setFc(c.id)}>{c.icon} {c.name}</button>)}
        {cats.length > 0 && brands.length > 0 && <span className="w-px h-6 bg-slate-200 mx-1 shrink-0 self-center" />}
        {brands.length > 0 && <span className="shrink-0 self-center text-xs font-extrabold text-slate-400">Marka:</span>}
        {brands.length > 0 && <button className={chip(fb === "all")} onClick={() => setFb("all")}>Tümü</button>}
        {brands.map((b) => <button key={b.id} className={chip(fb === b.id)} onClick={() => setFb(b.id)}>{b.name}</button>)}
      </div>

      {/* فرز + سعر + حالة */}
      <div className="mt-3 grid grid-cols-1 sm:flex gap-2">
        <select value={sort} onChange={(e) => setSort(e.target.value)} className={sel}>
          <option value="new">En Yeniler</option>
          <option value="asc">Fiyat: Artan</option>
          <option value="desc">Fiyat: Azalan</option>
        </select>
        <select value={price} onChange={(e) => setPrice(e.target.value)} className={sel}>
          <option value="all">Fiyat: Tümü</option>
          <option value="0-1000">0 – 1000 ₺</option>
          <option value="1000-2000">1000 – 2000 ₺</option>
          <option value="2000+">2000+ ₺</option>
        </select>
        <select value={cond} onChange={(e) => setCond(e.target.value)} className={sel}>
          <option value="all">Durum: Tümü</option>
          <option value="9">9/10 ve üzeri</option>
          <option value="8">8/10 ve üzeri</option>
          <option value="7">7/10 ve üzeri</option>
        </select>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {list.map((p) => (
          <ProductCard key={p.id} p={p} wa={wa} brand={brands.find((b) => b.id === p.brandId)?.name} />
        ))}
      </div>
      {list.length === 0 && <p className="mt-10 text-center text-slate-400 font-bold">Bu filtre için ürün yok.</p>}
    </div>
  );
}