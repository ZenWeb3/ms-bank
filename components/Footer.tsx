import Link from 'next/link';

export default function Footer() {
  const columns = [
    {
      title: 'Banking',
      links: ['Personal Banking', 'Business Banking', 'Loans & Mortgages', 'Wealth Management'],
    },
    {
      title: 'Digital',
      links: ['Mobile App', 'Online Banking', 'Bill Pay', 'Security Center'],
    },
    {
      title: 'Support',
      links: ['Help Center', 'Find a Branch', 'FAQ', 'Contact Support'],
    },
  ];

  return (
    <footer className="bg-gray-100 border-t-2 border-gray-200 py-24 px-4 md:px-16">
      <div className="max-w-[1500px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16 mb-16">
          <div className="md:col-span-2">
            <div className="font-syne text-xl md:text-2xl font-bold mb-6 tracking-tight">
              United Mississippi Bank
            </div>
            <p className="text-gray-600 leading-relaxed max-w-[350px]">
              A modern banking institution dedicated to your financial success. We provide comprehensive services with security, innovation, and personalized care.
            </p>
          </div>
          {columns.map((col, i) => (
            <div key={i}>
              <h4 className="text-sm font-semibold tracking-widest uppercase mb-6 text-gray-500">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-3 list-none">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <Link
                      href="#"
                      className="text-gray-600 no-underline text-[0.95rem] transition-colors hover:text-black"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
          <p>© 2026 United Mississippi Bank. All rights reserved.</p>
          <div className="flex gap-8">
            {['Privacy Policy', 'Terms of Service', 'Accessibility'].map((link, i) => (
              <Link
                key={i}
                href="#"
                className="text-gray-500 no-underline transition-colors hover:text-black"
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}