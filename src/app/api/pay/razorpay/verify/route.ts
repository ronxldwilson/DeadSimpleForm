import crypto from 'crypto' // Import crypto module
import { NextResponse } from 'next/server' // Import NextResponse for responses

// Function to generate the Razorpay signature
const generatedSignature = (razorpayOrderId: any, razorpayPaymentId:any) => {
  const keySecret = process.env.RAZORPAY_KEY_SECRET // Fetch secret key from environment variables
  if (!keySecret) {
    throw new Error(
      'Razorpay key secret is not defined in environment variables.'
    )
  }
  const sig = crypto
    .createHmac('sha256', keySecret) // Create HMAC using the secret key
    .update(`${razorpayOrderId}|${razorpayPaymentId}`) // Update with the concatenated string
    .digest('hex') // Generate the hex digest
  return sig // Return the generated signature
}

// POST handler function
export async function POST (req:any) {
  try {
    const { orderCreationId, razorpayPaymentId, razorpaySignature } =
      await req.json() // Extract details from the request body

    const signature = generatedSignature(orderCreationId, razorpayPaymentId) // Generate the signature

    // Compare the generated signature with the received signature
    if (signature !== razorpaySignature) {
      return NextResponse.json(
        { message: 'Payment verification failed', isOk: false },
        { status: 400 }
      )
    }

    // If the signature matches, return success
    return NextResponse.json(
      { message: 'Payment verified successfully', isOk: true },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error during payment verification:', error)
    return NextResponse.json(
      { message: 'Internal server error', isOk: false },
      { status: 500 }
    )
  }
}

// Default response for non-POST requests
export async function OPTIONS () {
  return NextResponse.json(
    { message: 'Method not allowed', isOk: false },
    { status: 405 }
  )
}
