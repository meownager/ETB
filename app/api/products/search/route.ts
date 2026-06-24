import { NextRequest, NextResponse } from 'next/server';
import { searchProducts } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q') || '';
    const category = searchParams.get('category') || '';
    
    const products = searchProducts(query, category);
    
    return NextResponse.json({
      success: true,
      data: products,
      count: products.length
    });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to search products',
        data: [] 
      },
      { status: 500 }
    );
  }
}
