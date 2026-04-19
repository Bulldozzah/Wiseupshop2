import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  Plus,
  Minus,
  ArrowLeft,
  Package,
  Tag,
  Star,
  TrendingDown,
  MapPin,
  Barcode,
} from "lucide-react";

// Mock product data
const MOCK_PRODUCTS = [
  {
    gtin: "6001000000123",
    name: "Farm Fresh Free Range Eggs (30 pack)",
    brand: "Happy Hen",
    price: 89.99,
    lowestPrice: 79.99,
    storeName: "FreshMart",
    category: "Dairy & Eggs",
    inStock: true,
  },
  {
    gtin: "6001000000456",
    name: "Organic Whole Wheat Bread 700g",
    brand: "Baker's Choice",
    price: 24.5,
    lowestPrice: 22.0,
    storeName: "SuperSave",
    category: "Bakery",
    inStock: true,
  },
  {
    gtin: "6001000000789",
    name: "Full Cream Milk 2L",
    brand: "Green Valley",
    price: 32.99,
    lowestPrice: 29.99,
    storeName: "PriceLess",
    category: "Dairy & Eggs",
    inStock: true,
  },
  {
    gtin: "6001000001012",
    name: "Sunflower Cooking Oil 750ml",
    brand: "Golden Fields",
    price: 42.0,
    lowestPrice: 38.5,
    storeName: "FreshMart",
    category: "Pantry",
    inStock: false,
  },
  {
    gtin: "6001000001345",
    name: "Basmati Rice 2kg",
    brand: "Royal Harvest",
    price: 65.0,
    lowestPrice: 59.99,
    storeName: "SuperSave",
    category: "Pantry",
    inStock: true,
  },
  {
    gtin: "6001000001678",
    name: "Cheddar Cheese Block 400g",
    brand: "Farmhouse",
    price: 54.99,
    lowestPrice: 49.99,
    storeName: "PriceLess",
    category: "Dairy & Eggs",
    inStock: true,
  },
];

const CATEGORIES = ["All", "Dairy & Eggs", "Bakery", "Pantry", "Beverages"];

const ShopperSearchDemo = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [showScanner, setShowScanner] = useState(false);

  const filtered = MOCK_PRODUCTS.filter((p) => {
    const matchSearch =
      !searchTerm ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.gtin.includes(searchTerm) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory =
      selectedCategory === "All" || p.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  const cartCount = Object.values(cart).reduce((s, v) => s + v, 0);

  const addToCart = (gtin: string) =>
    setCart((prev) => ({ ...prev, [gtin]: (prev[gtin] || 0) + 1 }));
  const removeFromCart = (gtin: string) =>
    setCart((prev) => {
      const n = (prev[gtin] || 0) - 1;
      if (n <= 0) {
        const { [gtin]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [gtin]: n };
    });

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* ── Sticky Navbar ── */}
      <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="p-1.5 rounded-lg hover:bg-muted transition-colors"
            >
              <ArrowLeft className="h-4 w-4 text-muted-foreground" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <ShoppingCart className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-serif text-lg text-foreground">
                WiseShopper
              </span>
            </div>
          </div>
          <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
            <ShoppingCart className="h-5 w-5 text-foreground" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center leading-none min-w-[18px] px-1">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 py-6 pb-24">
        {/* ── Page Heading ── */}
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-2xl md:text-3xl text-foreground mb-6"
        >
          Search & Add Products
        </motion.h1>

        {/* ── Search Bar + Barcode ── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex gap-2 mb-4"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, brand or GTIN..."
              className="w-full h-10 pl-9 pr-3 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 transition-shadow"
            />
          </div>
          <button
            onClick={() => setShowScanner(!showScanner)}
            className={`h-10 w-10 flex-shrink-0 rounded-xl border flex items-center justify-center transition-colors ${
              showScanner
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            <Barcode className="h-4 w-4" />
          </button>
        </motion.div>

        {/* ── Barcode Scanner Placeholder ── */}
        {showScanner && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 rounded-xl border border-border bg-card p-4 text-center"
          >
            <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center mb-2">
              <Barcode className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground">
              Point your camera at a barcode to scan
            </p>
          </motion.div>
        )}

        {/* ── Category Pills ── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 mb-5 overflow-x-auto no-scrollbar pb-1"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* ── Stats Row ── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-3 gap-3 mb-6"
        >
          {[
            {
              icon: Package,
              label: "Products",
              value: filtered.length,
              color: "text-secondary",
            },
            {
              icon: TrendingDown,
              label: "Avg Savings",
              value: "12%",
              color: "text-primary",
            },
            {
              icon: MapPin,
              label: "Stores",
              value: "3",
              color: "text-accent",
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.08 }}
              className="rounded-xl border border-border bg-card p-3 shadow-[var(--shadow-card)]"
            >
              <stat.icon className={`h-4 w-4 ${stat.color} mb-1`} />
              <p className="text-[11px] text-muted-foreground">{stat.label}</p>
              <p className="text-lg font-bold text-foreground">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Product List ── */}
        <div className="space-y-3">
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                No products found
              </p>
            </div>
          )}

          {filtered.map((product, i) => (
            <motion.div
              key={product.gtin}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.06 }}
              className="rounded-xl border border-border bg-card p-3.5 shadow-[var(--shadow-card)] hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start gap-3">
                {/* Product Icon */}
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                  <Tag className="h-4 w-4 text-secondary" />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-foreground leading-snug truncate">
                    {product.name}
                  </h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {product.brand} &middot; {product.gtin}
                  </p>

                  {/* Price Row */}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-base font-bold text-primary">
                      R{product.price.toFixed(2)}
                    </span>
                    {product.lowestPrice < product.price && (
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-secondary/10 text-secondary text-[10px] font-medium">
                        <TrendingDown className="h-3 w-3" />R
                        {product.lowestPrice.toFixed(2)} @{" "}
                        {product.storeName}
                      </span>
                    )}
                  </div>

                  {/* Stock + Category */}
                  <div className="flex items-center gap-2 mt-1.5">
                    <span
                      className={`inline-block px-1.5 py-0.5 rounded-full text-[10px] font-medium ${
                        product.inStock
                          ? "bg-secondary/10 text-secondary"
                          : "bg-destructive/10 text-destructive"
                      }`}
                    >
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                    <span className="px-1.5 py-0.5 rounded-full bg-muted text-[10px] text-muted-foreground">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Add to Cart */}
                <div className="flex flex-col items-center gap-1 flex-shrink-0">
                  {cart[product.gtin] ? (
                    <>
                      <button
                        onClick={() => addToCart(product.gtin)}
                        className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                      <span className="text-sm font-bold text-foreground">
                        {cart[product.gtin]}
                      </span>
                      <button
                        onClick={() => removeFromCart(product.gtin)}
                        className="w-8 h-8 rounded-lg border border-border text-muted-foreground flex items-center justify-center hover:bg-muted transition-colors"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => addToCart(product.gtin)}
                      disabled={!product.inStock}
                      className="w-8 h-8 rounded-lg bg-secondary text-secondary-foreground flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-40"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* ── Mobile Bottom Nav ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-t border-border md:hidden">
        <div className="max-w-2xl mx-auto px-4 py-2 flex items-center justify-around">
          {[
            { icon: Search, label: "Search", active: true },
            { icon: ShoppingCart, label: "Cart", active: false },
            { icon: Star, label: "Lists", active: false },
            { icon: MapPin, label: "Stores", active: false },
          ].map((item) => (
            <button
              key={item.label}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors ${
                item.active
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopperSearchDemo;
