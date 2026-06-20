import React from 'react';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import carousel1 from '../img/carousel-1.jpg'
import featureImg from '../img/feature.jpg'
import img1 from '../img/img-600x400-1.jpg'
import img2 from '../img/img-600x400-2.jpg'
import img3 from '../img/img-600x400-3.jpg'
import img4 from '../img/img-600x400-4.jpg'
import img5 from '../img/img-600x400-5.jpg'
import img6 from '../img/img-600x400-6.jpg'
import testimonial1 from '../img/testimonial-1.jpg'
import testimonial2 from '../img/testimonial-2.jpg'
import testimonial3 from '../img/testimonial-3.jpg'
import { motion } from "framer-motion";

function Services() {
  const navigate = useNavigate();

  // ---- Reusable animation variants ----
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardItem = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  const services = [
    { img: img1, icon: 'fa-solar-panel', title: 'Solar Panels' },
    { img: img2, icon: 'fa-wind', title: 'Wind Turbines' },
    { img: img3, icon: 'fa-lightbulb', title: 'Hydropower Plants' },
    { img: img4, icon: 'fa-solar-panel', title: 'Solar Panels' },
    { img: img5, icon: 'fa-wind', title: 'Wind Turbines' },
    { img: img6, icon: 'fa-lightbulb', title: 'Hydropower Plants' },
  ];

  const testimonials = [testimonial1, testimonial2, testimonial3];

  return (
    <div>
      <Navbar />

      {/* Topbar */}
      <div className="hidden lg:flex bg-gray-900 text-gray-300 text-sm">
        <div className="max-w-7xl mx-auto flex justify-between w-full px-6 py-2">
          <div className="flex gap-6">
            <span>📍 123 Street, New York, USA</span>
            <span>⏰ Mon - Fri : 09.00 AM - 09.00 PM</span>
          </div>
          <div className="flex gap-4 items-center">
            <span>📞 +012 345 6789</span>
            <div className="flex gap-3">
              <a href="#" className="hover:text-blue-500 transition-colors"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="hover:text-blue-500 transition-colors"><i className="fab fa-twitter"></i></a>
              <a href="#" className="hover:text-blue-500 transition-colors"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" className="hover:text-blue-500 transition-colors"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>
      </div>

      {/* Page header */}
      <div
        className="relative w-full py-24 bg-center bg-cover"
        style={{ backgroundImage: `url(${carousel1})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-6xl font-bold text-white mb-4"
          >
            Services
          </motion.h1>

          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            aria-label="breadcrumb"
          >
            <ol className="flex flex-wrap items-center gap-2 text-sm">
              <li>
                <button
                  onClick={() => navigate("/")}
                  className="text-white/80 hover:text-white transition cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li className="text-white/60">/</li>
              <li className="text-white font-medium">Services</li>
            </ol>
          </motion.nav>
        </div>
      </div>
      {/* Page header end */}

      {/* Service Start */}
      <div id="services" className="max-w-7xl mx-auto py-16 px-4">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-xl mx-auto mb-14"
        >
          <h6 className="text-blue-600 font-semibold mb-2 tracking-wide uppercase text-sm">Our Services</h6>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            We Are Pioneers In The World Of Renewable Energy
          </h1>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, i) => (
            <motion.div
              key={i}
              variants={cardItem}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-white"
            >
              <div className="overflow-hidden">
                <img
                  className="w-full h-48 object-cover hover:scale-110 transition-transform duration-500"
                  src={service.img}
                  alt={service.title}
                />
              </div>
              <div className="relative p-6 pt-0">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white -mt-8 mb-4 shadow-md">
                  <i className={`fa ${service.icon} text-2xl`}></i>
                </div>
                <h4 className="text-xl font-semibold mb-3 text-gray-900">{service.title}</h4>
                <p className="text-gray-600 mb-3 leading-relaxed">
                  Stet stet justo dolor sed duo. Ut clita sea sit ipsum diam lorem diam.
                </p>
                <a href="#" className="text-sm font-medium text-blue-600 inline-flex items-center hover:text-blue-700 transition-colors">
                  Read More <i className="fa fa-arrow-right ml-2 text-xs"></i>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      {/* Service End */}

      {/* Feature/Why Choose Us Start */}
      <div className="w-full bg-gray-50 overflow-hidden py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7 }}
            >
              <h6 className="text-blue-600 font-semibold mb-2 tracking-wide uppercase text-sm">Why Choose Us!</h6>
              <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 leading-tight">
                Complete Commercial &amp; Residential Solar Systems
              </h1>
              <p className="text-gray-700 mb-8 leading-relaxed">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
                diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet
                lorem sit clita duo justo erat amet
              </p>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                className="grid grid-cols-2 gap-6"
              >
                {[
                  { icon: 'fa-check', top: 'Quality', bottom: 'Services' },
                  { icon: 'fa-user-check', top: 'Expert', bottom: 'Workers' },
                  { icon: 'fa-drafting-compass', top: 'Free', bottom: 'Consultation' },
                  { icon: 'fa-headphones', top: 'Customer', bottom: 'Support' },
                ].map((item, i) => (
                  <motion.div key={i} variants={cardItem} className="flex items-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 shrink-0">
                      <i className={`fa ${item.icon} text-white`}></i>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">{item.top}</p>
                      <h5 className="font-semibold text-gray-900">{item.bottom}</h5>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8 }}
              className="relative min-h-[320px] lg:min-h-[420px] rounded-xl overflow-hidden shadow-lg"
            >
              <img
                src={featureImg}
                alt="Features"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </motion.div>

          </div>
        </div>
      </div>
      {/* Feature End */}

      {/* Testimonial Start */}
      <div className="w-full py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="text-center mx-auto mb-14"
            style={{ maxWidth: "600px" }}
          >
            <h6 className="text-blue-600 font-semibold tracking-wide uppercase text-sm">Testimonial</h6>
            <h1 className="text-3xl font-bold mt-2 text-gray-900">What Our Clients Say!</h1>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((photo, i) => (
              <motion.div key={i} variants={cardItem} className="text-center pt-10">
                <div className="relative">
                  <img
                    src={photo}
                    alt="Client Testimonial"
                    className="w-20 h-20 rounded-full mx-auto mb-0 object-cover border-4 border-white shadow-md relative z-10 -mb-10"
                  />
                </div>
                <div className="bg-white rounded-xl p-6 pt-14 shadow-md h-full">
                  <i className="fa fa-quote-left text-blue-600 text-xl mb-3 block"></i>
                  <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                    Clita clita tempor justo dolor ipsum amet kasd amet duo justo duo duo
                    labore sed sed. Magna ut diam sit et amet stet eos sed clita erat
                    magna elitr erat sit sit erat at rebum justo sea clita.
                  </p>
                  <h5 className="font-semibold text-gray-900">Client Name</h5>
                  <span className="italic text-gray-500 text-sm">Profession</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      {/* Testimonial End */}

      <Footer />

      {/* Back to Top */}
      <motion.button
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 w-12 h-12 flex items-center justify-center rounded-full shadow-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 z-50"
        aria-label="Back to top"
      >
        <i className="fa-solid fa-arrow-up"></i>
      </motion.button>

    </div>
  );
}

export default Services;