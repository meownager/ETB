import { NextRequest, NextResponse } from 'next/server';
import { getProductById } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = parseInt(id);
    
    if (isNaN(productId)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid product ID' 
        },
        { status: 400 }
      );
    }
    
    const product = getProductById(productId);
    
    if (!product) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Product not found' 
        },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Product detail API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch product details' 
      },
      { status: 500 }
    );
  }
}
