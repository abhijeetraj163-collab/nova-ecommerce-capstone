import "./App.css";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search, ShoppingBag, Heart, Star, ArrowRight,
  Truck, ShieldCheck, RefreshCw, Menu
} from "lucide-react";
import "./App.css";

const products = [
  { id: 1, name: "Studio Wireless Headphones", category: "Electronics", price: 2499, oldPrice: 3499, rating: 4.8, tag: "BESTSELLER", color: "#e5e7eb", image: "photo-1505740420928-5e560c06d30e" },
  { id: 2, name: "Minimal Everyday Watch", category: "Accessories", price: 1899, oldPrice: 2599, rating: 4.6, tag: "POPULAR", color: "#e7e5e4", image: "photo-1523275335684-37898b6baf30" },
  { id: 3, name: "Classic Leather Sneakers", category: "Fashion", price: 2999, oldPrice: 3999, rating: 4.9, tag: "TRENDING", color: "#e7e5e4", image: "photo-1542291026-7eec264c27ff" },
  { id: 4, name: "Everyday Travel Backpack", category: "Accessories", price: 1599, oldPrice: 2199, rating: 4.7, tag: "NEW", color: "#dbeafe", image: "photo-1553062407-98eeb64c6a62" },
  { id: 5, name: "Premium Running Shoes", category: "Fashion", price: 3499, oldPrice: 4499, rating: 4.8, tag: "TOP RATED", color: "#fef3c7", image: "photo-1542291026-7eec264c27ff" },
  { id: 6, name: "Modern Desk Lamp", category: "Home", price: 1299, oldPrice: 1799, rating: 4.5, tag: "SALE", color: "#f3e8ff", image: "photo-1507473885765-e6ed057f782c" },
  { id: 7, name: "Essential Smart Watch", category: "Electronics", price: 4299, oldPrice: 5499, rating: 4.7, tag: "POPULAR", color: "#dcfce7", image: "photo-1523275335684-37898b6baf30" },
  { id: 8, name: "Everyday Sunglasses", category: "Accessories", price: 999, oldPrice: 1499, rating: 4.4, tag: "SALE", color: "#fce7f3", image: "photo-1511499767150-a48a237f0083" },
];

