import React, { useState, useMemo } from 'react';
import { Search, ShoppingCart, Plus, Minus, Filter, Star } from 'lucide-react';
//just dummy component not fully dynamic one can use flipkar grocery api(or any other) to make dynamic
const Grocery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState({});
  const [sortBy, setSortBy] = useState('name');

  // Sample grocery data
  const groceryItems = [
    { id: 1, name: 'Fresh Apples', category: 'Fruits', price: 120, unit: 'kg', rating: 4.5, image: '🍎', inStock: true, discount: 10 },
    { id: 2, name: 'Bananas', category: 'Fruits', price: 60, unit: 'dozen', rating: 4.3, image: '🍌', inStock: true, discount: 0 },
    { id: 3, name: 'Carrots', category: 'Vegetables', price: 40, unit: 'kg', rating: 4.4, image: '🥕', inStock: true, discount: 15 },
    { id: 4, name: 'Broccoli', category: 'Vegetables', price: 80, unit: 'kg', rating: 4.2, image: '🥦', inStock: true, discount: 0 },
    { id: 5, name: 'Whole Milk', category: 'Dairy', price: 55, unit: 'liter', rating: 4.6, image: '🥛', inStock: true, discount: 5 },
    { id: 6, name: 'Greek Yogurt', category: 'Dairy', price: 180, unit: '500g', rating: 4.7, image: '🥛', inStock: false, discount: 0 },
    { id: 7, name: 'Brown Bread', category: 'Bakery', price: 35, unit: 'loaf', rating: 4.1, image: '🍞', inStock: true, discount: 0 },
    { id: 8, name: 'Croissants', category: 'Bakery', price: 150, unit: '6 pack', rating: 4.4, image: '🥐', inStock: true, discount: 20 },
    { id: 9, name: 'Chicken Breast', category: 'Meat', price: 320, unit: 'kg', rating: 4.5, image: '🍗', inStock: true, discount: 0 },
    { id: 10, name: 'Salmon Fillet', category: 'Seafood', price: 680, unit: 'kg', rating: 4.8, image: '🐟', inStock: true, discount: 25 },
    { id: 11, name: 'Basmati Rice', category: 'Grains', price: 90, unit: 'kg', rating: 4.3, image: '🍚', inStock: true, discount: 0 },
    { id: 12, name: 'Pasta', category: 'Grains', price: 85, unit: '500g', rating: 4.2, image: '🍝', inStock: true, discount: 10 }
  ];

  const categories = ['All', 'Fruits', 'Vegetables', 'Dairy', 'Bakery', 'Meat', 'Seafood', 'Grains'];

  // Filter and sort items
  const filteredItems = useMemo(() => {
    let items = groceryItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    return items.sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        default: return a.name.localeCompare(b.name);
      }
    });
  }, [searchTerm, selectedCategory, sortBy]);

  const addToCart = (itemId) => {
    setCart(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const removeFromCart = (itemId) => {
    setCart(prev => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0)
    }));
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  };

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((total, [itemId, quantity]) => {
      const item = groceryItems.find(i => i.id === parseInt(itemId));
      if (item && quantity > 0) {
        const discountedPrice = item.price * (1 - item.discount / 100);
        return total + (discountedPrice * quantity);
      }
      return total;
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Fresh Groceries</h1>
          <p className="text-xl opacity-90">Get fresh groceries delivered to your doorstep</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for groceries..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-3">
              <select
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              <select
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Shopping Cart Summary */}
        {getTotalItems() > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-800">
                  {getTotalItems()} items in cart
                </span>
              </div>
              <div className="text-green-800 font-bold text-lg">
                ₹{getTotalPrice().toFixed(2)}
              </div>
            </div>
          </div>
        )}

        {/* Category Chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-orange-500'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="mb-4 text-gray-600">
          Showing {filteredItems.length} products
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map(item => {
            const discountedPrice = item.price * (1 - item.discount / 100);
            const cartQuantity = cart[item.id] || 0;
            
            return (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {/* Product Image */}
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <span className="text-6xl">{item.image}</span>
                  {item.discount > 0 && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                      {item.discount}% OFF
                    </div>
                  )}
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white font-bold">Out of Stock</span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{item.category}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">{item.rating}</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl font-bold text-orange-600">
                      ₹{discountedPrice.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500">per {item.unit}</span>
                    {item.discount > 0 && (
                      <span className="text-sm text-gray-400 line-through">
                        ₹{item.price.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Add to Cart Controls */}
                  {item.inStock ? (
                    <div className="flex items-center justify-between">
                      {cartQuantity === 0 ? (
                        <button
                          onClick={() => addToCart(item.id)}
                          className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors font-medium"
                        >
                          Add to Cart
                        </button>
                      ) : (
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-semibold text-lg">{cartQuantity}</span>
                          <button
                            onClick={() => addToCart(item.id)}
                            className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      disabled
                      className="w-full bg-gray-300 text-gray-500 py-2 px-4 rounded-lg cursor-not-allowed"
                    >
                      Out of Stock
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Checkout Button */}
        {getTotalItems() > 0 && (
          <div className="fixed bottom-6 right-6">
            <button className="bg-green-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-600 transition-colors font-semibold">
              Checkout ({getTotalItems()})
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Grocery;