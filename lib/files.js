import fs from "fs";
import path from "path";

export async function saveImage(fd, field = "image") {
  const f = fd.get(field);
  if (!f || typeof f === "string") return null;
  const dir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const ext = (f.name.split(".").pop() || "jpg").toLowerCase();
  const name = Date.now() + "-" + Math.random().toString(36).slice(2, 8) + "." + ext;
  fs.writeFileSync(path.join(dir, name), Buffer.from(await f.arrayBuffer()));
  return "/uploads/" + name;
}