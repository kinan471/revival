"use client";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

const ISSUES = {
  "Kahve Makinesi": ["Çalışmıyor", "Isıtmıyor", "Su akıtıyor", "Tuhaf ses", "Temizlik gerekli"],
  "Süpürge": ["Çekim gücü düşük", "Çalışmıyor", "Aşırı ses", "Koku"],
  "Ütü": ["Isıtmıyor", "Buhar vermiyor", "Su akıtıyor", "Taban kirli"],
  "Mikser": ["Çalışmıyor", "Hız sorunu", "Aşırı ses"],
  "Kettle": ["Isıtmıyor", "Su akıtıyor", "Kireç"],
  "Çay Makinesi": ["Isıtmıyor", "Su akıtıyor", "Kireç"],
  "Tost Makinesi": ["Isıtmıyor", "Yapışıyor", "Çalışmıyor"],
  "Diğer": [],
};

function Form() {
  const params = useSearchParams();
  const t = params.get("type");
  const initialService = t === "Temizlik" ? "Temizlik" : t === "Satis" ? "Satış (Cihazını Bize Sat)" : "Tamir";
  const [service, setService] = useState(initialService);
  const [device, setDevice] = useState("");
  const [issues, setIssues] = useState([]);
  const [note, setNote] = useState("");
  const [img, setImg] = useState(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(null);

  const toggleIssue = (i) => {
    setIssues((old) => old.includes(i) ? old.filter((x) => x !== i) : [...old, i]);
  };

  const quickWA = () => {
    const msg = "Merhaba REVIVAL! Cihazımı kontrol ettirmek istiyorum.\n🔧 Cihaz: \n🏷 Marka: \n❗ Sorun: ";
    window.open(`https://wa.me/905314319921?text=${encodeURIComponent(msg)}`, "_blank");
  };

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    const fd = new FormData(e.target);
    fd.set("note", [issues.length ? "Sorunlar: " + issues.join(", ") : "", note].filter(Boolean).join(" — "));
    try {
      const res = await fetch("/api/talep", { method: "POST", body: fd });
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
        <div className="card p-8 sm:p-10">
          <div className="text-6xl">✅</div>
          <h1 className="mt-4 text-2xl font-extrabold text-brand-dark">Talebiniz alındı!</h1>
          <p className="mt-2 text-slate-600 text-sm">WhatsApp açıldı — mesajınızı göndermeyi unutmayın.</p>
          <div className="mt-5 rounded-2xl bg-brand-light p-4 font-extrabold text-brand-teal text-lg">🎫 Takip Kodu: {done.code}</div>
          <p className="mt-2 text-xs text-slate-400">Bu kodla "Cihaz Takibi" sayfasından durumunu izleyin.</p>
          <a href={done.wa} target="_blank" className="btn btn-green mt-6">WhatsApp'ı Tekrar Aç</a>
        </div>
      </main>
    );

  return (
    <main className="wrap py-12 max-w-2xl mx-auto">
      <h1 className="section-title">{service.includes("Satış") ? "Cihazını Bize Sat 💰" : "Talep Formu"}</h1>
      <p className="text-center text-slate-500 mt-2 text-sm">
        {service.includes("Satış") ? "Bilgileri doldur, cihazına hızlıca teklif verelim." : "Bilgileri doldur, talebin otomatik WhatsApp'a iletilsin."}
      </p>

      {/* CTA ذكي سريع */}
      <button onClick={quickWA} className="mt-6 w-full rounded-2xl border-2 border-dashed border-green-300 bg-green-50 p-4 text-sm font-extrabold text-green-700 active:scale-[.98]">
        💬 Ücretsiz ön değerlendirme — WhatsApp'ta hızlı yaz
      </button>

      <form onSubmit={submit} className="card p-6 sm:p-8 mt-6 grid sm:grid-cols-2 gap-4">
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
          <select name="device" required className="input" value={device} onChange={(e) => { setDevice(e.target.value); setIssues([]); }}>
            <option value="">Seçin...</option>
            {Object.keys(ISSUES).map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="label">Hizmet Türü *</label>
          <select name="service" value={service} onChange={(e) => setService(e.target.value)} className="input">
            <option>Tamir</option>
            <option>Temizlik</option>
            <option>Tamir + Temizlik</option>
            <option>Satış (Cihazını Bize Sat)</option>
          </select>
        </div>

        {/* التشخيص التفاعلي */}
        {device && ISSUES[device]?.length > 0 && (
          <div className="sm:col-span-2">
            <label className="label">❗ Sorunu seç (birden fazla seçebilirsin):</label>
            <div className="flex flex-wrap gap-2">
              {ISSUES[device].map((i) => (
                <button type="button" key={i} onClick={() => toggleIssue(i)}
                  className={`rounded-full px-4 py-2 text-xs font-extrabold transition touch-manipulation ${issues.includes(i) ? "bg-accent-orange text-white shadow" : "bg-white border border-slate-200 text-slate-500"}`}>
                  {i}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="sm:col-span-2">
          <label className="label">Ek açıklama (opsiyonel)</label>
          <textarea value={note} onChange={(e) => setNote(e.target.value)} rows="2" className="input" placeholder="Varsa ek detay yazın..." />
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