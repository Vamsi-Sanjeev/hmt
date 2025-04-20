import { useState } from 'react';
import { Search, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import productsData from '../data/products.json';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface MarketplacePageProps {
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

export default function MarketplacePage({ addToast }: MarketplacePageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { state: cartState, dispatch: cartDispatch } = useCart();
  
  const categories = ['All', ...new Set(productsData.products.map(product => product.category))];

  const handleAddToCart = (product: Product) => {
    cartDispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        artisanShare: Math.floor(product.price * 0.9), // 90% goes to artisan
        quantity: 1,
      },
    });
    addToast(`${product.name} added to cart`, 'success');
  };

  const filteredProducts = productsData.products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-8">
      <div className="pattern-bg rounded-xl p-8 mb-8">
        <h1 className="text-3xl font-bold mb-4">Artisanal Marketplace</h1>
        <p className="text-gray-600 max-w-2xl">
          Discover unique handcrafted pieces that blend traditional craftsmanship with contemporary design.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search products..."
            className="input-field pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            className="input-field md:w-48"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          <div className="relative">
            <ShoppingCart className="text-gray-600" />
            <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartState.items.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div 
            key={product.id} 
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
          >
            <div className="relative h-64">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
              
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm">
                    {product.category}
                  </span>
                  <p className="text-2xl font-bold">₹{product.price.toLocaleString()}</p>
                </div>
                
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-gray-500 text-center">
                    ₹{Math.floor(product.price * 0.9).toLocaleString()} goes to artisan
                  </p>
                  <button 
                    className="btn-primary w-full"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}