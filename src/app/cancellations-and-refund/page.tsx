// app/cancellation/page.tsx
import React from 'react';

const CancellationPolicyPage = () => {
  return (
    <div className='text-black bg-white min-h-screen'>

      <main className="max-w-2xl mx-auto px-4 py-10 text-sm leading-7 text-gray-800">
        <h1 className="text-2xl font-bold mb-6">Cancellation and Refund Policy</h1>
        <p className="text-gray-500 mb-8">Last updated on Jun 25, 2025</p>

        <h2 className="font-semibold mb-2">Cancellations</h2>
        <p>
          You may cancel your Dead Simple Form subscription at any time from your account settings. Once cancelled,
          your subscription will remain active until the end of the current billing period, and it will not renew thereafter.
        </p>
        <p className="mt-2">
          No further charges will be applied after cancellation. However, you will retain access to all paid features until
          your current billing cycle ends.
        </p>

        <h2 className="font-semibold mt-6 mb-2">Refunds</h2>
        <p>
          We do not offer refunds for any payments made, including partial refunds for unused time, unused features,
          or early cancellation.
        </p>
        <p className="mt-2">
          We encourage all users to explore our free tier or trial options before upgrading. If you experience any
          issues with your subscription, feel free to reach out and we’ll be happy to assist.
        </p>
      </main>
    </div>
  );
};

export default CancellationPolicyPage;
