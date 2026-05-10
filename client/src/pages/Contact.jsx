import React from "react";
import Footer from "../components/Footer.jsx";
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
// Import images
import carousel1 from '../img/carousel-1.jpg'
import carousel2 from '../img/carousel-2.jpg'
import carousel3 from '../img/carousel-3.jpg'
import aboutImg from '../img/about.jpg'
import featureImg from '../img/feature.jpg'
import quoteImg from '../img/quote.jpg'
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
import gallery1 from '../img/gallery-1.jpg'
import gallery2 from '../img/gallery-2.jpg'
import gallery3 from '../img/gallery-3.jpg'
import gallery4 from '../img/gallery-4.jpg'
import gallery5 from '../img/gallery-5.jpg'
import gallery6 from '../img/gallery-6.jpg'

const Contact = () => {

  const navigate = useNavigate();
  return (
    <>
    <Navbar />
      {/* Topbar starts */}
      <div className="hidden lg:flex bg-gray-900 text-gray-300 text-sm">
        <div className="max-w-7xl mx-auto flex justify-between w-full px-6 py-2">
          <div className="flex gap-6">
            <span>📍 123 Street, New York, USA</span>
            <span>⏰ Mon - Fri : 09.00 AM - 09.00 PM</span>
          </div>
          <div className="flex gap-4">
            <span>📞 +012 345 6789</span>
            <div className="flex gap-3">
              <i className="fab fa-facebook-f"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-linkedin-in"></i>
              <i className="fab fa-instagram"></i>
            </div>
          </div>
        </div>
      </div>
      {/* Topbar ends*/}

      {/* Page header start */}
      <div
        className="relative w-full py-24 mb-16 bg-center bg-cover"
        style={{ backgroundImage: `url(${carousel1})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-6">
          <h1
            className="text-5xl md:text-6xl font-bold text-white mb-4 ml-7
                             slide-down"
          >
            Contact
          </h1>

          {/* Breadcrumb */}
          <nav aria-label="breadcrumb">
            <ol
              className="flex flex-wrap items-center gap-2 text-sm
                               animate-slideDown delay-150"
            >
              <li>
                <a
                  onClick={() => navigate("/")}
                  className="text-white/80 hover:text-white transition"
                >
                  Home
                </a>
              </li>
              <li className="text-white/60">/</li>
              <li className="text-white font-medium">Contact</li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page header end */}

      {/* Contact Section */}
      <section className="bg-gray-100 py-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 px-6">

          {/* Contact Form */}
          <div className="shadow p-3 rounded">
            <h6 className="text-blue-600 font-semibold mb-2">Contact Us</h6>
            <h2 className="text-3xl font-bold mb-4">
              Feel Free To Contact Us
            </h2>
            <p className="text-gray-600 mb-8">
              The contact form is currently inactive. You can integrate it with
              backend later.
            </p>

            <form className="grid gap-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="p-4 border rounded"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="p-4 border rounded"
                />
              </div>

              <input
                type="text"
                placeholder="Subject"
                className="p-4 border rounded"
              />

              <textarea
                placeholder="Message"
                className="p-4 border rounded h-32"
              ></textarea>

              <button className="bg-blue-600 text-white px-8 py-3 rounded-full w-fit">
                Send Message
              </button>
            </form>
          </div>

          {/* Google Map */}
          <div className="h-[400px]">
            <iframe
              className="w-full h-full rounded"
              loading="lazy"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001156.4288297426!2d-78.01371936852176!3d42.72876761954724"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer Start */}
      <Footer />
      {/* Footer End */}
      
      {/* <!-- Back to Top --> */}
      <a
        href="#"
        className="fixed bottom-6 right-6 w-12 h-12 flex items-center justify-center rounded-full shadow-lg text-white bg-blue-600 hover:bg-blue-700 transition duration-300 no-underline"
      >
        <i class="fa-solid fa-arrow-up"></i>
      </a>
    </>
  );
};

export default Contact;
