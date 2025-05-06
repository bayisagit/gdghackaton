import React from 'react';
import { Link } from 'react-router-dom';
import teamIllustration from '../assets/groupImage.png';
import phoneGraphic from '../assets/about2.jpg';
import Footer from '../components/Footer';

const About = () => {
  const content = {
    whoWeAre: {
      title: 'Meet The Team',
      description: 'We are a dedicated team of React and Django developers committed to building meaningful digital solutions. MediHelp is one of our key projects, developed to provide accessible, accurate, and practical health information to users. Our goal is to combine technology and healthcare knowledge to support better decision-making and promote well-being.',
      buttonText: 'Contact Us',
      buttonLink: '/Contact'
    }
  };

  return (
    <div className="flex flex-col bg-gray-50 dark:bg-gray-900 font-sans mt-15">
      <section className="flex flex-col justify-end items-center text-left px-4 py-16 md:py-24 bg-white dark:bg-gray-900 h-screen">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 flex justify-center mb-8 md:mb-0">
            <img
              src={teamIllustration}
              alt="Illustration of the Pomegranate Studio team"
              className="w-64 h-64 md:w-146 md:h-146 object-contain"
              loading="lazy"
            />
          </div>
          <div className="md:w-1/2 relative">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {content.whoWeAre.title}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg mb-6">
              {content.whoWeAre.description}
            </p>
            <Link
              to={content.whoWeAre.buttonLink}
              className="inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-purple-700 transition"
              aria-label="Learn more about us"
            >
              {content.whoWeAre.buttonText}
            </Link>
            <img
              src={phoneGraphic}
              alt="Telegram Mini App on phone"
              className="absolute hidden md:block top-0 right-0 w-32 h-48 object-contain transform translate-x-12 -translate-y-12"
              loading="lazy"
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About;