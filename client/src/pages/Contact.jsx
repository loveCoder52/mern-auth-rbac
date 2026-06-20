import React from "react";
import Footer from "../components/Footer.jsx";
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import carousel1 from '../img/carousel-1.jpg'
import { motion } from "framer-motion";

const Contact = () => {

  const navigate = useNavigate();

  // ---- Reusable animation variants ----
  const fadeLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <>
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
            Contact
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
              <li className="text-white font-medium">Contact</li>
            </ol>
          </motion.nav>
        </div>
      </div>
      {/* Page header end */}

      {/* Contact Section */}
      <section className="bg-gray-100 py-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 px-6">

          {/* Contact Form */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="bg-white shadow-md p-8 rounded-xl"
          >
            <h6 className="text-blue-600 font-semibold mb-2 tracking-wide uppercase text-sm">Contact Us</h6>
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              Feel Free To Contact Us
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Have a question about solar, wind, or hydropower installs? Send
              us a message and our team will get back to you shortly.
            </p>

            <form className="grid gap-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                />
              </div>

              <input
                type="text"
                placeholder="Subject"
                className="p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              />

              <textarea
                placeholder="Message"
                rows={5}
                className="p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow resize-none"
              ></textarea>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-blue-600 text-white px-8 py-3 rounded-full w-fit font-medium hover:bg-blue-700 transition-colors"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>

          {/* Google Map */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="h-[400px] rounded-xl overflow-hidden shadow-md"
          >
            <iframe
              className="w-full h-full"
              loading="lazy"
              title="Our location on Google Maps"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001156.4288297426!2d-78.01371936852176!3d42.72876761954724"
            ></iframe>
          </motion.div>
        </div>
      </section>

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

    </>
  );
};

export default Contact;