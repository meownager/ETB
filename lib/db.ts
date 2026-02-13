import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'products.db');
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

export interface Product {
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
  createdAt: string;
}

export function initDatabase() {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      price REAL NOT NULL,
      productCategory TEXT NOT NULL,
      imageUrl TEXT,
      brand TEXT,
      stock INTEGER DEFAULT 0,
      rating REAL DEFAULT 0,
      reviewCount INTEGER DEFAULT 0,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;
  
  db.exec(createTableSQL);
}

export function insertProduct(product: Omit<Product, 'id' | 'createdAt'>) {
  const stmt = db.prepare(`
    INSERT INTO products (name, description, price, productCategory, imageUrl, brand, stock, rating, reviewCount)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  return stmt.run(
    product.name,
    product.description,
    product.price,
    product.productCategory,
    product.imageUrl,
    product.brand,
    product.stock,
    product.rating,
    product.reviewCount
  );
}

export function searchProducts(searchQuery?: string, category?: string): Product[] {
  let sql = 'SELECT * FROM products WHERE 1=1';
  const params: any[] = [];
  
  if (searchQuery && searchQuery.trim()) {
    sql += ' AND (name LIKE ? OR description LIKE ? OR brand LIKE ?)';
    const searchPattern = `%${searchQuery}%`;
    params.push(searchPattern, searchPattern, searchPattern);
  }
  
  if (category && category.trim()) {
    sql += ' AND productCategory = ?';
    params.push(category);
  }
  
  sql += ' ORDER BY id DESC';
  
  const stmt = db.prepare(sql);
  return stmt.all(...params) as Product[];
}

export function getProductById(id: number): Product | undefined {
  const stmt = db.prepare('SELECT * FROM products WHERE id = ?');
  return stmt.get(id) as Product | undefined;
}

export function getAllCategories(): string[] {
  const stmt = db.prepare('SELECT DISTINCT productCategory FROM products ORDER BY productCategory');
  const results = stmt.all() as { productCategory: string }[];
  return results.map(r => r.productCategory);
}

export default db;
