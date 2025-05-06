import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const Footer = () => {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const privacyContent = `
    <h2 className="text-xl font-bold mb-4">Privacy Policy</h2>
    <p className="mb-2">At MediHelp+, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.</p>
    <p className="mb-2">We collect personal information such as your name, email, and health data to provide personalized healthcare services. This data is stored securely and is not shared with third parties without your consent, except as required by law.</p>
    <p className="mb-2">You can request access to or deletion of your data by contacting us at support@medihelp.com. Last updated: May 04, 2025.</p>
  `;

  const termsContent = `
    <h2 className="text-xl font-bold mb-4">Terms of Service</h2>
    <p className="mb-2">Welcome to MediHelp+. By accessing or using our services, you agree to be bound by these Terms of Service.</p>
    <p className="mb-2">You must be at least 13 years old to use our services. You are responsible for maintaining the confidentiality of your account and password. MediHelp+ is not a substitute for professional medical advice.</p>
    <p className="mb-2">We reserve the right to terminate or suspend your account for violation of these terms. Last updated: May 04, 2025.</p>
  `;

  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto text-center px-4">
        <p className="mb-4">© 2025 MediHelp+. All rights reserved.</p>
        <div className="flex justify-center gap-6">
          <a href="/about" className="hover:text-blue-400 transition">
            About
          </a>
          <a href="/Contu" className="hover:text-blue-400 transition">
            Contact Us
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setShowPrivacyModal(true);
            }}
            className="hover:text-blue-400 transition"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setShowTermsModal(true);
            }}
            className="hover:text-blue-400 transition"
          >
            Terms of Service
          </a>
        </div>

        {/* Privacy Modal */}
        <AnimatePresence>
          {showPrivacyModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0   flex items-center justify-center z-50 bg-gray-300"
            >
              <motion.div
                initial={{ y: 50, scale: 0.9 }}
                animate={{ y: 0, scale: 1 }}
                exit={{ y: 50, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className=" p-6 rounded-lg shadow-lg max-w-md w-full bg-gray-700"
              >
                <div
                  className="prose"
                  dangerouslySetInnerHTML={{ __html: privacyContent }}
                />
                <button
                  onClick={() => setShowPrivacyModal(false)}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  <X className="mr-2 inline" /> Cancel
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Terms Modal */}
        <AnimatePresence>
          {showTermsModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gray-300 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ y: 50, scale: 0.9 }}
                animate={{ y: 0, scale: 1 }}
                exit={{ y: 50, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className=" p-6 rounded-lg shadow-lg max-w-md w-full bg-gray-700"
              >
                <div
                  className="prose"
                  dangerouslySetInnerHTML={{ __html: termsContent }}
                />
                <button
                  onClick={() => setShowTermsModal(false)}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  <X className="mr-2 inline" /> Cancel
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </footer>
  );
};

export default Footer;