
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Star } from "lucide-react";
import "./App.css";

const products = [
  { id: 1, name: "Studio Wireless Headphones", category: "Electronics", price: 2499, rating: 4.8, image: "photo-1505740420928-5e560c06d30e", description: "Enjoy your everyday music with comfortable wireless headphones, a clean modern design, and sound made for work and relaxation." },
  { id: 2, name: "Minimal Everyday Watch", category: "Accessories", price: 1899, rating: 4.6, image: "photo-1523275335684-37898b6baf30", description: "A minimalist everyday watch that combines timeless styling with a versatile look for daily wear." },
  { id: 3, name: "Classic Leather Sneakers", category: "Fashion", price: 2999, rating: 4.9, image: "photo-1542291026-7eec264c27ff", description: "Refresh your everyday style with classic sneakers designed for versatile outfits and casual occasions." },
  { id: 4, name: "Everyday Travel Backpack", category: "Accessories", price: 1599, rating: 4.7, image: "photo-1553062407-98eeb64c6a62", description: "A practical everyday backpack for carrying your essentials to college, work, and weekend trips." },
  { id: 5, name: "Premium Running Shoes", category: "Fashion", price: 3499, rating: 4.8, image: "photo-1542291026-7eec264c27ff", description: "Comfortable, sporty styling for your active days and everyday casual looks." },
  { id: 6, name: "Modern Desk Lamp", category: "Home", price: 1299, rating: 4.5, image: "photo-1507473885765-e6ed057f782c", description: "Give your workspace a modern touch with a simple desk lamp that suits a calm, focused environment." },
  { id: 7, name: "Essential Smart Watch", category: "Electronics", price: 4299, rating: 4.7, image: "photo-1523275335684-37898b6baf30", description: "A versatile watch-inspired accessory for a modern everyday look." },
  { id: 8, name: "Everyday Sunglasses", category: "Accessories", price: 999, rating: 4.4, image: "photo-1511499767150-a48a237f0083", description: "Finish your everyday outfit with simple, versatile sunglasses." },
];

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <main className="products-section">
        <h2>Product not found</h2>
        <Link className="primary-button" to="/">Back to shop</Link>
      </main>
    );
  }

  return (
    <main className="detail-page">
      <Link to="/" className="back-link"><ArrowLeft size={17} /> Back to shop</Link>
      <div className="detail-layout">
        <div className="detail-image">
          <img
            src={`https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=1000&q=80`}
            alt={product.name}
          />
        </div>
        <div className="detail-copy">
          <span className="eyebrow">{product.category.toUpperCase()}</span>
          <h1>{product.name}</h1>
          <div className="detail-rating"><Star size={16} fill="currentColor" /> {product.rating} / 5</div>
          <h2>₹{product.price.toLocaleString("en-IN")}</h2>
          <p>{product.description}</p>
          <p className="detail-note">✓ Carefully selected everyday essential</p>
          <p className="detail-note">✓ Secure shopping experience</p>
          <Link to="/#products" className="primary-button">Browse more products <ShoppingBag size={17} /></Link>
        </div>
      </div>
    </main>
  );
}
