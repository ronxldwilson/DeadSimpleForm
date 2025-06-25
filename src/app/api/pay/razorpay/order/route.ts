import Razorpay from 'razorpay'; // Import Razorpay SDK
import { NextResponse } from 'next/server'; // Import NextResponse for API response

export async function POST(req: any) {
  if (req.method === 'POST') {
    const { amount, currency } = await req.json();

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // Generate a unique receipt ID using a timestamp
    const receiptId = `receipt_${Date.now()}`;

    const options = {
      amount: amount,
      currency: currency,
      receipt: receiptId,
    };

    try {
      const order = await razorpay.orders.create(options);
      // console.log(order);
      return NextResponse.json({ orderId: order.id }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }
}
