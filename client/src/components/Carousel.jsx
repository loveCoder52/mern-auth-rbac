import { useState, useEffect } from "react";
import carousel1 from '../img/carousel-1.jpg'
import carousel2 from '../img/carousel-2.jpg'
import carousel3 from '../img/carousel-3.jpg'
const slides = [
  {
    img: carousel1,
    title: "Pioneers Of Solar And Renewable Energy",
    desc: "Leading the way in sustainable energy solutions for a brighter, cleaner future.",
    btn: "Read More",
    link: "#services",
  },
  {
    img: carousel2,
    title: "Sustainable Energy Solutions",
    desc: "Transform your energy consumption with our innovative solar and wind systems.",
    btn: "Explore Services",
    link: "#services",
  },
  {
    img: carousel3,
    title: "Clean Energy For Everyone",
    desc: "Join thousands who switched to renewable energy for a better future.",
    btn: "Get A Quote",
    link: "#quote",
  },
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Auto slide (optional but recommended)
  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0 relative">
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-[90vh] object-cover"
            />

            <div className="absolute inset-0 flex items-center bg-black/50">
              <div className="max-w-7xl mx-auto px-6">
                {/* TEXT ANIMATION */}
                <div
                  className={`max-w-3xl transition-all duration-700 ease-out
                    ${current === index
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-10"
                    }`}
                >
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                    {slide.title}
                  </h1>

                  <p className="text-lg text-white mb-8">
                    {slide.desc}
                  </p>

                  <a
                    href={slide.link}
                    className="inline-block rounded-full bg-blue-600 px-8 py-3 text-white font-semibold hover:bg-blue-700 transition"
                  >
                    {slide.btn}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-5 top-1/2 -translate-y-1/2 rounded-full bg-white/70 p-3 hover:bg-white transition"
      >
        ‹
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full bg-white/70 p-3 hover:bg-white transition"
      >
        ›
      </button>
    </div>
  );
}
