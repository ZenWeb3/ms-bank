import Image from 'next/image';

export default function Testimonials() {
  const testimonials = [
    {
      text: "Switching to United Mississippi Bank was the best financial decision I've made. Their mobile app is incredibly intuitive, and the customer service is exceptional.",
      name: 'Sarah Johnson',
      role: 'Small Business Owner',
      avatar: '/user1.jpg',
    },
    {
      text: 'The personal loan process was seamless. I got approval within hours and the funds were in my account the same day. Highly recommend their services.',
      name: 'Michael Chen',
      role: 'Software Engineer',
      avatar: '/user2.jpg',
    },
    {
      text: 'As a retiree, I appreciate the personalized service and financial planning assistance. The team always takes time to explain things clearly.',
      name: 'Robert Wilson',
      role: 'Retiree',
      avatar: '/user3.jpg',
    },
  ];

  return (
    <section className="py-40 px-4 md:px-16 bg-black">
      <div className="max-w-[1500px] mx-auto">
        <div className="text-center mb-16">
          <div className="text-sm font-semibold tracking-[0.15em] uppercase text-gray-500 mb-4">
            Testimonials
          </div>
          <h2 className="font-syne text-4xl md:text-[3.5rem] font-extrabold tracking-tight leading-tight mb-6 text-white">
            What Our Customers Say
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-[700px] mx-auto leading-relaxed">
            Real experiences from real customers who trust United Mississippi Bank with their financial future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="bg-[#1a1a1a] border-2 border-[#2a2a2a] rounded-3xl p-8 md:p-12 transition-all duration-500 hover:translate-y-[-10px] hover:scale-[1.02] hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)] relative group"
            >
              {/* <div className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-r from-[#b22234] via-[#3c3b6e] to-[#5c0f28] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div> */}

              <p className="text-[#cccccc] leading-relaxed mb-8 text-lg">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-4">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={50}
                  height={50}
                  className="w-12 h-12 rounded-full border-2 border-gray-700"
                />
                <div>
                  <h4 className="font-semibold text-white mb-1">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}