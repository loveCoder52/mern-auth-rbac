import React from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import carousel1 from '../img/carousel-1.jpg'
import aboutImg from '../img/about.jpg'
import team1 from '../img/team-1.jpg'
import team2 from '../img/team-2.jpg'
import team3 from '../img/team-3.jpg'
import Footer from '../components/Footer';
import { motion } from "framer-motion";

function About() {

  const navigate = useNavigate();

  // ---- Reusable animation variants ----
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
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

  const team = [team1, team2, team3];

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
            About Us
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
              <li className="text-white font-medium">About</li>
            </ol>
          </motion.nav>
        </div>
      </div>
      {/* Page header end */}

      {/* Feature / Stats Start */}
      <div className="max-w-7xl mx-auto py-16 px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { icon: 'fa-users', value: '3453', label: 'Happy Customers' },
            { icon: 'fa-check', value: '4234', label: 'Project Done' },
            { icon: 'fa-award', value: '3123', label: 'Awards Win' },
            { icon: 'fa-users-cog', value: '1831', label: 'Expert Workers' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={cardItem}
              whileHover={{ y: -8, scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="bg-white shadow-md p-6 rounded-xl hover:shadow-xl transition-shadow cursor-default"
            >
              <div className="flex items-center mb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 mr-4 shrink-0">
                  <i className={`fa ${stat.icon} text-white text-xl`}></i>
                </div>
                <h1 className="text-4xl font-bold text-gray-900">{stat.value}</h1>
              </div>
              <h5 className="text-lg font-semibold mb-2 text-gray-900">{stat.label}</h5>
              <span className="text-gray-600 text-sm leading-relaxed">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
      {/* Feature End */}

      {/* About Start */}
      <div className="w-full bg-gradient-to-b from-gray-50 to-white overflow-hidden py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8 }}
              className="relative min-h-[320px] lg:min-h-[420px] rounded-xl overflow-hidden shadow-lg"
            >
              <img
                src={aboutImg}
                alt="About Us"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7 }}
            >
              <h6 className="text-blue-600 font-semibold mb-2 tracking-wide uppercase text-sm">About Us</h6>
              <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 leading-tight">
                25+ Years Experience In Solar &amp; Renewable Energy Industry
              </h1>

              <p className="text-gray-700 mb-5 leading-relaxed">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
                diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet
                lorem sit clita duo justo erat amet
              </p>

              <ul className="space-y-3 mb-6">
                {[
                  'Diam dolor diam ipsum',
                  'Aliqu diam amet diam et eos',
                  'Tempor erat elitr rebum at clita',
                ].map((text, i) => (
                  <li key={i} className="flex items-center text-gray-700">
                    <i className="fa fa-check-circle text-blue-600 mr-3"></i>
                    {text}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => navigate("/service")}
                className="bg-blue-600 text-white px-7 py-3 rounded-full font-medium
                 hover:bg-blue-700 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                Explore More
              </button>
            </motion.div>

          </div>
        </div>
      </div>
      {/* About End */}

      {/* Team Start */}
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
            <h6 className="text-blue-600 font-semibold tracking-wide uppercase text-sm">Team Member</h6>
            <h1 className="text-3xl font-bold mt-2 text-gray-900">Experienced Team Members</h1>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {team.map((photo, i) => (
              <motion.div
                key={i}
                variants={cardItem}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                className="rounded-xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-shadow"
              >
                <div className="flex">
                  <div className="overflow-hidden w-3/4">
                    <img
                      src={photo}
                      alt="Team Member"
                      className="w-full h-64 object-cover hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="w-1/4 flex flex-col items-center justify-center gap-3 bg-gray-50">
                    {['facebook-f', 'twitter', 'instagram'].map((icon) => (
                      <a
                        key={icon}
                        href="#"
                        className="w-9 h-9 flex items-center justify-center rounded-full border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
                      >
                        <i className={`fab fa-${icon}`}></i>
                      </a>
                    ))}
                  </div>
                </div>
                <div className="p-4">
                  <h5 className="font-semibold text-gray-900">Full Name</h5>
                  <span className="text-gray-500 text-sm">Designation</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      {/* Team End */}

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

export default About;