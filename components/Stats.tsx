export default function Stats() {
  const stats = [
    { number: "500K+", label: "Active Customers", progress: 85 },
    { number: "$2.4B", label: "Total Assets", progress: 92 },
    { number: "98%", label: "Customer Satisfaction", progress: 98 },
    { number: "4.2M", label: "Monthly Transactions", progress: 78 },
  ];

  return (
    <section className="py-40 px-4 md:px-16 bg-[#050505] relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#b22234] rounded-full blur-[120px] opacity-15"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#3c3b6e] rounded-full blur-[120px] opacity-15"></div>

      <div className="max-w-[1500px] mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="text-sm font-semibold tracking-[0.15em] uppercase text-white/60 mb-4">
            Institutional Strength
          </div>
          <h2 className="font-syne text-4xl md:text-[3.5rem] font-extrabold tracking-tight text-white">
            Banking in{" "}
            <span className="bg-gradient-to-r from-[#5c0f28] via-[#b22234] to-[#3c3b6e] bg-clip-text text-transparent">
              Real-Time
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {stats.map((stat, i) => (
            <div key={i} className="stat-card group">
              <div className="font-syne text-4xl md:text-[3.5rem] font-extrabold mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent tracking-tight group-hover:from-white group-hover:to-[#b22234] transition-all">
                {stat.number}
              </div>
              <div className="text-white/50 text-sm uppercase tracking-wide font-semibold mb-6">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
