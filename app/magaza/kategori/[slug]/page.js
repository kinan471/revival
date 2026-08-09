import Link from "next/link";
import StoreGrid from "../../../../components/StoreGrid";
import { getDB } from "../../../../lib/db";

export default function CatPage({ params }) {
  const { categories, products, brands, settings } = getDB();
  const cat = categories.find((c) => c.id === params.slug);
  if (!cat)
    return <main className="wrap py-24 text-center">Kategori bulunamadı. <Link className="font-bold text-brand-teal" href="/magaza">← Mağaza</Link></main>;
  const items = products.filter((p) => p.categoryId === cat.id);
  return (
    <main className="wrap py-14">
      <Link href="/magaza" className="text-sm font-extrabold text-brand-teal">← Tüm Kategoriler</Link>
      <h1 className="mt-3 text-3xl md:text-4xl font-extrabold text-brand-dark">{cat.icon} {cat.name}</h1>
      <StoreGrid items={items} wa={settings.whatsapp} brands={brands} />
    </main>
  );
}