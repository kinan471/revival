import Link from "next/link";
import StoreGrid from "../../../components/StoreGrid";
import { getDB } from "../../../lib/db";

export default function BrandPage({ params }) {
  const { brands, products, categories, settings } = getDB();
  const brand = brands.find((b) => b.id === params.slug);
  if (!brand)
    return <main className="wrap py-24 text-center">Marka bulunamadı. <Link className="font-bold text-brand-teal" href="/magaza">← Mağaza</Link></main>;
  const items = products.filter((p) => p.brandId === brand.id);
  return (
    <main className="wrap py-14">
      <Link href="/magaza" className="text-sm font-extrabold text-brand-teal">← Tüm Markalar</Link>
      <h1 className="mt-3 text-3xl md:text-4xl font-extrabold text-brand-dark">{brand.name}</h1>
      <StoreGrid items={items} wa={settings.whatsapp} cats={categories} />
    </main>
  );
}