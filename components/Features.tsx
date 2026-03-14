export default function Features() {
  const features = [
    {
      icon: '💳',
      title: 'Smart Cards',
      desc: 'Premium cards with exclusive rewards, cashback on every purchase, and no annual fees. Your spending works harder for you.',
    },
    {
      icon: '🔒',
      title: 'Bank-Grade Security',
      desc: 'Advanced encryption and multi-factor authentication protect your accounts 24/7. Your security is our priority.',
    },
    {
      icon: '📊',
      title: 'Real-Time Analytics',
      desc: 'Track spending, set budgets, and get insights into your financial health with intelligent dashboards.',
    },
    {
      icon: '🌍',
      title: 'Global Transfers',
      desc: 'Send money worldwide instantly with competitive exchange rates and zero hidden fees. Banking without borders.',
    },
    {
      icon: '💰',
      title: 'High-Yield Savings',
      desc: 'Earn competitive interest on your savings with flexible terms and no minimum balance requirements.',
    },
    {
      icon: '📱',
      title: 'Mobile First',
      desc: 'Full-featured mobile app for iOS and Android. Bank anywhere, anytime with our intuitive interface.',
    },
  ];

  return (
    <section className="py-40 px-4 md:px-16 bg-black relative" id="personal">
      <div className="max-w-375 mx-auto">
        <div className="text-center mb-24">
          <div className="text-sm font-semibold tracking-[0.15em] uppercase text-gray-500 mb-4">
            Features
          </div>
          <h2 className="font-syne text-4xl md:text-[3.5rem] font-extrabold tracking-tight leading-tight mb-6 text-white">
            Everything You Need
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-175 mx-auto leading-relaxed">
            Comprehensive banking solutions designed to simplify your financial life and help you achieve your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className="feature-card bg-[#1a1a1a] border-2 border-[#2a2a2a] rounded-3xl p-8 md:p-12 relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="w-17.5 h-17.5 bg-black border-2 border-[#2a2a2a] rounded-2xl flex items-center justify-center text-[2rem] mb-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-[-5deg]">
                {feature.icon}
              </div>

              <h3 className="font-syne text-xl md:text-2xl mb-4 font-bold tracking-tight text-white">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}