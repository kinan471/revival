import fs from "fs";
import path from "path";
const file = path.join(process.cwd(), "lib", "db.json");

export const STATUSES = [
  "Teslim Alındı", "Arıza Tespiti", "Tamirde", "Temizlikte",
  "Kalite Kontrol", "Teslime Hazır", "Teslim Edildi",
];

// REVIVAL SCORE: متوسط الدرجات × 10 → مثال: 92/100
export const score100 = (p) => {
  const v = Object.values(p.score || {});
  if (!v.length) return null;
  return Math.round((v.reduce((a, b) => a + b, 0) / v.length) * 10);
};
export const daysAgo = (d) => Math.floor((Date.now() - new Date(d).getTime()) / 86400000);

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
    {
      id: 1, brandId: "bosch", categoryId: "kettle",
      name: "Kettle TW3030 – Yenilenmiş",
      desc: "Kireçten arındırılmış, rezistans kontrolü yapılmış, tüm testlerden geçmiş.",
      price: 850, oldPrice: 1250, condition: 9,
      score: { performans: 9, temizlik: 10, gorunum: 8, fonksiyon: 10 },
      note: "Yan yüzeyde çok hafif çizik, kullanımı etkilemez.",
      createdAt: "2026-08-09", img: "",
    },
    {
      id: 2, brandId: "philips", categoryId: "utu",
      name: "Ütü GC2990 – Yenilenmiş",
      desc: "Taban temizliği ve buhar kanalları açıldı, ilk günkü performansında.",
      price: 1100, oldPrice: 1600, condition: 8.5,
      score: { performans: 9, temizlik: 9, gorunum: 8, fonksiyon: 9 },
      note: "",
      createdAt: "2026-08-08", img: "",
    },
    {
      id: 3, brandId: "tefal", categoryId: "kahve",
      name: "Kahve Makinesi CM110 – Yenilenmiş",
      desc: "Derinlemesine temizlik + kireç çözme, tüm parçalar test edildi.",
      price: 1400, oldPrice: 2100, condition: 8,
      score: { performans: 8, temizlik: 9, gorunum: 7, fonksiyon: 9 },
      note: "Üst kapakta yüzeysel parlaklık kaybı.",
      createdAt: "2026-08-05", img: "",
    },
    {
      id: 4, brandId: "arcelik", categoryId: "kettle",
      name: "Çay Makinesi K3300 – Yenilenmiş",
      desc: "Yenilenmiş, test edilmiş, 3 ay garantili.",
      price: 1750, oldPrice: 2500, condition: 9,
      score: { performans: 9, temizlik: 9, gorunum: 9, fonksiyon: 10 },
      note: "",
      createdAt: "2026-08-10", img: "",
    },
  ],
  reviews: [
    { name: "Ayşe K.", stars: 5, text: "Kahve makinem yeni gibi oldu! Hızlı ve güvenilir.", date: "2026-07-12" },
    { name: "Mehmet D.", stars: 5, text: "Süpürgem aynı gün teslim edildi. Takip sistemi süper.", date: "2026-07-25" },
    { name: "Zeynep A.", stars: 4, text: "Ütü temizliği çok başarılı, tavsiye ederim.", date: "2026-08-02" },
  ],
  repairs: [],
};

export function getDB() {
  if (!fs.existsSync(file)) fs.writeFileSync(file, JSON.stringify(seed, null, 2), "utf8");
  const db = JSON.parse(fs.readFileSync(file, "utf8"));
  return { ...seed, ...db, settings: { ...seed.settings, ...(db.settings || {}) } };
}
export function saveDB(db) { fs.writeFileSync(file, JSON.stringify(db, null, 2), "utf8"); }
export const newCode = () => "RV-" + Math.random().toString(36).slice(2, 8).toUpperCase();