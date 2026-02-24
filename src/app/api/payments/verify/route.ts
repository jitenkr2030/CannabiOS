// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store'

import { NextRequest, NextResponse } from 'next/server'
import { verifyPayment } from '@/lib/payments'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { provider, paymentId, orderId } = body

    // Validate required fields
    if (!provider || !paymentId || !orderId) {
      return NextResponse.json(
        { error: 'Provider, payment ID, and order ID are required' },
        { status: 400 }
      )
    }

    // Verify payment with provider
    const verificationResult = await verifyPayment(provider, paymentId, orderId)

    // Update payment record in database
    const payment = await prisma.payment.findUnique({
      where: { orderId }
    })

    if (payment) {
      await prisma.payment.update({
        where: { orderId },
        data: {
          status: verificationResult.success ? 'COMPLETED' : 'FAILED',
          verifiedAt: new Date(),
          metadata: {
            ...payment.metadata,
            verificationResult
          }
        }
      })
    }

    return NextResponse.json(verificationResult)
  } catch (error) {
    console.error('Verify payment error:', error)
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    )
  }
}
