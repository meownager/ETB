import { initDatabase, insertProduct } from '../lib/db';

// Initialize the database
initDatabase();

// Sample products data
const products = [
  // Books
  {
    name: 'The Great Gatsby',
    description: 'A classic American novel by F. Scott Fitzgerald. The story of the mysteriously wealthy Jay Gatsby and his love for Daisy Buchanan.',
    price: 12.99,
    productCategory: 'Books',
    imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
    brand: 'Scribner',
    stock: 150,
    rating: 4.5,
    reviewCount: 8234
  },
  {
    name: 'To Kill a Mockingbird',
    description: 'Harper Lee\'s Pulitzer Prize-winning masterwork of honor and injustice in the deep South.',
    price: 14.99,
    productCategory: 'Books',
    imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400',
    brand: 'Harper Perennial',
    stock: 200,
    rating: 4.8,
    reviewCount: 12456
  },
  {
    name: '1984',
    description: 'George Orwell\'s dystopian masterpiece about a totalitarian regime that controls thought and individuality.',
    price: 13.99,
    productCategory: 'Books',
    imageUrl: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400',
    brand: 'Signet Classic',
    stock: 175,
    rating: 4.7,
    reviewCount: 9876
  },
  {
    name: 'Pride and Prejudice',
    description: 'Jane Austen\'s beloved novel about Elizabeth Bennet and Mr. Darcy.',
    price: 11.99,
    productCategory: 'Books',
    imageUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400',
    brand: 'Penguin Classics',
    stock: 130,
    rating: 4.6,
    reviewCount: 7654
  },
  {
    name: 'The Hobbit',
    description: 'J.R.R. Tolkien\'s classic fantasy adventure of Bilbo Baggins and his journey to the Lonely Mountain.',
    price: 15.99,
    productCategory: 'Books',
    imageUrl: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400',
    brand: 'Mariner Books',
    stock: 220,
    rating: 4.9,
    reviewCount: 15432
  },
  
  // Coffee Mugs
  {
    name: 'Ceramic Coffee Mug - Classic White',
    description: 'Classic white ceramic coffee mug, perfect for your morning coffee. Holds 12 oz. Microwave and dishwasher safe.',
    price: 9.99,
    productCategory: 'Coffee Mugs',
    imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400',
    brand: 'HomeEssentials',
    stock: 500,
    rating: 4.3,
    reviewCount: 1234
  },
  {
    name: 'Stainless Steel Travel Mug',
    description: 'Double-walled insulated travel mug keeps drinks hot for 6 hours, cold for 12 hours. 16 oz capacity.',
    price: 24.99,
    productCategory: 'Coffee Mugs',
    imageUrl: 'https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?w=400',
    brand: 'ThermoMax',
    stock: 300,
    rating: 4.7,
    reviewCount: 3456
  },
  {
    name: 'Glass Coffee Mug with Handle',
    description: 'Elegant borosilicate glass mug with comfortable handle. Heat-resistant and dishwasher safe. 14 oz.',
    price: 16.99,
    productCategory: 'Coffee Mugs',
    imageUrl: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400',
    brand: 'GlassCraft',
    stock: 250,
    rating: 4.5,
    reviewCount: 876
  },
  {
    name: 'Funny Coffee Mug - "Coffee First"',
    description: 'Humorous coffee mug with "Coffee First" slogan. Perfect gift for coffee lovers. 11 oz capacity.',
    price: 12.99,
    productCategory: 'Coffee Mugs',
    imageUrl: 'https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=400',
    brand: 'FunMugs',
    stock: 400,
    rating: 4.4,
    reviewCount: 2345
  },
  {
    name: 'Color Changing Coffee Mug',
    description: 'Magic heat-sensitive mug that changes color when filled with hot liquid. Fun and unique! 10 oz.',
    price: 18.99,
    productCategory: 'Coffee Mugs',
    imageUrl: 'https://images.unsplash.com/photo-1565200405388-0523bb93e1ff?w=400',
    brand: 'MagicMugs',
    stock: 180,
    rating: 4.6,
    reviewCount: 1567
  },
  
  // Sunglasses
  {
    name: 'Classic Aviator Sunglasses',
    description: 'Timeless aviator style sunglasses with polarized lenses. 100% UV protection. Metal frame.',
    price: 49.99,
    productCategory: 'Sunglasses',
    imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400',
    brand: 'SunStyle',
    stock: 350,
    rating: 4.5,
    reviewCount: 4567
  },
  {
    name: 'Wayfarer Polarized Sunglasses',
    description: 'Classic wayfarer design with polarized lenses. Reduces glare and provides excellent eye protection.',
    price: 39.99,
    productCategory: 'Sunglasses',
    imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400',
    brand: 'UrbanShades',
    stock: 420,
    rating: 4.6,
    reviewCount: 5678
  },
  {
    name: 'Cat Eye Sunglasses - Women',
    description: 'Stylish cat eye sunglasses with gradient lenses. Perfect for a chic, vintage look.',
    price: 34.99,
    productCategory: 'Sunglasses',
    imageUrl: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=400',
    brand: 'FashionEyes',
    stock: 280,
    rating: 4.7,
    reviewCount: 3210
  },
  {
    name: 'Sport Wrap Sunglasses',
    description: 'Wraparound sports sunglasses with anti-slip nose pads. Ideal for running, cycling, and outdoor activities.',
    price: 29.99,
    productCategory: 'Sunglasses',
    imageUrl: 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=400',
    brand: 'ActiveGear',
    stock: 310,
    rating: 4.4,
    reviewCount: 2890
  },
  {
    name: 'Round Frame Sunglasses',
    description: 'Retro round frame sunglasses with UV400 protection. Lightweight and comfortable for all-day wear.',
    price: 27.99,
    productCategory: 'Sunglasses',
    imageUrl: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=400',
    brand: 'RetroVision',
    stock: 260,
    rating: 4.3,
    reviewCount: 1876
  },
  {
    name: 'Mirrored Aviator Sunglasses',
    description: 'Premium aviator sunglasses with mirrored lenses. Anti-reflective coating and superior UV protection.',
    price: 59.99,
    productCategory: 'Sunglasses',
    imageUrl: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400',
    brand: 'LuxeShades',
    stock: 190,
    rating: 4.8,
    reviewCount: 6543
  },
];

// Insert all products
console.log('Seeding database with products...');
let count = 0;
for (const product of products) {
  try {
    insertProduct(product);
    count++;
    console.log(`✓ Inserted: ${product.name}`);
  } catch (error) {
    console.error(`✗ Failed to insert: ${product.name}`, error);
  }
}

console.log(`\nDatabase seeded successfully! ${count} products added.`);
