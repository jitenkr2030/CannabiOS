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
    const search = searchParams.get('search') || ''
    const category = searchParams.get('category') || ''
    const storeId = searchParams.get('storeId') || ''

    const skip = (page - 1) * limit

    const where: any = {}
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { sku: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }
    
    if (category) {
      where.category = category
    }
    
    if (storeId) {
      where.storeId = storeId
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        include: {
          category: true,
          batches: {
            include: {
              batchProducts: {
                include: {
                  batch: true
                }
              }
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.product.count({ where })
    ])

    return NextResponse.json({
      products,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    })
  } catch (error) {
    console.error('Products GET error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      name, 
      sku, 
      description, 
      category, 
      price, 
      cost, 
      thcContent, 
      cbdContent, 
      weight, 
      unit, 
      storeId,
      isActive = true 
    } = body

    // Validate required fields
    if (!name || !sku || !price) {
      return NextResponse.json(
        { error: 'Name, SKU, and price are required' },
        { status: 400 }
      )
    }

    // Check if product with SKU already exists
    const existingProduct = await prisma.product.findUnique({
      where: { sku }
    })

    if (existingProduct) {
      return NextResponse.json(
        { error: 'Product with this SKU already exists' },
        { status: 400 }
      )
    }

    // Create product
    const product = await prisma.product.create({
      data: {
        name,
        sku,
        description,
        categoryId: category,
        price,
        cost,
        thcContent,
        cbdContent,
        weight,
        unit,
        storeId,
        isActive
      },
      include: {
        category: true
      }
    })

    return NextResponse.json({
      product,
      message: 'Product created successfully'
    })
  } catch (error) {
    console.error('Products POST error:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, name, sku, description, category, price, cost, thcContent, cbdContent, weight, unit, storeId, isActive } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id }
    })

    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // If SKU is being changed, check if it's already taken
    if (sku && sku !== existingProduct.sku) {
      const skuTaken = await prisma.product.findUnique({
        where: { sku }
      })

      if (skuTaken) {
        return NextResponse.json(
          { error: 'SKU is already taken' },
          { status: 400 }
        )
      }
    }

    // Update product
    const product = await prisma.product.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(sku && { sku }),
        ...(description && { description }),
        ...(category && { categoryId: category }),
        ...(price && { price }),
        ...(cost && { cost }),
        ...(thcContent && { thcContent }),
        ...(cbdContent && { cbdContent }),
        ...(weight && { weight }),
        ...(unit && { unit }),
        ...(storeId && { storeId }),
        ...(isActive !== undefined && { isActive })
      },
      include: {
        category: true
      }
    })

    return NextResponse.json({
      product,
      message: 'Product updated successfully'
    })
  } catch (error) {
    console.error('Products PUT error:', error)
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id }
    })

    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Delete product
    await prisma.product.delete({
      where: { id }
    })

    return NextResponse.json({
      message: 'Product deleted successfully'
    })
  } catch (error) {
    console.error('Products DELETE error:', error)
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}
