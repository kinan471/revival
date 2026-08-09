"use client";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

function Form() {
  const params = useSearchParams();
  const initial = params.get("type") === "Temizlik" ? "Temizlik" : params.get("type") === "Tamir" ? "Tamir" : "Tamir + Temizlik";
  const [service, setService] = useState(initial);
  const [img, setImg] = useState(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(null);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await fetch("/api/talep", { method: "POST", body: new FormData(e.target) });
      const data = await res.json();
      setDone(data);
      window.open(data.wa, "_blank");
    } catch {
      alert("Gönderilemedi. Lütfen WhatsApp'tan doğrudan yazın.");
    }
    setBusy(false);
  }

  if (done)
    return (
      <main className="wrap py-24 max-w-xl mx-auto text-center">
        <div className="card p-10">
          <div className="text-6xl">✅</div>
          <h1 className="mt-4 text-2xl font-extrabold text-brand-dark">Talebiniz alındı!</h1>
          <p className="mt-2 text-slate-600 text-sm">WhatsApp açıldı, mesajınızı göndermeyi unutmayın.</p>
          <div className="mt-5 rounded-2xl bg-brand-light p-4 font-extrabold text-brand-teal text-lg">🎫 Takip Kodu: {done.code}</div>
          <p className="mt-2 text-xs text-slate-400">Bu kodla cihazınızın durumunu "Cihaz Takibi" sayfasından izleyin.</p>
          <a href={done.wa} target="_blank" className="btn btn-green mt-6">WhatsApp'ı Tekrar Aç</a>
        </div>
      </main>
    );

  return (
    <main className="wrap py-14 max-w-2xl mx-auto">
      <h1 className="section-title">Talep Formu</h1>
      <p className="text-center text-slate-500 mt-2 text-sm">Bilgileri doldurun, talebiniz otomatik olarak WhatsApp'a iletilsin.</p>
      <form onSubmit={submit} className="card p-8 mt-8 grid sm:grid-cols-2 gap-4">
        <div>
          <label className="label">Ad Soyad *</label>
          <input name="customer" required className="input" placeholder="Adınız Soyadınız" />
        </div>
        <div>
          <label className="label">Telefon *</label>
          <input name="phone" required className="input" placeholder="05xx xxx xx xx" />
        </div>
        <div>
          <label className="label">Marka / Model</label>
          <input name="brand" className="input" placeholder="Örn: Bosch" />
        </div>
        <div>
          <label className="label">Cihaz Türü *</label>
          <select name="device" required className="input">
            <option value="">Seçin...</option>
            <option>Kahve Makinesi</option>
            <option>Süpürge</option>
            <option>Ütü</option>
            <option>Mikser</option>
            <option>Kettle</option>
            <option>Çay Makinesi</option>
            <option>Tost Makinesi</option>
            <option>Diğer</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="label">Hizmet Türü *</label>
          <select name="service" value={service} onChange={(e) => setService(e.target.value)} className="input">
            <option>Tamir</option>
            <option>Temizlik</option>
            <option>Tamir + Temizlik</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="label">Arıza / Talep Açıklaması</label>
          <textarea name="note" rows="3" className="input" placeholder="Cihazınızdaki sorunu kısaca anlatın..." />
        </div>
        <div className="sm:col-span-2">
          <label className="label">📷 Cihazın Fotoğrafı</label>
          <input name="image" type="file" accept="image/*" className="input"
            onChange={(e) => setImg(e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : null)} />
          {img && <img src={img} alt="önizleme" className="mt-3 h-32 rounded-2xl object-cover border border-slate-200" />}
        </div>
        <button disabled={busy} className="sm:col-span-2 btn btn-orange w-full disabled:opacity-50">
          {busy ? "Gönderiliyor..." : "WhatsApp'a Gönder 🚀"}
        </button>
      </form>
    </main>
  );
}

export default function Talep() {
  return <Suspense fallback={null}><Form /></Suspense>;
}