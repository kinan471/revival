import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white mt-20">
      <div className="wrap py-12 grid md:grid-cols-3 gap-8 text-center md:text-left">
        <div>
          <div className="text-2xl font-extrabold">revival</div>
          <p className="text-white/70 text-sm mt-2">Tamir, Temizlik ve Yeniden Canlanma</p>
        </div>
        <div className="text-sm space-y-2">
          <div className="font-extrabold text-accent-orange">Hızlı Linkler</div>
          <Link className="block hover:text-accent-orange" href="/magaza">Mağaza</Link>
          <Link className="block hover:text-accent-orange" href="/takip">Cihaz Takibi</Link>
          <Link className="block hover:text-accent-orange" href="/iletisim">İletişim</Link>
        </div>
        <div className="text-sm space-y-2">
          <div className="font-extrabold text-accent-orange">Hizmetler</div>
          <Link className="block hover:text-accent-orange" href="/talep?type=Tamir">Tamir</Link>
          <Link className="block hover:text-accent-orange" href="/talep?type=Temizlik">Temizlik</Link>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} revival – Tüm hakları saklıdır.
      </div>
    </footer>
  );
}