import React from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Carousel from '../components/Carousel';
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

const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-[url("/bg_img.png")] bg-cover bg-center'>
      <Navbar />
      {/* <Header /> */}
      <div className='w-full'>

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

        <Carousel />


        {/* <!-- Feature Start --> */}

        <div className="max-w-7xl mx-auto py-12 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            <div className='shadow p-4 rounded'>
              <div className="flex items-center mb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 mr-4">
                  <i className="fa fa-users text-white"></i>
                </div>
                <h1 className="text-4xl font-bold">3453</h1>
              </div>
              <h5 className="text-lg font-semibold mb-2">Happy Customers</h5>
              <span className="text-gray-600">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit
              </span>
            </div>

            <div className='shadow p-4 rounded'>
              <div className="flex items-center mb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 mr-4">
                  <i className="fa fa-check text-white"></i>
                </div>
                <h1 className="text-4xl font-bold">4234</h1>
              </div>
              <h5 className="text-lg font-semibold mb-2">Project Done</h5>
              <span className="text-gray-600">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit
              </span>
            </div>

            <div className='shadow p-4 rounded'>
              <div className="flex items-center mb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 mr-4">
                  <i className="fa fa-award text-white"></i>
                </div>
                <h1 className="text-4xl font-bold">3123</h1>
              </div>
              <h5 className="text-lg font-semibold mb-2">Awards Win</h5>
              <span className="text-gray-600">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit
              </span>
            </div>

            <div className='shadow p-4 rounded'>
              <div className="flex items-center mb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 mr-4">
                  <i className="fa fa-users-cog text-white"></i>
                </div>
                <h1 className="text-4xl font-bold">1831</h1>
              </div>
              <h5 className="text-lg font-semibold mb-2">Expert Workers</h5>
              <span className="text-gray-600">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit
              </span>
            </div>

          </div>
        </div>

        {/* <!-- Feature Start --> */}


        {/* <!-- About Start --> */}

        <div className="w-full bg-gray-100 overflow-hidden my-12 p-3">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2">

              {/* Image Section */}
              <div className="relative min-h-[400px]">
                <img
                  src={aboutImg}
                  alt="About Us"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* Text Section */}
              <div className="py-12">
                <div className="lg:pl-12">
                  <h6 className="text-blue-600 font-semibold mb-2">About Us</h6>
                  <h1 className="text-3xl md:text-4xl font-bold mb-6">
                    25+ Years Experience In Solar & Renewable Energy Industry
                  </h1>

                  <p className="text-gray-700 mb-4">
                    Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
                    diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet
                    lorem sit clita duo justo erat amet
                  </p>

                  <p className="flex items-center mb-2">
                    <i className="fa fa-check-circle text-blue-600 mr-3"></i>
                    Diam dolor diam ipsum
                  </p>
                  <p className="flex items-center mb-2">
                    <i className="fa fa-check-circle text-blue-600 mr-3"></i>
                    Aliqu diam amet diam et eos
                  </p>
                  <p className="flex items-center mb-4">
                    <i className="fa fa-check-circle text-blue-600 mr-3"></i>
                    Tempor erat elitr rebum at clita
                  </p>

                  <a
                    href="#services"
                    className="inline-block mt-4 rounded-full bg-blue-600 px-8 py-3 text-white font-semibold hover:bg-blue-700 transition"
                  >
                    Explore More
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* <!-- About End --> */}


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


        {/* <!-- Team Start --> */}
        <div className="w-full py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div
              className="text-center mx-auto mb-12 wow fadeInUp"
              data-wow-delay="0.1s"
              style={{ maxWidth: "600px" }}
            >
              <h6 className="text-blue-600 font-semibold">Team Member</h6>
              <h1 className="text-3xl font-bold mt-2">Experienced Team Members</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Team Member 1 */}
              <div className="wow fadeInUp" data-wow-delay="0.1s">
                <div className="rounded overflow-hidden bg-white shadow">
                  <div className="flex">
                    <img
                      src={team1}
                      alt="Team Member"
                      className="w-3/4 object-cover"
                    />
                    <div className="w-1/4 flex flex-col items-center justify-start pt-3 space-y-3">
                      <a className="w-10 h-10 flex items-center justify-center rounded-full border border-blue-600 text-blue-600" href="">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a className="w-10 h-10 flex items-center justify-center rounded-full border border-blue-600 text-blue-600" href="">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a className="w-10 h-10 flex items-center justify-center rounded-full border border-blue-600 text-blue-600" href="">
                        <i className="fab fa-instagram"></i>
                      </a>
                    </div>
                  </div>
                  <div className="p-4">
                    <h5 className="font-semibold">Full Name</h5>
                    <span className="text-gray-500">Designation</span>
                  </div>
                </div>
              </div>

              {/* Team Member 2 */}
              <div className="wow fadeInUp" data-wow-delay="0.3s">
                <div className="rounded overflow-hidden bg-white shadow">
                  <div className="flex">
                    <img
                      src={team2}
                      alt="Team Member"
                      className="w-3/4 object-cover"
                    />
                    <div className="w-1/4 flex flex-col items-center justify-start pt-3 space-y-3">
                      <a className="w-10 h-10 flex items-center justify-center rounded-full border border-blue-600 text-blue-600" href="">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a className="w-10 h-10 flex items-center justify-center rounded-full border border-blue-600 text-blue-600" href="">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a className="w-10 h-10 flex items-center justify-center rounded-full border border-blue-600 text-blue-600" href="">
                        <i className="fab fa-instagram"></i>
                      </a>
                    </div>
                  </div>
                  <div className="p-4">
                    <h5 className="font-semibold">Full Name</h5>
                    <span className="text-gray-500">Designation</span>
                  </div>
                </div>
              </div>

              {/* Team Member 3 */}
              <div className="wow fadeInUp" data-wow-delay="0.5s">
                <div className="rounded overflow-hidden bg-white shadow">
                  <div className="flex">
                    <img
                      src={team3}
                      alt="Team Member"
                      className="w-3/4 object-cover"
                    />
                    <div className="w-1/4 flex flex-col items-center justify-start pt-3 space-y-3">
                      <a className="w-10 h-10 flex items-center justify-center rounded-full border border-blue-600 text-blue-600" href="">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a className="w-10 h-10 flex items-center justify-center rounded-full border border-blue-600 text-blue-600" href="">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a className="w-10 h-10 flex items-center justify-center rounded-full border border-blue-600 text-blue-600" href="">
                        <i className="fab fa-instagram"></i>
                      </a>
                    </div>
                  </div>
                  <div className="p-4">
                    <h5 className="font-semibold">Full Name</h5>
                    <span className="text-gray-500">Designation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Team End --> */}


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
    </div>
  );
}

export default Home;
