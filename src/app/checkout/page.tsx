// app/checkout/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import type { Database } from "@/lib/database.types"; // optional if you generated types

export default function CheckoutPage() {
  const supabase = createClientComponentClient();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") ?? "pro";

  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }: any ) => {
      if (data?.user) {
        setUser(data.user);
        setEmail(data.user.email ?? "");
      }
    });
  }, []);

  const handleCheckout = async () => {
    if (!email) {
      alert("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/pay/razorpay/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        plan,
        email,
      }),
    });

    const { order, error } = await res.json();
    if (error) {
      alert("Order creation failed: " + error);
      setLoading(false);
      return;
    }

    const rzp = new (window as any).Razorpay({
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Dead Simple Form",
      description: "Pro Plan Subscription",
      order_id: order.id,
      handler: async function (response: any) {
        await fetch("/api/pay/razorpay/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...response,
            plan,
            email,
          }),
        });

        window.location.href = "/dashboard"; // or /signup-success
      },
      prefill: { email },
      theme: { color: "#2563eb" },
    });

    rzp.open();
    setLoading(false);
  };

  return (
    <main className="max-w-xl mx-auto py-12 text-center">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <p className="text-gray-600 mb-6">
        Plan: <strong>{plan.toUpperCase()}</strong>
      </p>

      {!user && (
        <div className="mb-4">
          <input
            type="email"
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      )}

      <button
        onClick={handleCheckout}
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay with Razorpay"}
      </button>
    </main>
  );
}
