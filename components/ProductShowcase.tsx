import Image from 'next/image';
import Link from 'next/link';

export default function ProductShowcase() {
  const products = [
    {
      title: 'Personal Loans Made Simple',
      desc: "Whether you're consolidating debt, planning a major purchase, or covering unexpected expenses, our personal loans offer competitive rates and flexible terms.",
      features: [
        'Loan amounts from $1,000 to $50,000',
        'APR starting at 3.9%',
        'Same-day approval decisions',
        'No prepayment penalties',
      ],
      cta: 'Apply Now',
      image: '/phone.avif',
    },
    {
      title: 'Business Banking Solutions',
      desc: 'Grow your business with our comprehensive suite of business banking services. From checking accounts to merchant services, we have you covered.',
      features: [
        'No monthly maintenance fees',
        'Cash management tools',
        'Business credit cards',
        'Dedicated support team',
      ],
      cta: 'Explore Business Banking',
      image: '/workers.avif',
    },
    {
      title: 'Mobile & Online Banking',
      desc: 'Bank on your terms with our award-winning digital platforms. Manage accounts, pay bills, deposit checks, and transfer money—all from your device.',
      features: [
        'Mobile check deposit',
        'Bill pay & autopay',
        'Person-to-person transfers',
        'Real-time notifications',
      ],
      cta: 'Download App',
      image: '/banker.avif',
    },
  ];

  return (
    <section className="py-40 px-4 md:px-16 bg-gray-50 relative" id="loans">
      <div className="max-w-[1500px] mx-auto">
        {products.map((product, i) => (
          <div
            key={i}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-32 ${
              i % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
              <h3 className="font-syne text-3xl md:text-[2.5rem] mb-6 font-bold tracking-tight">
                {product.title}
              </h3>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                {product.desc}
              </p>
              <ul className="list-none mb-10">
                {product.features.map((feature, j) => (
                  <li
                    key={j}
                    className="py-4 border-b border-gray-200 text-gray-600 flex items-center gap-4 transition-all hover:text-black hover:pl-2"
                  >
                    <span className="text-[#b22234] font-bold text-xl">→</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="#apply" className="btn-primary-custom inline-block">
                {product.cta}
              </Link>
            </div>
            <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
              <div className="rounded-3xl overflow-hidden border-2 border-gray-200 shadow-[0_30px_80px_rgba(0,0,0,0.15)] transition-all hover:translate-y-[-10px] hover:shadow-[0_40px_100px_rgba(0,0,0,0.2)]">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={800}
                  height={500}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}