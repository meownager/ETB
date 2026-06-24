'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  productCategory: string;
  imageUrl: string;
  brand: string;
  stock: number;
  rating: number;
  reviewCount: number;
}

function ProductDetailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const productId = searchParams.get('productId');
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!productId) {
      setError('Product ID is required');
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${productId}`);
        const data = await response.json();
        
        if (data.success) {
          setProduct(data.data);
        } else {
          setError(data.error || 'Product not found');
        }
      } catch (err) {
        setError('Failed to fetch product details');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-xl">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-gray-900 text-white py-4 shadow-lg">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold">Amazon Clone</h1>
          </div>
        </header>
        <div className="container mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Link
              href="/productSearch"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Search
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gray-900 text-white py-4 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Amazon Clone</h1>
            <Link
              href="/productSearch"
              className="text-sm bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              ← Back to Search
            </Link>
          </div>
        </div>
      </header>

      {/* Product Detail */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="relative h-96 lg:h-full bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Product Information */}
            <div className="flex flex-col">
              {/* Category */}
              <div className="text-sm text-blue-600 mb-2">
                <Link href={`/productSearch?category=${product.productCategory}`} className="hover:underline">
                  {product.productCategory}
                </Link>
              </div>

              {/* Product Name */}
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-2xl ${
                        star <= Math.round(product.rating)
                          ? 'text-yellow-500'
                          : 'text-gray-300'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-gray-600">
                  {product.rating.toFixed(1)} out of 5
                </span>
                <span className="text-blue-600">
                  ({product.reviewCount.toLocaleString()} reviews)
                </span>
              </div>

              <hr className="my-4" />

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-gray-600">Price:</span>
                  <span className="text-4xl font-bold text-red-700">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Brand */}
              <div className="mb-4">
                <span className="text-gray-600">Brand: </span>
                <span className="font-semibold text-gray-900">{product.brand}</span>
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {product.stock > 0 ? (
                  <div className="flex items-center gap-2">
                    <span className="text-green-600 font-semibold">In Stock</span>
                    <span className="text-gray-600">({product.stock} available)</span>
                  </div>
                ) : (
                  <span className="text-red-600 font-semibold">Out of Stock</span>
                )}
              </div>

              <hr className="my-4" />

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  About this item
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Quantity Selector */}
              {product.stock > 0 && (
                <div className="mb-6">
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity:
                  </label>
                  <select
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  >
                    {[...Array(Math.min(10, product.stock))].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                {product.stock > 0 ? (
                  <>
                    <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-colors">
                      Add to Cart
                    </button>
                    <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                      Buy Now
                    </button>
                  </>
                ) : (
                  <button
                    disabled
                    className="w-full bg-gray-300 text-gray-600 font-semibold py-3 px-6 rounded-lg cursor-not-allowed"
                  >
                    Out of Stock
                  </button>
                )}
              </div>

              {/* Additional Info */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Product Details</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Product ID:</span>
                    <span className="font-medium">{product.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Category:</span>
                    <span className="font-medium">{product.productCategory}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Brand:</span>
                    <span className="font-medium">{product.brand}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductDetail() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600 text-xl">Loading...</p>
      </div>
    }>
      <ProductDetailContent />
    </Suspense>
  );
}
