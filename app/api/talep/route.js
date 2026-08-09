import { NextResponse } from "next/server";
import { getDB, saveDB, newCode } from "../../../lib/db";
import { saveImage } from "../../../lib/files";

export async function POST(req) {
  const fd = await req.formData();
  const img = await saveImage(fd);
  const db = getDB();
  const r = {
    code: newCode(),
    customer: fd.get("customer") || "",
    phone: fd.get("phone") || "",
    brand: fd.get("brand") || "",
    device: fd.get("device") || "",
    service: fd.get("service") || "Tamir",
    note: fd.get("note") || "",
    img,
    status: 0,
    history: [{ s: 0, d: new Date().toISOString().slice(0, 10) }],
  };
  db.repairs.unshift(r);
  saveDB(db);
  const origin = new URL(req.url).origin;
  const msg = [
    "🐦 YENİ TALEP – revival",
    `👤 ${r.customer}`,
    `📞 ${r.phone}`,
    `🔧 ${r.brand} ${r.device}`,
    `🧾 ${r.service}`,
    `📝 ${r.note}`,
    img ? `🖼 Fotoğraf: ${origin}${img}` : "",
    `🎫 Takip Kodu: ${r.code}`,
  ].filter(Boolean).join("\n");
  return NextResponse.json({
    code: r.code,
    wa: `https://wa.me/${db.settings.whatsapp}?text=${encodeURIComponent(msg)}`,
  });
}