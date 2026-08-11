"use client";
import { useEffect, useState } from "react";

const STATUSES = ["Teslim Alındı","Arıza Tespiti","Tamirde","Temizlikte","Kalite Kontrol","Teslime Hazır","Teslim Edildi"];

export default function Admin() {
  const [auth, setAuth] = useState(false);
  const [pass, setPass] = useState("");
  const [tab, setTab] = useState("req");
  const [reqs, setReqs] = useState([]);
  const [prods, setProds] = useState([]);
  const [brands, setBrands] = useState([]);
  const [cats, setCats] = useState([]);
  const [edit, setEdit] = useState(null);
  const [msg, setMsg] = useState("");

  const load = async () => {
    setReqs(await (await fetch("/api/repairs")).json());
    setProds(await (await fetch("/api/products")).json());
    setBrands(await (await fetch("/api/brands")).json());
    setCats(await (await fetch("/api/categories")).json());
  };
  useEffect(() => { if (auth) load(); }, [auth]);

  const jfetch = (url, body, method = "POST") =>
    fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });

  async function login(e) {
    e.preventDefault();
    const r = await (await jfetch("/api/login", { pass })).json();
    r.ok ? setAuth(true) : setMsg("❌ Hatalı şifre");
  }
  async function setStatus(code, status) { await jfetch("/api/repairs", { code, status: +status }, "PATCH"); load(); }
  async function delReq(code) { if (confirm("Silinsin mi?")) { await fetch(`/api/repairs?code=${code}`, { method: "DELETE" }); load(); } }

  async function saveProduct(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    if (edit) fd.append("id", edit.id);
    await fetch("/api/products", { method: edit ? "PUT" : "POST", body: fd });
    setMsg(edit ? "✅ Ürün güncellendi" : "✅ Ürün eklendi");
    setEdit(null); e.target.reset(); load();
  }
  async function delProduct(id) { if (confirm("Silinsin mi?")) { await fetch(`/api/products?id=${id}`, { method: "DELETE" }); load(); } }

  async function addBrand(e) { e.preventDefault(); await jfetch("/api/brands", { name: new FormData(e.target).get("name") }); e.target.reset(); load(); }
  async function renameBrand(id, old) { const name = prompt("Yeni isim:", old); if (name) { await jfetch("/api/brands", { id, name }, "PUT"); load(); } }
  async function delBrand(id) { if (confirm("Marka ve ürünleri silinsin mi?")) { await fetch(`/api/brands?id=${id}`, { method: "DELETE" }); load(); } }

  async function addCat(e) { e.preventDefault(); const fd = new FormData(e.target); await jfetch("/api/categories", { name: fd.get("name"), icon: fd.get("icon") || "🔌" }); e.target.reset(); load(); }
  async function editCat(id, c) {
    const name = prompt("Yeni isim:", c.name);
    if (!name) return;
    const icon = prompt("İkon (emoji):", c.icon) || c.icon;
    await jfetch("/api/categories", { id, name, icon }, "PUT"); load();
  }
  async function delCat(id) { if (confirm("Kategori silinsin mi?")) { await fetch(`/api/categories?id=${id}`, { method: "DELETE" }); load(); } }

  if (!auth)
    return (
      <main className="wrap py-16 sm:py-24 max-w-sm mx-auto">
        <form onSubmit={login} className="card p-6 sm:p-8 space-y-4">
          <h1 className="text-xl sm:text-2xl font-extrabold text-brand-dark text-center">🔐 Yönetici Girişi</h1>
          <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Şifre" className="input" />
          <button className="btn btn-teal w-full">Giriş</button>
          {msg && <p className="text-center text-sm font-bold text-red-500">{msg}</p>}
        </form>
      </main>
    );

  const inp = "input";
  const tabBtn = (t, l) => (
    <button onClick={() => setTab(t)} className={`btn !px-4 sm:!px-5 !py-2.5 text-xs sm:text-sm shrink-0 ${tab === t ? "btn-teal" : "bg-white border border-slate-200"}`}>{l}</button>
  );

  return (
    <main className="wrap py-8 sm:py-10">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-dark">لوحة التحكم</h1>
      <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {tabBtn("req", "📥 الطلبات")}{tabBtn("prod", "🏷 المنتجات")}{tabBtn("cat", "🗂 الفئات")}{tabBtn("brand", "🏢 الماركات")}
      </div>
      {msg && <p className="mt-4 rounded-2xl bg-brand-light p-3 text-sm font-bold text-brand-teal">{msg}</p>}

      {/* الطلبات */}
      {tab === "req" && (
        <div className="mt-6 sm:mt-8 overflow-x-auto card">
          <table className="w-full text-sm">
            <thead className="bg-brand-light text-brand-teal">
              <tr>
                <th className="p-3 text-right hidden lg:table-cell">صورة</th>
                <th className="p-3 text-right">الزبون</th>
                <th className="p-3 text-right hidden sm:table-cell">الجهاز</th>
                <th className="p-3 text-right hidden md:table-cell">الخدمة</th>
                <th className="p-3 text-right">المرحلة</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {reqs.map((r) => (
                <tr key={r.code} className="border-t border-slate-100">
                  <td className="p-3 hidden lg:table-cell">{r.img ? <img src={r.img} alt="" className="h-12 w-12 rounded-xl object-cover" /> : "—"}</td>
                  <td className="p-3 font-bold">{r.customer}<br /><span className="text-[10px] sm:text-xs text-slate-400">{r.code}</span></td>
                  <td className="p-3 hidden sm:table-cell">{r.brand} {r.device}</td>
                  <td className="p-3 hidden md:table-cell">{r.service}</td>
                  <td className="p-3">
                    <select value={r.status} onChange={(e) => setStatus(r.code, e.target.value)} className="input !w-auto !py-1.5 text-xs">
                      {STATUSES.map((s, i) => <option key={i} value={i}>{s}</option>)}
                    </select>
                  </td>
                  <td className="p-3"><button onClick={() => delReq(r.code)} className="text-red-500 font-bold text-lg">✕</button></td>
                </tr>
              ))}
              {reqs.length === 0 && <tr><td colSpan="6" className="p-6 text-center text-slate-400">Henüz talep yok.</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      {/* المنتجات */}
      {tab === "prod" && (
        <div className="mt-6 sm:mt-8 grid lg:grid-cols-2 gap-6 sm:gap-8">
          <form onSubmit={saveProduct} key={edit?.id || "new"} className="card p-5 sm:p-6 space-y-3 h-fit">
            <h2 className="font-extrabold text-brand-dark">{edit ? "✏️ تعديل منتج" : "➕ إضافة منتج"}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <select name="brandId" defaultValue={edit?.brandId} className={inp} required>
                {brands.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
              <select name="categoryId" defaultValue={edit?.categoryId} className={inp} required>
                <option value="">الفئة...</option>
                {cats.map((c) => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
              </select>
            </div>
            <input name="name" defaultValue={edit?.name} placeholder="اسم المنتج" className={inp} required />
            <textarea name="desc" defaultValue={edit?.desc} placeholder="الوصف" rows="2" className={inp} />
            <div className="grid grid-cols-2 gap-3">
              <input name="price" defaultValue={edit?.price} type="number" placeholder="السعر ₺" className={inp} required />
              <input name="oldPrice" defaultValue={edit?.oldPrice || ""} type="number" placeholder="السعر القديم ₺" className={inp} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input name="condition" defaultValue={edit?.condition || ""} type="number" step="0.5" min="0" max="10" placeholder="الحالة /10" className={inp} />
              <input name="note" defaultValue={edit?.note || ""} placeholder="ملاحظة شفافية (عيوب)" className={inp} />
            </div>
            <div>
              <label className="label">♻️ REVIVAL SCORE (0–10):</label>
              <div className="grid grid-cols-4 gap-2">
                <input name="sc_per" defaultValue={edit?.score?.performans || ""} type="number" min="0" max="10" placeholder="أداء" className={inp + " text-center"} />
                <input name="sc_tem" defaultValue={edit?.score?.temizlik || ""} type="number" min="0" max="10" placeholder="نظافة" className={inp + " text-center"} />
                <input name="sc_gor" defaultValue={edit?.score?.gorunum || ""} type="number" min="0" max="10" placeholder="مظهر" className={inp + " text-center"} />
                <input name="sc_fon" defaultValue={edit?.score?.fonksiyon || ""} type="number" min="0" max="10" placeholder="وظيفة" className={inp + " text-center"} />
              </div>
            </div>
            <div>
              <input name="image" type="file" accept="image/*" className={inp} />
              {edit?.img && <img src={edit.img} alt="" className="mt-2 h-20 rounded-xl object-cover" />}
            </div>
            <div className="flex gap-2">
              <button className="btn btn-orange flex-1">{edit ? "حفظ التعديلات" : "إضافة"}</button>
              {edit && <button type="button" onClick={() => setEdit(null)} className="btn bg-slate-100">إلغاء</button>}
            </div>
          </form>

          <ul className="space-y-3">
            {prods.map((p) => (
              <li key={p.id} className="card p-3 sm:p-4 flex items-center gap-3 sm:gap-4">
                {p.img ? <img src={p.img} alt="" className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl object-cover" /> : <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-brand-light flex items-center justify-center">🔌</div>}
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-xs sm:text-sm truncate">{p.name}</div>
                  <div className="text-[10px] sm:text-xs text-slate-400 truncate">
                    {brands.find((b) => b.id === p.brandId)?.name} • {cats.find((c) => c.id === p.categoryId)?.name || "بدون فئة"} • <span className="text-accent-orange font-bold">{p.price} ₺</span>
                    {p.condition ? ` • ⭐${p.condition}/10` : ""}
                  </div>
                </div>
                <button onClick={() => { setEdit(p); window.scrollTo(0, 0); }} className="text-brand-teal font-bold text-lg">✏️</button>
                <button onClick={() => delProduct(p.id)} className="text-red-500 font-bold text-lg">✕</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* الفئات */}
      {tab === "cat" && (
        <div className="mt-6 sm:mt-8 max-w-md space-y-4">
          <form onSubmit={addCat} className="card p-4 sm:p-6 flex gap-2">
            <input name="icon" placeholder="🔌" className={inp + " !w-14 sm:!w-16 text-center"} />
            <input name="name" placeholder="اسم الفئة" className={inp} required />
            <button className="btn btn-orange !px-4">➕</button>
          </form>
          <ul className="space-y-2">
            {cats.map((c) => (
              <li key={c.id} className="card p-3 sm:p-4 flex items-center justify-between">
                <span className="font-extrabold text-brand-teal text-sm sm:text-base">{c.icon} {c.name}</span>
                <div className="flex gap-3">
                  <button onClick={() => editCat(c.id, c)} className="text-brand-teal font-bold text-lg">✏️</button>
                  <button onClick={() => delCat(c.id)} className="text-red-500 font-bold text-lg">✕</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* الماركات */}
      {tab === "brand" && (
        <div className="mt-6 sm:mt-8 max-w-md space-y-4">
          <form onSubmit={addBrand} className="card p-4 sm:p-6 flex gap-2">
            <input name="name" placeholder="اسم الماركة" className={inp} required />
            <button className="btn btn-orange !px-4">➕</button>
          </form>
          <ul className="space-y-2">
            {brands.map((b) => (
              <li key={b.id} className="card p-3 sm:p-4 flex items-center justify-between">
                <span className="font-extrabold text-brand-teal text-sm sm:text-base">{b.name}</span>
                <div className="flex gap-3">
                  <button onClick={() => renameBrand(b.id, b.name)} className="text-brand-teal font-bold text-lg">✏️</button>
                  <button onClick={() => delBrand(b.id)} className="text-red-500 font-bold text-lg">✕</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}