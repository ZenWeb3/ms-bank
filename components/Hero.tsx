export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
      <div className="max-w-[1600px] mx-auto  sm:px-10 lg:px-16 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">

        {/* LEFT CONTENT */}
        <div className=" animate-fadeInUp text-center  lg:text-left">

          <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/50 border border-[rgba(92,15,40,0.2)] rounded-full text-xs sm:text-sm font-medium text-gray-500 mb-6 shadow-sm">
            <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse shadow-[0_0_12px_rgba(178,34,52,0.6)]" />
            Trusted by 500K+ customers
          </div>

          <h1 className="font-syne font-extrabold leading-[1.1] tracking-tighter mb-6 text-[2.2rem] sm:text-[3rem] md:text-[4rem] lg:text-[5rem]">
            Banking <br />
            <span className="bg-gradient-to-r from-[#5c0f28] via-[#b22234] via-[#3c3b6e] to-[#001a3d] bg-clip-text text-transparent bg-[length:200%_200%] animate-gradientShift">
              Reimagined
            </span>
          </h1>

          <p className="text-base  sm:text-lg md:text-xl text-gray-500 leading-relaxed max-w-[540px] mx-auto lg:mx-0 mb-10">
            Experience the future of financial services with United Mississippi
            Bank. Sophisticated banking solutions designed for modern life.
          </p>

          <div className="mb-12">
            <button className="btn-primary-custom cursor-pointer">
              Open Account
            </button>
          </div>

          {/* STATS */}
          <div className="flex flex-wrap justify-center  lg:justify-start gap-8 sm:gap-12 pt-10 border-t border-gray-100">

            <div>
              <div className="font-syne text-2xl sm:text-3xl md:text-4xl font-bold">
                $2.4B
              </div>
              <div className="text-[10px] sm:text-xs md:text-sm text-gray-400 font-bold uppercase tracking-widest">
                Total Deposits
              </div>
            </div>

            <div>
              <div className="font-syne text-2xl sm:text-3xl md:text-4xl font-bold">
                98%
              </div>
              <div className="text-[10px] sm:text-xs md:text-sm text-gray-400 font-bold uppercase tracking-widest">
                Satisfaction
              </div>
            </div>

            <div>
              <div className="font-syne text-2xl sm:text-3xl md:text-4xl font-bold">
                24/7
              </div>
              <div className="text-[10px] sm:text-xs md:text-sm text-gray-400 font-bold uppercase tracking-widest">
                Support
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT VISUAL */}
        <div className="hero-visual relative flex justify-center lg:justify-end mt-16 lg:mt-0 min-h-[420px] sm:min-h-[460px]">

          <div className="card-glow absolute w-[180px] sm:w-[240px] lg:w-[300px] h-[180px] sm:h-[240px] lg:h-[300px] bg-red-500/20 blur-[40px] rounded-full animate-pulse" />

          {/* CARD */}
          <div className="bank-card relative z-10 scale-[0.8] sm:scale-[0.9] md:scale-100">

            <div className="absolute inset-0 bg-gradient-to-tr from-red-500/10 to-blue-500/10 pointer-events-none" />

            <div className="flex justify-between items-start mb-8 relative z-10">
              <span className="font-syne font-bold tracking-widest text-[11px] uppercase opacity-80">
                UMB Premium
              </span>

              {/* CONTACTLESS ICON */}
              <div className="relative w-8 h-8 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
                </svg>

                <svg className="w-5 h-5 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round">
                  <path d="M7 9.5C8 10.5 8.5 12 8.5 13.5C8.5 15 8 16.5 7 17.5" strokeWidth="2" />
                  <path d="M10.5 7C12.5 9 13.5 11.5 13.5 14C13.5 16.5 12.5 19 10.5 21" strokeWidth="2" />
                  <path d="M14 4.5C17 7.5 18.5 10.5 18.5 14C18.5 17.5 17 20.5 14 23.5" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* CHIP */}
            <div className="w-[40px] h-[30px] sm:w-[45px] sm:h-[35px] bg-gradient-to-br from-[#e6c57a] via-[#b28639] to-[#e6c57a] rounded-md mb-8 shadow-inner" />

            <div className="text-lg sm:text-xl md:text-2xl font-syne tracking-[3px] mb-8 relative z-10">
              •••• •••• •••• 4821
            </div>

            <div className="flex justify-between items-end relative z-10">
              <div>
                <span className="text-[9px] sm:text-[10px] text-white/40 block tracking-widest uppercase">
                  Card Holder
                </span>
                <h4 className="text-sm sm:text-base md:text-lg font-medium font-syne">
                  Charles Pacman
                </h4>
              </div>

              <div className="flex relative w-12 h-8">
                <div className="absolute right-4 w-8 h-8 bg-red-600/90 rounded-full" />
                <div className="absolute right-0 w-8 h-8 bg-orange-500/80 rounded-full mix-blend-screen" />
              </div>
            </div>
          </div>

          {/* FLOATING NOTIFICATIONS */}

          {/* Zelle */}
          <div className="absolute notify z-30 bg-white/60 backdrop-blur-lg left-4 sm:-left-10 top-6 sm:top-12 rounded-xl shadow-xl px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-2 sm:gap-3 text-xs sm:text-sm animate-float">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#7a1fd6] rounded-xl flex items-center justify-center text-white font-bold italic">
              Z
            </div>
            <div className="leading-tight">
              <span className="block font-bold text-black">Zelle Transfer</span>
              <small className="text-gray-400 font-bold uppercase text-[9px] sm:text-[10px]">
                Just Now
              </small>
            </div>
            <div className="text-green-600 font-extrabold whitespace-nowrap">
              +$450
            </div>
          </div>

          {/* Deposit */}
          <div className="absolute notify z-30 bg-white/60 backdrop-blur-lg right-4 sm:-right-12 bottom-20 sm:bottom-24 rounded-xl shadow-xl px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-2 sm:gap-3 text-xs sm:text-sm animate-float">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#00b09b] rounded-xl flex items-center justify-center text-white font-bold">
              $
            </div>
            <div className="leading-tight">
              <span className="block font-bold text-black">Direct Deposit</span>
              <small className="text-gray-400 font-bold uppercase text-[9px] sm:text-[10px]">
                2 mins ago
              </small>
            </div>
            <div className="text-green-600 font-extrabold whitespace-nowrap">
              +$3,120
            </div>
          </div>

          {/* Wire */}
          <div className="absolute notify z-30 bg-white/60 backdrop-blur-lg right-8 sm:right-14 bottom-0 sm:-bottom-10 rounded-xl shadow-xl px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-2 sm:gap-3 text-xs sm:text-sm animate-float">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#3c3b6e] rounded-xl flex items-center justify-center text-white font-bold">
              W
            </div>
            <div className="leading-tight">
              <span className="block font-bold text-black">Wire Transfer</span>
              <small className="text-gray-400 font-bold uppercase text-[9px] sm:text-[10px]">
                Processing
              </small>
            </div>
            <div className="text-gray-400 font-bold text-[10px] sm:text-xs italic whitespace-nowrap">
              Pending
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}