// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store'

import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const startDate = searchParams.get('startDate') || ''
    const endDate = searchParams.get('endDate') || ''
    const storeId = searchParams.get('storeId') || ''

    const skip = (page - 1) * limit

    const where: any = {}
    
    if (startDate || endDate) {
      where.createdAt = {}
      if (startDate) {
        where.createdAt.gte = new Date(startDate)
      }
      if (endDate) {
        where.createdAt.lte = new Date(endDate)
      }
    }
    
    if (storeId) {
      where.storeId = storeId
    }

    const [sales, total] = await Promise.all([
      prisma.sale.findMany({
        where,
        skip,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true
            }
          },
          saleItems: {
            include: {
              product: true,
              batch: {
                include: {
                  batchProducts: true
                }
              }
            }
          },
          payments: true
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.sale.count({ where })
    ])

    return NextResponse.json({
      sales,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    })
  } catch (error) {
    console.error('Sales GET error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch sales' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      customerId, 
      items, 
      subtotal, 
      tax, 
      total, 
      paymentMethod, 
      storeId,
      notes 
    } = body

    // Validate required fields
    if (!customerId || !items || !items.length || !total) {
      return NextResponse.json(
        { error: 'Customer ID, items, and total are required' },
        { status: 400 }
      )
    }

    // Create sale
    const sale = await prisma.sale.create({
      data: {
        customerId,
        subtotal,
        tax,
        total,
        paymentMethod,
        storeId,
        notes,
        status: 'COMPLETED'
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        },
        saleItems: {
          include: {
            product: true,
            batch: true
          }
        },
        payments: true
      }
    })

    // Create sale items
    for (const item of items) {
      await prisma.saleItem.create({
        data: {
          saleId: sale.id,
          productId: item.productId,
          batchId: item.batchId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalPrice: item.totalPrice,
          discount: item.discount || 0
        },
        include: {
          product: true,
          batch: true
        }
      })

      // Update inventory
      await prisma.stockMovement.create({
        data: {
          productId: item.productId,
          batchId: item.batchId,
          movementType: 'SALE',
          quantity: -item.quantity,
          referenceId: sale.id,
          referenceType: 'SALE',
          storeId,
          notes: `Sale of ${item.quantity} units of ${item.productName}`
        }
      })
    }

    // Update inventory stock
    for (const item of items) {
      await prisma.inventory.updateMany({
        where: {
          productId: item.productId,
          batchId: item.batchId
        },
        data: {
          quantity: {
            decrement: item.quantity
          }
        }
      })
    }

    return NextResponse.json({
      sale,
      message: 'Sale created successfully'
    })
  } catch (error) {
    console.error('Sales POST error:', error)
    return NextResponse.json(
      { error: 'Failed to create sale' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, status, notes } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Sale ID is required' },
        { status: 400 }
      )
    }

    // Update sale
    const sale = await prisma.sale.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(notes && { notes })
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        },
        saleItems: {
          include: {
            product: true,
            batch: true
          }
        },
        payments: true
      }
    })

    return NextResponse.json({
      sale,
      message: 'Sale updated successfully'
    })
  } catch (error) {
    console.error('Sales PUT error:', error)
    return NextResponse.json(
      { error: 'Failed to update sale' },
      { status: 500 }
    )
  }
}
