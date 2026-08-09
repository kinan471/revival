import fs from "fs";
import path from "path";
const file = path.join(process.cwd(), "lib", "db.json");

export const STATUSES = [
  "Teslim Alındı", "Arıza Tespiti", "Tamirde", "Temizlikte",
  "Kalite Kontrol", "Teslime Hazır", "Teslim Edildi",
];

const seed = {
  settings: {
    whatsapp: "905314319921",
    phone: "+90 531 431 99 21",
    address: "Bağcılar, İstanbul",
    hours: "Pzt–Cmt 09:00–19:00",
    instagram: "revival.turkiye",
    adminPass: "revival2026",
  },
  categories: [
    { id: "kahve", name: "Kahve Makineleri", icon: "☕" },
    { id: "supurge", name: "Süpürgeler", icon: "🌀" },
    { id: "utu", name: "Ütüler", icon: "♨️" },
    { id: "mikser", name: "Mikserler", icon: "🥣" },
    { id: "kettle", name: "Kettle & Çay Makineleri", icon: "🫖" },
    { id: "tost", name: "Tost Makineleri", icon: "🥪" },
  ],
  brands: [
    { id: "bosch", name: "Bosch" },
    { id: "philips", name: "Philips" },
    { id: "tefal", name: "Tefal" },
    { id: "arcelik", name: "Arçelik" },
    { id: "beko", name: "Beko" },
    { id: "karaca", name: "Karaca" },
  ],
  products: [
    { id: 1, brandId: "bosch", categoryId: "kettle", name: "Kettle TW3030 – Yenilenmiş", desc: "Kireçten arındırılmış, rezistans kontrolü yapılmış, 3 ay garantili.", price: 850, img: "" },
    { id: 2, brandId: "philips", categoryId: "utu", name: "Ütü GC2990 – Yenilenmiş", desc: "Taban temizliği ve buhar kanalları açıldı, ilk günkü performansında.", price: 1100, img: "" },
    { id: 3, brandId: "tefal", categoryId: "kahve", name: "Kahve Makinesi CM110 – Yenilenmiş", desc: "Derinlemesine temizlik ve kireç çözme, tüm parçalar test edildi.", price: 1400, img: "" },
    { id: 4, brandId: "arcelik", categoryId: "kettle", name: "Çay Makinesi K3300 – Yenilenmiş", desc: "Yenilenmiş ve 3 ay garantili.", price: 1750, img: "" },
  ],
  repairs: [],
};

export function getDB() {
  if (!fs.existsSync(file)) fs.writeFileSync(file, JSON.stringify(seed, null, 2), "utf8");
  const db = JSON.parse(fs.readFileSync(file, "utf8"));
  // دمج أي مفاتيح ناقصة من البذور (يحل مشكلة الملفات القديمة)
  return { ...seed, ...db, settings: { ...seed.settings, ...(db.settings || {}) } };
}
export function saveDB(db) { fs.writeFileSync(file, JSON.stringify(db, null, 2), "utf8"); }
export const newCode = () => "RV-" + Math.random().toString(36).slice(2, 8).toUpperCase();