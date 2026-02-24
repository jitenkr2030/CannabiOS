// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store'

import { NextRequest, NextResponse } from 'next/server'
import { createCashfreePayment, createStripePayment, createRazorpayPayment } from '@/lib/payments'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      amount, 
      currency = 'USD', 
      customerEmail, 
      customerName, 
      customerPhone, 
      paymentMethod,
      orderId,
      description 
    } = body

    // Validate required fields
    if (!amount || !customerEmail || !customerName || !paymentMethod) {
      return NextResponse.json(
        { error: 'Amount, customer email, customer name, and payment method are required' },
        { status: 400 }
      )
    }

    // Create payment request
    const paymentRequest = {
      amount,
      currency,
      customerEmail,
      customerName,
      customerPhone,
      paymentMethod,
      orderId,
      description
    }

    let paymentResponse

    switch (paymentMethod) {
      case 'cashfree':
        paymentResponse = await createCashfreePayment(paymentRequest)
        break
      case 'stripe':
        paymentResponse = await createStripePayment(paymentRequest)
        break
      case 'razorpay':
        paymentResponse = await createRazorpayPayment(paymentRequest)
        break
      default:
        return NextResponse.json(
          { error: 'Invalid payment method' },
          { status: 400 }
        )
    }

    // Save payment record to database
    if (paymentResponse.success && paymentResponse.orderId) {
      await prisma.payment.create({
        data: {
          orderId: paymentResponse.orderId,
          paymentId: paymentResponse.paymentId,
          provider: paymentResponse.provider,
          amount,
          currency,
          customerEmail,
          customerName,
          customerPhone,
          status: 'PENDING',
          metadata: paymentRequest
        }
      })
    }

    return NextResponse.json(paymentResponse)
  } catch (error) {
    console.error('Create payment order error:', error)
    return NextResponse.json(
      { error: 'Failed to create payment order' },
      { status: 500 }
    )
  }
}
