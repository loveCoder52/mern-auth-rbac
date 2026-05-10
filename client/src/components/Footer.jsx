import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import gallery1 from '../img/gallery-1.jpg';
import gallery2 from '../img/gallery-2.jpg';
import gallery3 from '../img/gallery-3.jpg';
import gallery4 from '../img/gallery-4.jpg';
import gallery5 from '../img/gallery-5.jpg';
import gallery6 from '../img/gallery-6.jpg';

const navLinks = [
  { to: '/',        label: 'Home' },
  { to: '/about',   label: 'About' },
  { to: '/service', label: 'Services' },
  { to: '/project', label: 'Project' },
  { to: '/contact', label: 'Contact' },
];

const socialLinks = [
  { icon: 'twitter',     url: 'https://twitter.com/yourusername',   label: 'Twitter' },
  { icon: 'facebook-f',  url: 'https://facebook.com/yourusername',  label: 'Facebook' },
  { icon: 'youtube',     url: 'https://youtube.com/@yourchannel',   label: 'YouTube' },
  { icon: 'linkedin-in', url: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
];

const galleryImages = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 border-t border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4 no-underline group">
              <span className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center text-gray-950 font-black group-hover:rotate-6 transition-transform duration-200">
                S
              </span>
              <span className="text-white text-xl font-bold tracking-tight">
                Solar<span className="text-amber-400">tec</span>
              </span>
            </Link>

            <p className="text-sm leading-relaxed mb-5">
              Powering a sustainable future with innovative solar & renewable energy solutions.
            </p>

            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <i className="fa fa-map-marker-alt text-amber-400 w-4"></i>
                123 Street, New York, USA
              </li>
              <li className="flex items-center gap-3">
                <i className="fa fa-phone-alt text-amber-400 w-4"></i>
                +012 345 67890
              </li>
              <li className="flex items-center gap-3">
                <i className="fa fa-envelope text-amber-400 w-4"></i>
                info@example.com
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-white font-semibold mb-5 tracking-wide">Quick Links</h5>
            <ul className="space-y-3">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      `text-sm transition-colors duration-200 ${
                        isActive ? 'text-amber-400' : 'hover:text-amber-400'
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Gallery */}
          <div>
            <h5 className="text-white font-semibold mb-5 tracking-wide">Project Gallery</h5>
            <div className="grid grid-cols-3 gap-2">
              {galleryImages.map((img, i) => (
                <div key={i} className="overflow-hidden rounded-lg aspect-square">
                  <img
                    src={img}
                    alt={`Gallery ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h5 className="text-white font-semibold mb-5 tracking-wide">Newsletter</h5>
            <p className="text-sm leading-relaxed mb-5">
              Subscribe to get the latest updates on renewable energy and solar solutions.
            </p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors"
              />
              <button className="w-full bg-amber-400 hover:bg-amber-300 text-gray-950 font-semibold text-sm py-2.5 rounded-lg transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>

        </div>

        {/* Divider */}
        <hr className="my-10 border-gray-800" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Social Icons */}
          <div className="flex gap-3">
            {socialLinks.map(({ icon, url, label }) => (
              <a
                key={icon}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-700 text-gray-400 hover:bg-amber-400 hover:border-amber-400 hover:text-gray-950 transition-all duration-200 hover:-translate-y-0.5"
              >
                <i className={`fab fa-${icon} text-sm`}></i>
              </a>
            ))}
          </div>

          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()}{' '}
            <Link to="/" className="text-gray-400 hover:text-amber-400 transition-colors">
              Solartec
            </Link>
            . All Rights Reserved.
          </p>

        </div>
      </div>
    </footer>
  );
}