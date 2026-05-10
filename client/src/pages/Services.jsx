import React from 'react';
import Footer from '../components/Footer';
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

function Services() {
  const navigate = useNavigate();
  return (
    <div>
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
            Services
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
              <li className="text-white font-medium">Services</li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page header end */}

      {/* <!-- Service Start --> */}
      <div id="services" className="max-w-7xl mx-auto py-12 px-4">
        {/* Heading */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <h6 className="text-blue-600 font-semibold mb-2">Our Services</h6>
          <h1 className="text-3xl md:text-4xl font-bold">
            We Are Pioneers In The World Of Renewable Energy
          </h1>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Service Item */}
          <div className="rounded overflow-hidden shadow">
            <img className="w-full" src={img1} alt="Solar Panel Service" />
            <div className="relative p-6 pt-0">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white -mt-8 mb-4">
                <i className="fa fa-solar-panel text-2xl"></i>
              </div>
              <h4 className="text-xl font-semibold mb-3">Solar Panels</h4>
              <p className="text-gray-600 mb-3">
                Stet stet justo dolor sed duo. Ut clita sea sit ipsum diam lorem diam.
              </p>
              <a href="" className="text-sm font-medium text-blue-600 inline-flex items-center decoration-0">
                Read More <i className="fa fa-arrow-right ml-2"></i>
              </a>
              <div className="mt-4">
                {/* <button className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
                  Buy Now
                </button> */}
              </div>
            </div>
          </div>

          {/* Service Item */}
          <div className="rounded overflow-hidden shadow">
            <img className="w-full" src={img2} alt="Wind Turbine Service" />
            <div className="relative p-6 pt-0">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white -mt-8 mb-4">
                <i className="fa fa-wind text-2xl"></i>
              </div>
              <h4 className="text-xl font-semibold mb-3">Wind Turbines</h4>
              <p className="text-gray-600 mb-3">
                Stet stet justo dolor sed duo. Ut clita sea sit ipsum diam lorem diam.
              </p>
              <a href="" className="text-sm font-medium text-blue-600 inline-flex items-center">
                Read More <i className="fa fa-arrow-right ml-2"></i>
              </a>
            </div>
          </div>

          {/* Service Item */}
          <div className="rounded overflow-hidden shadow">
            <img className="w-full" src={img3} alt="Hydropower Service" />
            <div className="relative p-6 pt-0">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white -mt-8 mb-4">
                <i className="fa fa-lightbulb text-2xl"></i>
              </div>
              <h4 className="text-xl font-semibold mb-3">Hydropower Plants</h4>
              <p className="text-gray-600 mb-3">
                Stet stet justo dolor sed duo. Ut clita sea sit ipsum diam lorem diam.
              </p>
              <a href="" className="text-sm font-medium text-blue-600 inline-flex items-center">
                Read More <i className="fa fa-arrow-right ml-2"></i>
              </a>
            </div>
          </div>

          {/* Service Item */}
          <div className="rounded overflow-hidden shadow">
            <img className="w-full" src={img4} alt="Solar Energy" />
            <div className="relative p-6 pt-0">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white -mt-8 mb-4">
                <i className="fa fa-solar-panel text-2xl"></i>
              </div>
              <h4 className="text-xl font-semibold mb-3">Solar Panels</h4>
              <p className="text-gray-600 mb-3">
                Stet stet justo dolor sed duo. Ut clita sea sit ipsum diam lorem diam.
              </p>
              <a href="" className="text-sm font-medium text-blue-600 inline-flex items-center">
                Read More <i className="fa fa-arrow-right ml-2"></i>
              </a>
              <div className="mt-4">
                {/* <button className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
                  Buy Now
                </button> */}
              </div>
            </div>
          </div>

          {/* Service Item */}
          <div className="rounded overflow-hidden shadow">
            <img className="w-full" src={img5} alt="" />
            <div className="relative p-6 pt-0">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white -mt-8 mb-4">
                <i className="fa fa-wind text-2xl"></i>
              </div>
              <h4 className="text-xl font-semibold mb-3">Wind Turbines</h4>
              <p className="text-gray-600 mb-3">
                Stet stet justo dolor sed duo. Ut clita sea sit ipsum diam lorem diam.
              </p>
              <a href="" className="text-sm font-medium text-blue-600 inline-flex items-center">
                Read More <i className="fa fa-arrow-right ml-2"></i>
              </a>
            </div>
          </div>

          {/* Service Item */}
          <div className="rounded overflow-hidden shadow">
            <img className="w-full" src={img6} alt="Renewable Energy" />
            <div className="relative p-6 pt-0">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white -mt-8 mb-4">
                <i className="fa fa-lightbulb text-2xl"></i>
              </div>
              <h4 className="text-xl font-semibold mb-3">Hydropower Plants</h4>
              <p className="text-gray-600 mb-3">
                Stet stet justo dolor sed duo. Ut clita sea sit ipsum diam lorem diam.
              </p>
              <a href="" className="text-sm font-medium text-blue-600 inline-flex items-center">
                Read More <i className="fa fa-arrow-right ml-2"></i>
              </a>
            </div>
          </div>

        </div>
      </div>
      {/* <!-- Service End --> */}


      {/* <!-- Feature Start --> */}
      <div className="w-full bg-gray-100 overflow-hidden my-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Text Section */}
            <div className="py-12">
              <div className="lg:pl-12">
                <h6 className="text-blue-600 font-semibold mb-2">Why Choose Us!</h6>
                <h1 className="text-3xl md:text-4xl font-bold mb-6">
                  Complete Commercial & Residential Solar Systems
                </h1>
                <p className="text-gray-700 mb-8">
                  Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
                  diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet
                  lorem sit clita duo justo erat amet
                </p>

                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600">
                      <i className="fa fa-check text-white"></i>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Quality</p>
                      <h5 className="font-semibold">Services</h5>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600">
                      <i className="fa fa-user-check text-white"></i>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Expert</p>
                      <h5 className="font-semibold">Workers</h5>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600">
                      <i className="fa fa-drafting-compass text-white"></i>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Free</p>
                      <h5 className="font-semibold">Consultation</h5>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600">
                      <i className="fa fa-headphones text-white"></i>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Customer</p>
                      <h5 className="font-semibold">Support</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Section */}
            <div className="relative min-h-[400px]">
              <img
                src={featureImg}
                alt="Features"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

          </div>
        </div>
      </div>
      {/* <!-- Feature End --> */}

      {/* <!-- Testimonial Start --> */}
      <div className="w-full py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mx-auto mb-12 wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ maxWidth: "600px" }}
          >
            <h6 className="text-blue-600 font-semibold">Testimonial</h6>
            <h1 className="text-3xl font-bold mt-2">What Our Clients Say!</h1>
          </div>

          <div className="flex gap-6 overflow-x-auto wow fadeInUp" data-wow-delay="0.1s">

            {/* Testimonial 1 */}
            <div className="min-w-[300px] text-center">
              <div className="relative">
                <img
                  src={testimonial1}
                  alt="Client Testimonial"
                  className="w-24 h-24 rounded-full mx-auto mb-6 object-cover"
                />
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center absolute left-1/2 -translate-x-1/2 -bottom-2">
                  <i className="fa fa-quote-left text-white"></i>
                </div>
              </div>
              <div className="bg-white rounded p-6 shadow text-center">
                <p className="text-gray-600 mb-4">
                  Clita clita tempor justo dolor ipsum amet kasd amet duo justo duo duo
                  labore sed sed. Magna ut diam sit et amet stet eos sed clita erat
                  magna elitr erat sit sit erat at rebum justo sea clita.
                </p>
                <h5 className="font-semibold">Client Name</h5>
                <span className="italic text-gray-500">Profession</span>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="min-w-[300px] text-center">
              <div className="relative">
                <img
                  src={testimonial2}
                  alt="Client Testimonial"
                  className="w-24 h-24 rounded-full mx-auto mb-6 object-cover"
                />
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center absolute left-1/2 -translate-x-1/2 -bottom-2">
                  <i className="fa fa-quote-left text-white"></i>
                </div>
              </div>
              <div className="bg-white rounded p-6 shadow text-center">
                <p className="text-gray-600 mb-4">
                  Clita clita tempor justo dolor ipsum amet kasd amet duo justo duo duo
                  labore sed sed. Magna ut diam sit et amet stet eos sed clita erat
                  magna elitr erat sit sit erat at rebum justo sea clita.
                </p>
                <h5 className="font-semibold">Client Name</h5>
                <span className="italic text-gray-500">Profession</span>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="min-w-[300px] text-center">
              <div className="relative">
                <img
                  src={testimonial3}
                  alt="Client Testimonial"
                  className="w-24 h-24 rounded-full mx-auto mb-6 object-cover"
                />
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center absolute left-1/2 -translate-x-1/2 -bottom-2">
                  <i className="fa fa-quote-left text-white"></i>
                </div>
              </div>
              <div className="bg-white rounded p-6 shadow text-center">
                <p className="text-gray-600 mb-4">
                  Clita clita tempor justo dolor ipsum amet kasd amet duo justo duo duo
                  labore sed sed. Magna ut diam sit et amet stet eos sed clita erat
                  magna elitr erat sit sit erat at rebum justo sea clita.
                </p>
                <h5 className="font-semibold">Client Name</h5>
                <span className="italic text-gray-500">Profession</span>
              </div>
            </div>

          </div>
        </div>
      </div>
      {/* <!-- Testimonial End --> */}

      <Footer />

      {/* <!-- Back to Top --> */}
      <a
        href="#"
        className="fixed bottom-6 right-6 w-12 h-12 flex items-center justify-center rounded-full shadow-lg text-white bg-blue-600 hover:bg-blue-700 transition duration-300 no-underline"
      >
        <i class="fa-solid fa-arrow-up"></i>
      </a>
    </div>
  );
}

export default Services;
