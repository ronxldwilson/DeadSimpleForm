// app/contact/page.tsx
import React from 'react';

const ContactUsPage = () => {
  return (
    <div className="text-black bg-white min-h-screen">
      <main className="max-w-2xl mx-auto px-4 py-10 text-sm leading-7 text-gray-800">
        <h1 className="text-2xl font-bold mb-6">Contact Us</h1>
        <p className="text-gray-500 mb-8">Last updated on Jun 25, 2025</p>

        <p>You may contact us using the information below:</p>

        <div className="mt-4">
          <p>
            <strong>Merchant Legal Entity Name:</strong> RONALD WILSON
          </p>
          <p>
            <strong>Email:</strong>{' '}
            <a href="mailto:deadsimpleform@gmail.com" className="text-blue-600 underline">
              deadsimpleform@gmail.com
            </a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default ContactUsPage;
