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

function Project() {
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
            Projects
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
              <li className="text-white font-medium">Projects</li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page header end */}

      {/* <!-- Projects Start --> */}
      <div className="max-w-7xl mx-auto py-12 px-4">
        {/* Heading */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <h6 className="text-blue-600 font-semibold">Our Projects</h6>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">
            Visit Our Latest Solar And Renewable Energy Projects
          </h1>
        </div>

        {/* Filters */}
        <div className="text-center mb-12">
          <ul className="flex flex-wrap justify-center gap-4">
            <li className="cursor-pointer font-medium text-blue-600">All</li>
            <li className="cursor-pointer font-medium text-gray-700">Solar Panels</li>
            <li className="cursor-pointer font-medium text-gray-700">Wind Turbines</li>
            <li className="cursor-pointer font-medium text-gray-700">
              Hydropower Plants
            </li>
          </ul>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Item 1 */}
          <div>
            <div className="relative rounded overflow-hidden">
              <img src={img6} alt="Renewable Energy" className="w-full" />
              <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/50 opacity-0 hover:opacity-100 transition">
                <a className="flex h-12 w-12 items-center justify-center rounded-full border border-white text-white">
                  <i className="fa fa-eye"></i>
                </a>
                <a className="flex h-12 w-12 items-center justify-center rounded-full border border-white text-white">
                  <i className="fa fa-link"></i>
                </a>
              </div>
            </div>
            <div className="pt-4">
              <p className="text-blue-600 mb-1">Solar Panels</p>
              <hr className="w-16 border-blue-600 mb-2" />
              <h5 className="font-semibold">
                We Are pioneers of solar & renewable energy industry
              </h5>
            </div>
          </div>

          {/* Item 2 */}
          <div>
            <div className="relative rounded overflow-hidden">
              <img src={img5} alt="Wind Energy" className="w-full" />
              <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/50 opacity-0 hover:opacity-100 transition">
                <a className="flex h-12 w-12 items-center justify-center rounded-full border border-white text-white">
                  <i className="fa fa-eye"></i>
                </a>
                <a className="flex h-12 w-12 items-center justify-center rounded-full border border-white text-white">
                  <i className="fa fa-link"></i>
                </a>
              </div>
            </div>
            <div className="pt-4">
              <p className="text-blue-600 mb-1">Wind Turbines</p>
              <hr className="w-16 border-blue-600 mb-2" />
              <h5 className="font-semibold">
                We Are pioneers of solar & renewable energy industry
              </h5>
            </div>
          </div>

          {/* Item 3 */}
          <div>
            <div className="relative rounded overflow-hidden">
              <img src={img4} alt="Solar Energy" className="w-full" />
              <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/50 opacity-0 hover:opacity-100 transition">
                <a className="flex h-12 w-12 items-center justify-center rounded-full border border-white text-white">
                  <i className="fa fa-eye"></i>
                </a>
                <a className="flex h-12 w-12 items-center justify-center rounded-full border border-white text-white">
                  <i className="fa fa-link"></i>
                </a>
              </div>
            </div>
            <div className="pt-4">
              <p className="text-blue-600 mb-1">Hydropower Plants</p>
              <hr className="w-16 border-blue-600 mb-2" />
              <h5 className="font-semibold">
                We Are pioneers of solar & renewable energy industry
              </h5>
            </div>
          </div>

          {/* Item 4 */}
          <div>
            <div className="relative rounded overflow-hidden">
              <img src={img3} alt="Hydropower Service" className="w-full" />
              <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/50 opacity-0 hover:opacity-100 transition">
                <a className="flex h-12 w-12 items-center justify-center rounded-full border border-white text-white">
                  <i className="fa fa-eye"></i>
                </a>
                <a className="flex h-12 w-12 items-center justify-center rounded-full border border-white text-white">
                  <i className="fa fa-link"></i>
                </a>
              </div>
            </div>
            <div className="pt-4">
              <p className="text-blue-600 mb-1">Solar Panels</p>
              <hr className="w-16 border-blue-600 mb-2" />
              <h5 className="font-semibold">
                We Are pioneers of solar & renewable energy industry
              </h5>
            </div>
          </div>

          {/* Item 5 */}
          <div>
            <div className="relative rounded overflow-hidden">
              <img src={img2} alt="Wind Turbine Service" className="w-full" />
              <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/50 opacity-0 hover:opacity-100 transition">
                <a className="flex h-12 w-12 items-center justify-center rounded-full border border-white text-white">
                  <i className="fa fa-eye"></i>
                </a>
                <a className="flex h-12 w-12 items-center justify-center rounded-full border border-white text-white">
                  <i className="fa fa-link"></i>
                </a>
              </div>
            </div>
            <div className="pt-4">
              <p className="text-blue-600 mb-1">Wind Turbines</p>
              <hr className="w-16 border-blue-600 mb-2" />
              <h5 className="font-semibold">
                We Are pioneers of solar & renewable energy industry
              </h5>
            </div>
          </div>

          {/* Item 6 */}
          <div>
            <div className="relative rounded overflow-hidden">
              <img src={img1} alt="Solar Panel Service" className="w-full" />
              <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/50 opacity-0 hover:opacity-100 transition">
                <a className="flex h-12 w-12 items-center justify-center rounded-full border border-white text-white">
                  <i className="fa fa-eye"></i>
                </a>
                <a className="flex h-12 w-12 items-center justify-center rounded-full border border-white text-white">
                  <i className="fa fa-link"></i>
                </a>
              </div>
            </div>
            <div className="pt-4">
              <p className="text-blue-600 mb-1">Hydropower Plants</p>
              <hr className="w-16 border-blue-600 mb-2" />
              <h5 className="font-semibold">
                We Are pioneers of solar & renewable energy industry
              </h5>
            </div>
          </div>

        </div>
      </div>
      {/* <!-- Projects End --> */}


      {/* <!-- Quote Start --> */}
      <div
        id="quote"
        className="w-full overflow-hidden my-12 lg:px-0"
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

            {/* Image Section */}
            <div
              className="relative min-h-[400px] wow fadeIn"
              data-wow-delay="0.1s"
            >
              <img
                src={quoteImg}
                alt="Get Quote"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Form Section */}
            <div
              className="py-12 wow fadeIn"
              data-wow-delay="0.5s"
            >
              <div className="lg:p-12 lg:pr-0">
                <h6 className="text-blue-600 font-semibold">Free Quote</h6>
                <h1 className="text-3xl font-bold mb-4">Get A Free Quote</h1>
                <p className="text-gray-600 mb-6">
                  Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                  Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit,
                  sed stet lorem sit clita duo justo erat amet
                </p>

                <form>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="h-[55px] w-full rounded border-0 px-4 focus:outline-none shadow-2xs"
                    />

                    <input
                      type="email"
                      placeholder="Your Email"
                      className="h-[55px] w-full rounded border-0 px-4 focus:outline-none shadow-2xs"
                    />

                    <input
                      type="text"
                      placeholder="Your Mobile"
                      className="h-[55px] w-full rounded border-0 px-4 focus:outline-none shadow-2xs"
                    />

                    <select
                      className="h-[55px] w-full rounded border-0 px-4 focus:outline-none shadow-2xs"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select A Service
                      </option>
                      <option value="1">Service 1</option>
                      <option value="2">Service 2</option>
                      <option value="3">Service 3</option>
                    </select>

                    <textarea
                      placeholder="Special Note"
                      className="col-span-1 sm:col-span-2 w-full rounded border-0 px-4 py-3 focus:outline-none shadow-2xs"
                    />

                    <div className="col-span-1 sm:col-span-2">
                      <button
                        type="submit"
                        className="bg-blue-600 text-white rounded-full px-7 py-3 rounded hover:bg-blue-700 transition"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
      {/* <!-- Quote End --> */}

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
    </div>
  );
}

export default Project;
