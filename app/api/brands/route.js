import { NextResponse } from "next/server";
import { getDB, saveDB } from "../../../lib/db";

export async function GET() { return NextResponse.json(getDB().brands); }

export async function POST(req) {
  const { name } = await req.json();
  const db = getDB();
  const b = { id: name.toLowerCase().replace(/[^a-z0-9ğüşıöç]+/gi, "-"), name };
  if (!db.brands.find((x) => x.id === b.id)) db.brands.push(b);
  saveDB(db);
  return NextResponse.json(b);
}

export async function PUT(req) {
  const { id, name } = await req.json();
  const db = getDB();
  const b = db.brands.find((x) => x.id === id);
  if (b) { b.name = name; saveDB(db); }
  return NextResponse.json(b);
}

export async function DELETE(req) {
  const id = req.nextUrl.searchParams.get("id");
  const db = getDB();
  db.brands = db.brands.filter((b) => b.id !== id);
  db.products = db.products.filter((p) => p.brandId !== id);
  saveDB(db);
  return NextResponse.json({ ok: true });
}