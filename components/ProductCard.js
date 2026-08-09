export default function ProductCard({ p, brand, wa }) {
  const link = `https://wa.me/${wa}?text=${encodeURIComponent(`Merhaba! "${p.name}" ürünü hakkında bilgi almak istiyorum.`)}`;
  return (
    <div className="card overflow-hidden flex flex-col group active:scale-[.98]">
      <div className="relative h-44 sm:h-52 bg-brand-light overflow-hidden">
        {p.img ? (
          <img src={p.img} alt={p.name} className="h-full w-full object-cover group-hover:scale-105 transition duration-500" />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-5xl sm:text-6xl">🔌</div>
        )}
        <span className="absolute top-2 left-2 sm:top-3 sm:left-3 rounded-full bg-white/90 px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-extrabold text-brand-teal">🛡 3 Ay Garanti</span>
      </div>
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {brand && <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase">{brand}</span>}
        <h3 className="font-extrabold text-brand-dark mt-1 text-sm sm:text-base">{p.name}</h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 flex-1">{p.desc}</p>
        <div className="mt-3 sm:mt-4 flex items-center justify-between gap-2">
          <span className="text-lg sm:text-xl font-extrabold text-accent-orange">{p.price} ₺</span>
          <a href={link} target="_blank" className="btn btn-green !px-4 !py-2 text-xs sm:text-sm">Sipariş Ver</a>
        </div>
      </div>
    </div>
  );
}