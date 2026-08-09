import { NextResponse } from "next/server";
import { getDB, saveDB, STATUSES } from "../../../lib/db";

export async function GET(req) {
  const code = req.nextUrl.searchParams.get("code");
  const db = getDB();
  if (code) return NextResponse.json(db.repairs.find((r) => r.code === code) || null);
  return NextResponse.json(db.repairs);
}

export async function PATCH(req) {
  const { code, status } = await req.json();
  const db = getDB();
  const r = db.repairs.find((x) => x.code === code);
  if (!r) return NextResponse.json({ error: "nf" }, { status: 404 });
  r.status = Math.min(Math.max(0, status), STATUSES.length - 1);
  r.history.push({ s: r.status, d: new Date().toISOString().slice(0, 10) });
  saveDB(db);
  return NextResponse.json(r);
}

export async function DELETE(req) {
  const code = req.nextUrl.searchParams.get("code");
  const db = getDB();
  db.repairs = db.repairs.filter((r) => r.code !== code);
  saveDB(db);
  return NextResponse.json({ ok: true });
}