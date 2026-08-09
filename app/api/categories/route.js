import { NextResponse } from "next/server";
import { getDB, saveDB } from "../../../lib/db";

export async function GET() { return NextResponse.json(getDB().categories); }

export async function POST(req) {
  const { name, icon } = await req.json();
  const db = getDB();
  const c = { id: name.toLowerCase().replace(/[^a-z0-9ğüşıöç]+/gi, "-"), name, icon: icon || "🔌" };
  if (!db.categories.find((x) => x.id === c.id)) db.categories.push(c);
  saveDB(db);
  return NextResponse.json(c);
}

export async function PUT(req) {
  const { id, name, icon } = await req.json();
  const db = getDB();
  const c = db.categories.find((x) => x.id === id);
  if (c) { c.name = name || c.name; c.icon = icon || c.icon; saveDB(db); }
  return NextResponse.json(c);
}

export async function DELETE(req) {
  const id = req.nextUrl.searchParams.get("id");
  const db = getDB();
  db.categories = db.categories.filter((c) => c.id !== id);
  saveDB(db);
  return NextResponse.json({ ok: true });
}