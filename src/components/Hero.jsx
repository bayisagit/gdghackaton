import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import herovideo from "../assets/video.mp4";
import NavBar from "./NavBar";

const Hero = () => {
  return (
    <div className="text-white dark:text-white relative min-h-screen overflow-hidden transition-all duration-1000">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
      >
        <source src={herovideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black dark:bg-black opacity-40"></div>
     

      <div className="container mx-auto text-center px-4 absolute top-1/3">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4 text-white dark:text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Empower Your Health with AI
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl mb-8 text-white dark:text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          MediHelp+ provides personalized health insights, emergency guidance,
          and daily wellness coaching—all in one platform.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.4 }}
        >
          <Link to="/signup">
            <button className="bg-white text-gray-800 dark:bg-gray-900 dark:text-white   px-6 py-3 rounded-full font-semibold hover:bg-blue-100 transition">
              Get Started for Free
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
