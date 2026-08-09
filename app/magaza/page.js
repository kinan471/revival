import Link from "next/link";
import { getDB } from "../../lib/db";

export default function Magaza() {
  const { brands, products, categories } = getDB();
  const count = (fn) => products.filter(fn).length;
  return (
    <main className="wrap py-14">
      <h1 className="section-title">Mağaza</h1>
      <p className="text-center text-slate-500 mt-2 text-sm">Yenilenmiş, garantili küçük ev aletleri.</p>

      <h2 className="mt-12 text-xl font-extrabold text-brand-dark">🗂 Kategoriler</h2>
      <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-5">
        {categories.map((c) => (
          <Link key={c.id} href={`/magaza/kategori/${c.id}`} className="card p-6 text-center group">
            <div className="text-4xl group-hover:scale-110 transition">{c.icon}</div>
            <div className="mt-2 font-extrabold text-brand-teal text-sm">{c.name}</div>
            <div className="text-xs text-slate-400 font-bold mt-1">{count((p) => p.categoryId === c.id)} ürün</div>
          </Link>
        ))}
      </div>

      <h2 className="mt-12 text-xl font-extrabold text-brand-dark">🏢 Markalar</h2>
      <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-5">
        {brands.map((b) => (
          <Link key={b.id} href={`/magaza/${b.id}`} className="card p-6 text-center group">
            <div className="text-2xl font-extrabold text-brand-teal group-hover:scale-105 transition">{b.name}</div>
            <div className="text-xs text-slate-400 font-bold mt-1">{count((p) => p.brandId === b.id)} ürün</div>
          </Link>
        ))}
      </div>
    </main>
  );
}