import { NextResponse } from "next/server";
import { getDB, saveDB } from "../../../lib/db";
import { saveImage } from "../../../lib/files";

export async function GET() { return NextResponse.json(getDB().products); }

export async function POST(req) {
  const fd = await req.formData();
  const img = await saveImage(fd);
  const db = getDB();
  const p = {
    id: Date.now(),
    brandId: fd.get("brandId"),
    categoryId: fd.get("categoryId") || "",
    name: fd.get("name"),
    desc: fd.get("desc") || "",
    price: +fd.get("price"),
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
  p.brandId = fd.get("brandId") || p.brandId;
  p.categoryId = fd.get("categoryId") || p.categoryId;
  p.name = fd.get("name") || p.name;
  p.desc = fd.get("desc") || p.desc;
  p.price = fd.get("price") ? +fd.get("price") : p.price;
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