# Amazon Clone - Product Search & Detail App

A Next.js-based e-commerce application with product search and detail pages, using SQLite as the database.

## Features

- **Product Search Page**: Browse and search products with filtering by category
- **Product Detail Page**: View detailed information about individual products
- **SQLite Database**: Lightweight database with sample products
- **Category Filtering**: Filter products by Books, Coffee Mugs, and Sunglasses
- **Regex Search**: Simple text-based search across product names, descriptions, and brands
- **Responsive Design**: Modern UI built with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: SQLite (better-sqlite3)
- **Styling**: Tailwind CSS
- **Image Handling**: Next.js Image component with Unsplash images

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Seed the database with sample data:
   ```bash
   npx tsx scripts/seed-db.ts
   ```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Production

Build and run the production server:

```bash
npm run build
npm start
```

## Project Structure

```
/workspace
├── app/
│   ├── api/
│   │   ├── categories/          # API to fetch all categories
│   │   └── products/
│   │       ├── search/          # Search API with query and category filter
│   │       └── [id]/            # Product detail API
│   ├── productSearch/           # Product search page
│   ├── productDetail/           # Product detail page
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page (redirects to search)
│   └── globals.css              # Global styles
├── lib/
│   └── db.ts                    # Database utilities and queries
├── scripts/
│   └── seed-db.ts               # Database seeding script
└── products.db                  # SQLite database file
```

## API Endpoints

### Search Products
```
GET /api/products/search?q=<query>&category=<category>
```
- **q** (optional): Search query to filter products by name, description, or brand
- **category** (optional): Filter by product category (Books, Coffee Mugs, Sunglasses)

Example:
```bash
curl "http://localhost:3000/api/products/search?q=coffee&category=Coffee%20Mugs"
```

### Get Product Details
```
GET /api/products/[id]
```
- **id**: Product ID

Example:
```bash
curl "http://localhost:3000/api/products/1"
```

### Get All Categories
```
GET /api/categories
```

Example:
```bash
curl "http://localhost:3000/api/categories"
```

## Database Schema

### Products Table

| Field           | Type    | Description                      |
|-----------------|---------|----------------------------------|
| id              | INTEGER | Primary key (auto-increment)     |
| name            | TEXT    | Product name                     |
| description     | TEXT    | Product description              |
| price           | REAL    | Product price                    |
| productCategory | TEXT    | Category (Books, etc.)           |
| imageUrl        | TEXT    | Product image URL                |
| brand           | TEXT    | Brand name                       |
| stock           | INTEGER | Available stock quantity         |
| rating          | REAL    | Average rating (0-5)             |
| reviewCount     | INTEGER | Number of reviews                |
| createdAt       | DATETIME| Creation timestamp               |

## Sample Data

The application comes with 16 sample products:
- **5 Books**: Classic literature including "The Great Gatsby", "1984", "The Hobbit", etc.
- **5 Coffee Mugs**: Various types including ceramic, travel, glass, and novelty mugs
- **6 Sunglasses**: Different styles including aviator, wayfarer, cat eye, and sports sunglasses

## Pages

### Product Search (`/productSearch`)
- Grid layout displaying all products
- Search bar for text-based filtering
- Category dropdown filter
- Product cards with images, prices, ratings, and stock status
- Click on any product to view details

### Product Detail (`/productDetail?productId=<id>`)
- Large product image
- Detailed product information
- Price and availability
- Star rating and review count
- Quantity selector
- Add to Cart and Buy Now buttons (UI only)

## Future Enhancements

- Shopping cart functionality
- User authentication
- Order management
- Advanced search with filters (price range, ratings, etc.)
- Product reviews and ratings system
- Pagination for search results
- Image upload for products

## License

MIT
