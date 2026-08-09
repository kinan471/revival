import { NextResponse } from "next/server";
import { getDB } from "../../../lib/db";

export async function POST(req) {
  const { pass } = await req.json();
  return NextResponse.json({ ok: pass === getDB().settings.adminPass });
}