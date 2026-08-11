"use client";
import { useState } from "react";

const STATUSES = ["Teslim Alındı","Arıza Tespiti","Tamirde","Temizlikte","Kalite Kontrol","Teslime Hazır","Teslim Edildi"];

export default function Takip() {
  const [code, setCode] = useState("");
  const [r, setR] = useState(null);
  const [err, setErr] = useState("");
  const [copied, setCopied] = useState(false);

  async function search(e) {
    e.preventDefault();
    setErr(""); setR(null);
    const res = await fetch(`/api/repairs?code=${encodeURIComponent(code.trim().toUpperCase())}`);
    const data = await res.json();
    data ? setR(data) : setErr("Kayıt bulunamadı. Kodu kontrol edin.");
  }

  const copy = () => {
    navigator.clipboard?.writeText(r.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const pct = r ? Math.round((r.status / (STATUSES.length - 1)) * 100) : 0;

  return (
    <main className="wrap py-14 max-w-3xl mx-auto">
      <h1 className="section-title">Cihaz Takibi</h1>
      <p className="text-center text-slate-500 mt-2 text-sm">Takip kodunuzu girin, cihazınızın durumunu canlı izleyin.</p>

      <form onSubmit={search} className="mt-8 flex gap-2">
        <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="RV-XXXXXX"
          className="input flex-1 uppercase text-center font-extrabold tracking-widest" />
        <button className="btn btn-teal">Sorgula</button>
      </form>
      {err && <p className="mt-4 text-center font-bold text-red-500">{err}</p>}

      {r && (
        <div className="card p-6 sm:p-8 mt-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-3 text-xs sm:text-sm font-bold text-slate-600">
              <span>👤 {r.customer}</span><span>•</span><span>🔧 {r.brand} {r.device}</span>
            </div>
            <button onClick={copy} className="rounded-full bg-brand-light px-4 py-1.5 text-xs font-extrabold text-brand-teal active:scale-95">
              {copied ? "✓ Kopyalandı" : `🎫 ${r.code} ⧉`}
            </button>
          </div>

          {/* شريط التقدم */}
          <div className="mt-6">
            <div className="flex justify-between text-xs font-extrabold text-slate-500">
              <span>İlerleme</span><span className="text-accent-orange">%{pct}</span>
            </div>
            <div className="mt-2 h-3 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-3 rounded-full bg-gradient-to-r from-brand-teal to-accent-orange transition-all duration-700" style={{ width: `${pct}%` }} />
            </div>
          </div>

          <div className="mt-6 space-y-2">
            {STATUSES.map((s, i) => (
              <div key={s} className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition
                ${i < r.status ? "bg-brand-light text-brand-teal" : i === r.status ? "bg-accent-orange text-white shadow-lg" : "bg-slate-50 text-slate-300"}`}>
                <span className="h-6 w-6 rounded-full bg-white/30 flex items-center justify-center text-xs">{i < r.status ? "✓" : i + 1}</span>
                {s}
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl bg-green-50 border border-green-100 p-4 text-xs font-bold text-green-700">
            📲 Her aşama değişikliğinde WhatsApp ile bilgilendirilirsiniz.
          </div>
        </div>
      )}
    </main>
  );
}