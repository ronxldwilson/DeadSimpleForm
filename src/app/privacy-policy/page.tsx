// app/privacy/page.tsx
import React from 'react';

const PrivacyPolicyPage = () => {
  return (
    <div className='bg-white text-black'>
      <main className="max-w-3xl mx-auto px-4 py-10 text-sm leading-7 text-gray-800">
        <h1 className="text-2xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-gray-500 mb-8">Last updated on Jun 25, 2025</p>

        <p>
          This privacy policy sets out how <strong>RONALD WILSON</strong> uses and
          protects any information that you provide when you visit the website and/or
          agree to purchase from us.
        </p>

        <p>
          We are committed to ensuring your privacy is protected. If we ask you to provide
          certain information by which you can be identified, it will only be used in
          accordance with this privacy statement.
        </p>

        <p>
          This policy may change from time to time by updating this page. You should check
          this page periodically to ensure that you are aware of any updates.
        </p>

        <h2 className="font-semibold mt-6 mb-2">Information We May Collect</h2>
        <ul className="list-disc list-inside ml-4">
          <li>Name</li>
          <li>Contact information, including email address</li>
          <li>Demographic information such as preferences and interests</li>
          <li>Other information relevant to customer surveys and/or offers</li>
        </ul>

        <h2 className="font-semibold mt-6 mb-2">How We Use the Information</h2>
        <p>We collect this information to understand your needs and provide better service. Specifically, we may use it for:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Internal record keeping</li>
          <li>Improving our products and services</li>
          <li>
            Sending promotional emails about new products, special offers, or other
            information
          </li>
          <li>Contacting you for market research purposes</li>
          <li>Customizing the website according to your interests</li>
        </ul>

        <h2 className="font-semibold mt-6 mb-2">Security</h2>
        <p>
          We are committed to ensuring your information is secure. To prevent unauthorized
          access or disclosure, we have put in place suitable physical, electronic, and
          managerial procedures.
        </p>

        <h2 className="font-semibold mt-6 mb-2">How We Use Cookies</h2>
        <p>
          A cookie is a small file placed on your computer's hard drive with your
          permission. Cookies help analyze web traffic and let websites respond to you as
          an individual.
        </p>

        <p>
          We use traffic log cookies to identify which pages are being used. This helps us
          analyze data to improve our website for customer needs. Data is used only for
          statistical analysis and then removed from the system.
        </p>

        <p>
          Cookies help us provide a better website experience. They do not give us access
          to your computer or any personal information unless you choose to share it.
        </p>

        <p>
          You can choose to accept or decline cookies. Most web browsers automatically
          accept cookies, but you can modify your browser settings to decline them if you
          prefer.
        </p>

        <h2 className="font-semibold mt-6 mb-2">Controlling Your Personal Information</h2>
        <p>You can restrict the use of your personal information in the following ways:</p>
        <ul className="list-disc list-inside ml-4">
          <li>
            Opt-out of direct marketing by unchecking relevant boxes on forms
          </li>
          <li>
            Contact us to withdraw consent if previously given
          </li>
        </ul>

        <p>
          We will not sell, distribute, or lease your personal information to third parties
          unless required by law or with your permission.
        </p>

        <p>
          If you believe any information we are holding about you is incorrect or
          incomplete, please contact us. We will promptly correct any inaccuracies.
        </p>
      </main>
    </div>
  );
};

export default PrivacyPolicyPage;
