import React from 'react';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import carousel1 from '../img/carousel-1.jpg'
import quoteImg from '../img/quote.jpg'
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

function Project() {
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

  const projects = [
    { img: img6, tag: 'Solar Panels' },
    { img: img5, tag: 'Wind Turbines' },
    { img: img4, tag: 'Hydropower Plants' },
    { img: img3, tag: 'Solar Panels' },
    { img: img2, tag: 'Wind Turbines' },
    { img: img1, tag: 'Hydropower Plants' },
  ];

  const testimonials = [testimonial1, testimonial2, testimonial3];

  const filters = ['All', 'Solar Panels', 'Wind Turbines', 'Hydropower Plants'];

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
            Projects
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
              <li className="text-white font-medium">Projects</li>
            </ol>
          </motion.nav>
        </div>
      </div>
      {/* Page header end */}

      {/* Projects Start */}
      <div className="max-w-7xl mx-auto py-16 px-4">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-xl mx-auto mb-10"
        >
          <h6 className="text-blue-600 font-semibold tracking-wide uppercase text-sm">Our Projects</h6>
          <h1 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900">
            Visit Our Latest Solar And Renewable Energy Projects
          </h1>
        </motion.div>

        {/* Filters */}
        <div className="text-center mb-12">
          <ul className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {filters.map((filter, i) => (
              <li
                key={filter}
                className={`cursor-pointer font-medium px-4 py-2 rounded-full transition-colors ${
                  i === 0
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                {filter}
              </li>
            ))}
          </ul>
        </div>

        {/* Portfolio Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, i) => (
            <motion.div key={i} variants={cardItem} className="group">
              <div className="relative rounded-xl overflow-hidden shadow-md">
                <img
                  src={project.img}
                  alt={project.tag}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a href="#" className="flex h-12 w-12 items-center justify-center rounded-full border border-white text-white hover:bg-white hover:text-blue-600 transition-colors">
                    <i className="fa fa-eye"></i>
                  </a>
                  <a href="#" className="flex h-12 w-12 items-center justify-center rounded-full border border-white text-white hover:bg-white hover:text-blue-600 transition-colors">
                    <i className="fa fa-link"></i>
                  </a>
                </div>
              </div>
              <div className="pt-4">
                <p className="text-blue-600 mb-1 font-medium">{project.tag}</p>
                <hr className="w-16 border-blue-600 mb-2" />
                <h5 className="font-semibold text-gray-900">
                  We Are pioneers of solar &amp; renewable energy industry
                </h5>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      {/* Projects End */}

      {/* Quote Start */}
      <div id="quote" className="w-full overflow-hidden py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-xl overflow-hidden shadow-xl">

            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7 }}
              className="relative min-h-[320px] lg:min-h-[480px]"
            >
              <img
                src={quoteImg}
                alt="Get Quote"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7 }}
              className="py-12 px-6 lg:px-12 bg-white"
            >
              <h6 className="text-blue-600 font-semibold tracking-wide uppercase text-sm">Free Quote</h6>
              <h1 className="text-3xl font-bold mb-4 text-gray-900">Get A Free Quote</h1>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit,
                sed stet lorem sit clita duo justo erat amet
              </p>

              <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="h-[52px] w-full rounded-lg border border-gray-200 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="h-[52px] w-full rounded-lg border border-gray-200 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                />
                <input
                  type="text"
                  placeholder="Your Mobile"
                  className="h-[52px] w-full rounded-lg border border-gray-200 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                />
                <select
                  className="h-[52px] w-full rounded-lg border border-gray-200 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow text-gray-700"
                  defaultValue=""
                >
                  <option value="" disabled>Select A Service</option>
                  <option value="1">Service 1</option>
                  <option value="2">Service 2</option>
                  <option value="3">Service 3</option>
                </select>
                <textarea
                  placeholder="Special Note"
                  rows={4}
                  className="col-span-1 sm:col-span-2 w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow resize-none"
                />
                <div className="col-span-1 sm:col-span-2">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-blue-600 text-white rounded-full px-8 py-3 font-medium hover:bg-blue-700 transition-colors"
                  >
                    Submit
                  </motion.button>
                </div>
              </form>
            </motion.div>

          </div>
        </div>
      </div>
      {/* Quote End */}

      {/* Testimonial Start */}
      <div className="w-full py-16 bg-gray-50">
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

export default Project;