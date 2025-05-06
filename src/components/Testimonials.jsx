import React from "react";
import people from "../assets/people.jpg";
import people1 from "../assets/people1.jpg";
import people3 from "../assets/people3.jpg";

const Testimonials = () => {
  const testimonials = [
    {
      quote:
        "MediHelp+ helped me understand my symptoms and gave me peace of mind.",
      author: "Sarah K.",
      role: "Traveller",
      image: people,
      rating: 5,
    },
    {
      quote: "The first aid feature is a lifesaver—literally!",
      author: "John D.",
      role: "Traveller",
      image: people1,
      rating: 5,
    },
    {
      quote: "Great app for quick health advice when I need it most.",
      author: "Kausar Hasan",
      role: "Traveller",
      image: people3,
      rating: 5,
    },
  ];

  return (
    <div className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          What Our Users Say
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg mb-12">
          We are a team of 
        </p>
        <div className="flex justify-center items-center mb-8">
          <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 mx-2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 mx-2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-left border border-gray-200 dark:border-gray-700 relative"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-32 h-32 rounded-full object-cover mr-4 -mt-16 border-4 border-white dark:border-gray-800 shadow-md"
                />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{testimonial.author}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-2">
                {Array.from({ length: testimonial.rating }, (_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-400 italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;