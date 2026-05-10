import React from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import carousel1 from '../img/carousel-1.jpg'
import aboutImg from '../img/about.jpg'
import team1 from '../img/team-1.jpg'
import team2 from '../img/team-2.jpg'
import team3 from '../img/team-3.jpg'
import gallery1 from '../img/gallery-1.jpg'
import gallery2 from '../img/gallery-2.jpg'
import gallery3 from '../img/gallery-3.jpg'
import gallery4 from '../img/gallery-4.jpg'
import gallery5 from '../img/gallery-5.jpg'
import gallery6 from '../img/gallery-6.jpg'
import Footer from '../components/Footer';

function About() {

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
            About Us
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
              <li className="text-white font-medium">About</li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page header end */}

      {/* Feature Start */}
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className='shadow-2xs p-4 rounded'>
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

          <div className='shadow-2xs p-4 rounded'>
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

          <div className='shadow-2xs p-4 rounded'>
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

          <div className='shadow-2xs p-4 rounded'>
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
      {/* Feature End */}

      {/* About Start */}
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
                  onClick={() => navigate("/service")}
                  className="bg-blue-600 text-white px-6 py-3 rounded-full
                   hover:bg-blue-700 transition"
                >
                  Explore More
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
      {/* About End */}

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

export default About;
