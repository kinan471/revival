import { getDB } from "../../lib/db";

export default function Iletisim() {
  const { settings } = getDB();
  const wa = `https://wa.me/${settings.whatsapp}`;
  const cards = [
    ["📍", "Adres", settings.address],
    ["📞", "Telefon", settings.phone],
    ["🕘", "Çalışma Saatleri", settings.hours],
    ["📸", "Instagram", "@" + settings.instagram],
  ];
  return (
    <main className="wrap py-14 max-w-4xl mx-auto">
      <h1 className="section-title">İletişim</h1>
      <p className="text-center text-slate-500 mt-2 text-sm">Size bir mesaj kadar yakınız.</p>
      <div className="mt-10 grid sm:grid-cols-2 gap-6">
        {cards.map(([i, t, d]) => (
          <div key={t} className="card p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-brand-light text-xl flex items-center justify-center">{i}</div>
            <div>
              <div className="text-xs font-bold text-slate-400">{t}</div>
              <div className="font-extrabold text-brand-dark">{d}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center gap-3 flex-wrap">
        <a href={wa} target="_blank" className="btn btn-green">💬 WhatsApp'tan Yazın</a>
        <a href={`https://instagram.com/${settings.instagram}`} target="_blank" className="btn btn-orange">📸 Instagram</a>
      </div>
      <iframe title="Harita" className="mt-8 w-full h-80 rounded-3xl border-0 shadow-lg" loading="lazy"
        src="https://maps.google.com/maps?q=Ba%C4%9Fc%C4%B1lar%2C%20%C4%B0stanbul&t=&z=12&ie=UTF8&iwloc=&output=embed" />
    </main>
  );
}