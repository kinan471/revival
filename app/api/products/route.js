import { NextResponse } from "next/server";
import { getDB, saveDB } from "../../../lib/db";
import { saveImage } from "../../../lib/files";

export async function GET() { return NextResponse.json(getDB().products); }

function readProduct(fd, existing) {
  const score = { ...(existing?.score || {}) };
  if (fd.get("sc_per")) score.performans = +fd.get("sc_per");
  if (fd.get("sc_tem")) score.temizlik = +fd.get("sc_tem");
  if (fd.get("sc_gor")) score.gorunum = +fd.get("sc_gor");
  if (fd.get("sc_fon")) score.fonksiyon = +fd.get("sc_fon");
  return {
    brandId: fd.get("brandId") || existing?.brandId,
    categoryId: fd.get("categoryId") || existing?.categoryId || "",
    name: fd.get("name") || existing?.name,
    desc: (fd.get("desc") ?? existing?.desc) || "",
    price: fd.get("price") ? +fd.get("price") : existing?.price,
    oldPrice: fd.get("oldPrice") ? +fd.get("oldPrice") : (existing?.oldPrice || 0),
    condition: fd.get("condition") ? +fd.get("condition") : (existing?.condition || 0),
    note: (fd.get("note") ?? existing?.note) || "",
    score,
  };
}

export async function POST(req) {
  const fd = await req.formData();
  const img = await saveImage(fd);
  const db = getDB();
  const p = {
    id: Date.now(),
    ...readProduct(fd, null),
    createdAt: new Date().toISOString().slice(0, 10),
    img: img || "",
  };
  db.products.push(p); saveDB(db);
  return NextResponse.json(p);
}

export async function PUT(req) {
  const fd = await req.formData();
  const img = await saveImage(fd);
  const db = getDB();
  const p = db.products.find((x) => x.id === +fd.get("id"));
  if (!p) return NextResponse.json({ error: "nf" }, { status: 404 });
  Object.assign(p, readProduct(fd, p));
  if (img) p.img = img;
  saveDB(db);
  return NextResponse.json(p);
}

export async function DELETE(req) {
  const id = +req.nextUrl.searchParams.get("id");
  const db = getDB();
  db.products = db.products.filter((p) => p.id !== id);
  saveDB(db);
  return NextResponse.json({ ok: true });
}