const categories = ["All Products", "Electronics", "Fashion", "Accessories", "Home"];

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Products");
  const [sort, setSort] = useState("featured");
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [mobileMenu, setMobileMenu] = useState(false);

  const filteredProducts = useMemo(() => {
    let list = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All Products" || product.category === category;
      return matchesSearch && matchesCategory;
    });

    if (sort === "low") list.sort((a, b) => a.price - b.price);
    if (sort === "high") list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [search, category, sort]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  function addToCart(product) {
    setCart((current) => {
      const found = current.find((item) => item.id === product.id);
      if (found) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
  }

  function toggleFavorite(id) {
    setFavorites((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  }

  return (
    <div className="app-shell">
      <div className="announcement">FREE SHIPPING ON ORDERS OVER ₹1,999</div>

      <header className="site-header">
        <button className="icon-button mobile-toggle" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Toggle menu">
          <Menu size={21} />
        </button>
        <Link to="/" className="brand">n<span>o</span>va.</Link>
        <nav className={mobileMenu ? "main-nav nav-open" : "main-nav"}>
          <a href="#home" onClick={() => setMobileMenu(false)}>Home</a>
          <a href="#products" onClick={() => setMobileMenu(false)}>Shop</a>
          <a href="#benefits" onClick={() => setMobileMenu(false)}>About</a>
        </nav>
        <div className="header-actions">
          <label className="header-search">
            <Search size={17} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." />
          </label>
          <button className="icon-button cart-button" aria-label="Shopping cart" onClick={() => document.getElementById("cart-panel")?.scrollIntoView({ behavior: "smooth" })}>
            <ShoppingBag size={21} />
            <span>Cart ({cartCount})</span>
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <span className="eyebrow"><span className="eyebrow-dot" /> THE EVERYDAY EDIT</span>
            <h1>Good things.<br />Better <em>living.</em></h1>
            <p>Thoughtfully picked essentials for your everyday life. Discover the little things that make a big difference.</p>
            <a className="primary-button" href="#products">Explore collection <ArrowRight size={17} /></a>
            <div className="hero-proof"><div className="avatar-stack"><span>R</span><span>A</span><span>S</span></div><span>Loved by 2,000+ happy customers</span></div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-frame">
              <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80" alt="Minimal modern watch" fetchPriority="high" />
            </div>
            <div className="floating-note"><span className="note-icon">✦</span><div><strong>Made for every day</strong><small>Style meets simplicity</small></div></div>
            <div className="hero-stamp">NOVA<br /><span>EST. 2026</span></div>
          </div>
        </section>

        <section className="benefits" id="benefits">
          <div><Truck size={23} /><span><strong>Free shipping</strong><small>On orders above ₹1,999</small></span></div>
          <div><ShieldCheck size={23} /><span><strong>Secure checkout</strong><small>Your details stay safe</small></span></div>
          <div><RefreshCw size={23} /><span><strong>Easy returns</strong><small>7-day return window</small></span></div>
        </section>

        <section className="products-section" id="products">
          <div className="section-heading">
            <div><span className="eyebrow">CURATED FOR YOU</span><h2>Find your <em>favorites.</em></h2><p>Everyday essentials, chosen with care.</p></div>
            <label className="sort-control">Sort by
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="rating">Top rated</option>
              </select>
            </label>
          </div>

          <div className="category-tabs">
            {categories.map((item) => <button key={item} className={category === item ? "category-tab active" : "category-tab"} onClick={() => setCategory(item)}>{item}</button>)}
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-image" style={{ backgroundColor: product.color }}>
                  <img src={`https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=700&q=75`} alt={product.name} loading="lazy" />
                  <span className="product-tag">{product.tag}</span>
                  <button className={favorites.includes(product.id) ? "favorite-button favorited" : "favorite-button"} onClick={() => toggleFavorite(product.id)} aria-label="Toggle favorite"><Heart size={18} fill={favorites.includes(product.id) ? "currentColor" : "none"} /></button>
                </div>
                <div className="product-info">
                  <span className="product-category">{product.category}</span>
                  <h3><Link to={`/products/${product.id}`}>{product.name}</Link></h3>
                  <div className="product-rating"><Star size={14} fill="currentColor" /> {product.rating} <span>({Math.floor(product.rating * 37)} reviews)</span></div>
                  <div className="product-bottom"><div><strong>₹{product.price.toLocaleString("en-IN")}</strong><del>₹{product.oldPrice.toLocaleString("en-IN")}</del></div><button className="add-button" onClick={() => addToCart(product)} aria-label={`Add ${product.name} to cart`}>+</button></div>
                </div>
              </article>
            ))}
          </div>
          {filteredProducts.length === 0 && <div className="empty-state">No products found. Try another search.</div>}
        </section>

        <section className="newsletter">
          <div><span className="eyebrow">A LITTLE SOMETHING EXTRA</span><h2>Good finds, straight to your inbox.</h2><p>Get first dibs on new drops and special offers.</p></div>
          <form onSubmit={(e) => { e.preventDefault(); alert("Thanks for subscribing!"); }}><input type="email" placeholder="Your email address" required /><button className="primary-button">Join us <ArrowRight size={16} /></button></form>
        </section>

        <section className="cart-section" id="cart-panel">
          <div className="section-heading"><div><span className="eyebrow">YOUR BAG</span><h2>Shopping <em>cart.</em></h2></div></div>
          {cart.length === 0 ? <p className="empty-cart">Your cart is waiting for something lovely. Add a product above!</p> : <>
            <div className="cart-list">{cart.map((item) => <div className="cart-item" key={item.id}><img src={`https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=120&q=70`} alt="" /><div className="cart-item-name"><strong>{item.name}</strong><small>₹{item.price.toLocaleString("en-IN")} each</small></div><div className="quantity-controls"><button onClick={() => setCart((old) => old.map((x) => x.id === item.id ? { ...x, quantity: Math.max(1, x.quantity - 1) } : x))}>−</button><span>{item.quantity}</span><button onClick={() => addToCart(item)}>+</button><button className="remove-button" onClick={() => setCart((old) => old.filter((x) => x.id !== item.id))}>Remove</button></div></div>)}</div>
            <div className="cart-total"><span>Subtotal</span><strong>₹{cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString("en-IN")}</strong></div>
          </>}
        </section>
      </main>

      <footer className="site-footer"><Link to="/" className="brand">n<span>o</span>va.</Link><p>Everyday essentials. Thoughtfully chosen.</p><small>© 2026 NOVA Store. Demo project for educational purposes.</small></footer>
    </div>
  );
}

export default App;
