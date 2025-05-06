import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-blue-500 text-white p-6 text-center">
        <h1 className="text-3xl font-bold">Privacy Policy</h1>
        <p className="mt-2 text-gray-200">Last Updated: May 04, 2025</p>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6 max-w-4xl">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
          <p className="text-gray-600">
            At MediHelp, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal and health-related data when you use our AI-powered health assistance services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Data We Collect</h2>
          <p className="text-gray-600">
            We collect:
            <ul className="list-disc list-inside mt-2">
              <li>Personal information (e.g., name, email, phone number).</li>
              <li>Health data (e.g., symptoms, medical history) provided by you.</li>
              <li>Usage data (e.g., interaction with our AI assistant).</li>
            </ul>
            Data is collected through forms, AI interactions, and automated systems.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. How We Use Your Data</h2>
          <p className="text-gray-600">
            We use your data to:
            <ul className="list-disc list-inside mt-2">
              <li>Provide personalized health assistance via AI.</li>
              <li>Improve our services and AI algorithms.</li>
              <li>Comply with legal and regulatory obligations.</li>
            </ul>
            Your health data is processed with strict confidentiality.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Data Sharing</h2>
          <p className="text-gray-600">
            We do not sell your data. It may be shared with:
            <ul className="list-disc list-inside mt-2">
              <li>Healthcare providers with your consent.</li>
              <li>Legal authorities if required by law.</li>
            </ul>
            All sharing complies with applicable data protection laws.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Your Rights</h2>
          <p className="text-gray-600">
            You have the right to:
            <ul className="list-disc list-inside mt-2">
              <li>Access, correct, or delete your data.</li>
              <li>Opt out of non-essential data processing.</li>
              <li>File a complaint with a data protection authority.</li>
            </ul>
            Contact us at support@medihelp.et to exercise these rights.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Security</h2>
          <p className="text-gray-600">
            We use encryption and secure protocols to protect your data. However, no online service is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Changes to This Policy</h2>
          <p className="text-gray-600">
            We may update this policy. Changes will be posted here with an updated date. Continued use of our services constitutes acceptance of the new policy.
          </p>
        </section>
      </main>


      {/* Footer */}
      <footer className="bg-gray-100 p-4 text-center text-gray-600">
        <p>&copy; 2025 MediHelp. All rights reserved. | <a href="/terms" className="text-blue-500 hover:underline">Terms of Service</a></p>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
