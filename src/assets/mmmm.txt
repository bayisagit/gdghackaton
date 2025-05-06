import React from 'react';
import { Link } from 'react-router-dom';
import contactImage from '../assets/customer-service.png';
import NavBar from "../components/NavBar";
import Footer from '../components/Footer';

// SVG Icons as React Components
const EmailIcon = () => (
  <svg className="w-6 h-6 text-blue-600 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-6 h-6 text-blue-600 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
  </svg>
);

const TelegramIcon = () => (
  <svg className="w-6 h-6 text-blue-600 mr-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.96 5.5c-.25 2.5-1.86 11.5-1.96 12-1 2-1.5 1.5-2 1-.5-.5 0-2.5-.5-3-.5-1-2.5-3-3.5-5-.5-1 2-1 2.5-1.5 4-.5 2.5-1 3.5-2 3-.5 0-1.5-.5-2-1-.5-.5-.5-1-.5-2 0-1.5 1-3 1-4.5.5-2 2-4 2.5-6s1-4 2-5c1-1 2.5-1.5 4-1.5 1.5 0 2.5.5 3.5 1 1 .5 2 1.5 2.5 2.5.5 1 .5 2.5.5 3.5 0 1-.5 2-1 2.5-.5.5-1.5 1-2 1-.5 0-1-.5-1.5-1-.5-.5-1-1-1.5-1.5-.5-.5-1-1-1.5-1-.5 0-1 .5-1 1 0 .5.5 1.5 0 2-.5.5-1 0-1.5-.5-.5-.5-1-1.5-1-2 0-.5.5-1.5 1-2 .5-.5 1-1 1.5-1.5.5-.5 1-1 1.5-1.5.5-.5 1-1 1.5-1z"></path>
  </svg>
);

const TikTokIcon = () => (
  <svg className="w-6 h-6 text-blue-600 mr-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1.19-.1A6.87 6.87 0 003 16.27a6.87 6.87 0 0012.48-4l.02-1.52a8.17 8.17 0 003.87 1V8.25a4.85 4.85 0 01-.78-1.56zM16.82 8a12 12 0 01-2.82-1v-.26A8.31 8.31 0 0016.82 8z"></path>
  </svg>
);

const ContactUs = () => {
  return (<div>
    <div className="min-h-screen bg-white flex items-center justify-center">
      {/* Main Content */}<NavBar/>
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-12 md:px-20 md:py-16 max-w-7xl">
        {/* Image Section - 50% Width */}
        <div className="w-full md:w-1/2 h-80 md:h-96 mb-8 md:mb-0">
          <img
            src={contactImage}
            alt="MediHelp Contact Illustration"
            className="w-full h-full object-cover rounded-lg shadow-2xl border border-gray-100 transition-transform duration-300 hover:scale-102"
            loading="lazy"
          />
        </div>

        {/* Contact Info Section - 50% Width, Vertically Centered */}
        <div className="w-full md:w-1/2 md:pl-12 flex flex-col justify-center min-h-[24rem]">
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6 leading-tight">
            Contact MediHelp
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-prose">
            We are here to assist you. Please feel free to reach out to MediHelp through the following channels:
          </p>
          <ul className="space-y-5 text-gray-800">
            <li className="flex items-center">
              <EmailIcon />
              <Link
                to="/contact/email"
                className="text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors duration-200 underline underline-offset-4 hover:underline-offset-8"
              >
                support@medihelp.et
              </Link>
            </li>
            <li className="flex items-center">
              <PhoneIcon />
              <Link
                to="/contact/phone"
                className="text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors duration-200 underline underline-offset-4 hover:underline-offset-8"
              >
                +251 11 123 4567
              </Link>
            </li>
            <li className="flex items-center">
              <TelegramIcon />
              <Link
                to="/contact/telegram"
                className="text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors duration-200 underline underline-offset-4 hover:underline-offset-8"
              >
                @medihelp (Telegram)
              </Link>
            </li>
            <li className="flex items-center">
              <TikTokIcon />
              <Link
                to="/contact/tiktok"
                className="text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors duration-200 underline underline-offset-4 hover:underline-offset-8"
              >
                @medihelp (TikTok)
              </Link>
            </li>
          </ul>
        </div>
      </div>
 
    </div>
         <Footer/></div>
  );
};

export default ContactUs;