import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6 text-xs text-noir-700 leading-relaxed">
      <div className="border-b border-canvas-border pb-6">
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold-600 block mb-1">
          Data Governance
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-noir-900 font-medium">
          Privacy Policy
        </h1>
        <p className="text-noir-500 mt-1">
          In accordance with the Information Technology Act, 2000 and Digital Personal Data Protection Act, 2023.
        </p>
      </div>

      <div className="bg-white border border-canvas-border p-6 rounded-sm space-y-4">
        <h2 className="font-serif text-base font-bold text-noir-900">1. Information We Collect</h2>
        <p>
          We collect your name, delivery address, Indian contact number, and email address exclusively to process orders, facilitate Delhivery shipping updates, and handle customer service requests.
        </p>

        <h2 className="font-serif text-base font-bold text-noir-900">2. Payment Security</h2>
        <p>
          We do not store your credit card credentials, netbanking passwords, or UPI MPIN on LUMIÈRE servers. All online transactions are processed through encrypted, compliant payment gateways (PhonePe & Google Pay / UPI).
        </p>

        <h2 className="font-serif text-base font-bold text-noir-900">3. Third-Party Sharing</h2>
        <p>
          We share delivery information with Delhivery solely for order fulfillment. We never sell customer lists to third-party advertisers.
        </p>
      </div>
    </div>
  );
}
