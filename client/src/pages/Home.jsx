import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Carousel from '../components/Carousel';
import aboutImg from '../img/about.jpg'
import featureImg from '../img/feature.jpg'
import img1 from '../img/img-600x400-1.jpg'
import img2 from '../img/img-600x400-2.jpg'
import img3 from '../img/img-600x400-3.jpg'
import img4 from '../img/img-600x400-4.jpg'
import img5 from '../img/img-600x400-5.jpg'
import img6 from '../img/img-600x400-6.jpg'
import team1 from '../img/team-1.jpg'
import team2 from '../img/team-2.jpg'
import team3 from '../img/team-3.jpg'
import testimonial1 from '../img/testimonial-1.jpg'
import testimonial2 from '../img/testimonial-2.jpg'
import testimonial3 from '../img/testimonial-3.jpg'
import ProductList from './ProductList.jsx';
import { motion } from "framer-motion";
import Quote from './Quote.jsx';

const Home = () => {
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

  const projects = [
    { img: img6, tag: 'Solar Panels' },
    { img: img5, tag: 'Wind Turbines' },
    { img: img4, tag: 'Hydropower Plants' },
    { img: img3, tag: 'Solar Panels' },
    { img: img2, tag: 'Wind Turbines' },
    { img: img1, tag: 'Hydropower Plants' },
  ];

  const team = [team1, team2, team3];

  const testimonials = [testimonial1, testimonial2, testimonial3];

  const filters = ['All', 'Solar Panels', 'Wind Turbines', 'Hydropower Plants'];

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-[url("/bg_img.png")] bg-cover bg-center'>
      <Navbar />

      <div className='w-full'>

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

        <Carousel />

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

          <ProductList />
        </div>
        {/* Projects End */}

        {/* Quote Start */}
        <Quote />
        {/* Quote End */}

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
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {team.map((photo, i) => (
                <motion.div
                  key={i}
                  variants={cardItem}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="flex">
                    <img
                      src={photo}
                      alt="Team Member"
                      className="w-3/4 h-64 object-cover"
                    />
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
    </div>
  );
}

export default Home;