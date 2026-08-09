import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getDB } from "../lib/db";

export const metadata = {
  title: "revival – Tamir, Temizlik ve Yeniden Canlanma",
  description: "Küçük ev aletleriniz yeniden hayat buluyor.",
};

export default function RootLayout({ children }) {
  const { brands, categories, settings } = getDB();
  return (
    <html lang="tr">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans text-slate-800 bg-[#F7F9F9] antialiased">
        <Header brands={brands} categories={categories} settings={settings} />
        {children}
        <Footer />
      </body>
    </html>
  );
}