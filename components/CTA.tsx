import Link from 'next/link';

export default function CTA() {
  return (
    <section className="py-32 px-4 md:px-16 bg-white text-center" id="get-started">
      <div className="max-w-200 mx-auto">
        <h2 className="font-syne text-3xl md:text-[3.5rem] font-extrabold mb-6 tracking-tight leading-tight">
          Ready to Experience Modern Banking?
        </h2>
        <p className="text-lg md:text-xl text-gray-600 mb-12 leading-relaxed">
          Join thousands of satisfied customers who have already made the switch to United Mississippi Bank. Open your account in minutes.
        </p>
        <Link href="#open-account" className="btn-primary-custom inline-block">
          Open Account Today
        </Link>
      </div>
    </section>
  );
}