'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  PhotoIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';

// Mock data for products
const mockProducts = [
  {
    id: 1,
    name: 'Classic Navy Suit',
    category: 'Business Suits',
    price: 45000,
    stock: 15,
    status: 'Active',
    image: '/api/placeholder/100/100',
    description: 'Premium Italian wool suit perfect for business occasions',
    fabrics: ['Italian Wool', 'Cashmere Blend'],
    colors: ['Navy Blue', 'Charcoal Grey'],
    sizes: ['36R', '38R', '40R', '42R', '44R'],
    createdAt: '2025-09-10',
  },
  {
    id: 2,
    name: 'Wedding Sherwani',
    category: 'Wedding Wear',
    price: 85000,
    stock: 8,
    status: 'Active',
    image: '/api/placeholder/100/100',
    description: 'Luxurious gold embroidered sherwani for special occasions',
    fabrics: ['Silk', 'Brocade'],
    colors: ['Gold', 'Maroon', 'Royal Blue'],
    sizes: ['S', 'M', 'L', 'XL'],
    createdAt: '2025-09-08',
  },
  {
    id: 3,
    name: 'Casual Blazer',
    category: 'Casual Wear',
    price: 25000,
    stock: 22,
    status: 'Active',
    image: '/api/placeholder/100/100',
    description: 'Comfortable blazer for casual business meetings',
    fabrics: ['Cotton', 'Linen Blend'],
    colors: ['Grey', 'Navy', 'Brown'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    createdAt: '2025-09-05',
  },
  {
    id: 4,
    name: 'Designer Lehenga',
    category: 'Wedding Wear',
    price: 95000,
    stock: 3,
    status: 'Low Stock',
    image: '/api/placeholder/100/100',
    description: 'Intricately designed bridal lehenga with heavy embroidery',
    fabrics: ['Silk', 'Velvet'],
    colors: ['Red', 'Pink', 'Maroon'],
    sizes: ['XS', 'S', 'M', 'L'],
    createdAt: '2025-09-03',
  },
];

const categories = ['All', 'Business Suits', 'Wedding Wear', 'Casual Wear', 'Ethnic Wear'];
const statuses = ['All', 'Active', 'Low Stock', 'Out of Stock', 'Discontinued'];

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
  image: string;
  description: string;
  fabrics: string[];
  colors: string[];
  sizes: string[];
  createdAt: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Filter products based on search and filters
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || product.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Low Stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'Out of Stock':
        return 'bg-red-100 text-red-800';
      case 'Discontinued':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== id));
    }
  };

  return (
    <div className="p-2 pt-3 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Product Management</h1>
          <p className="text-neutral-600">Manage your product catalog, pricing, and inventory</p>
        </div>
        <Button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg shadow-sm transition-colors"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add New Product</span>
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          
          {/* Category Filter */}
          <div className="md:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          {/* Status Filter */}
          <div className="md:w-48">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          
          {/* Quick Add Button */}
          <div className="md:w-auto">
            <Button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
            >
              <PlusIcon className="h-4 w-4" />
              <span>Quick Add</span>
            </Button>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-neutral-600">
            Showing {filteredProducts.length} of {products.length} products
          </div>
          <div className="text-xs text-neutral-500">
            Click &quot;Add New Product&quot; or &quot;Quick Add&quot; to create products
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden"
          >
            {/* Product Image */}
            <div className="aspect-square bg-neutral-100 flex items-center justify-center">
              <PhotoIcon className="h-16 w-16 text-neutral-400" />
            </div>
            
            {/* Product Details */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-neutral-900 truncate">
                  {product.name}
                </h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(product.status)}`}>
                  {product.status}
                </span>
              </div>
              
              <p className="text-sm text-neutral-600 mb-2">{product.category}</p>
              <p className="text-sm text-neutral-500 mb-4 line-clamp-2">{product.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-xl font-bold text-primary-600">
                    ₹{product.price.toLocaleString()}
                  </span>
                  <p className="text-sm text-neutral-500">Stock: {product.stock} units</p>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex flex-wrap gap-1 mb-2">
                  {product.colors.slice(0, 3).map((color, idx) => (
                    <span key={idx} className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded">
                      {color}
                    </span>
                  ))}
                  {product.colors.length > 3 && (
                    <span className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded">
                      +{product.colors.length - 3} more
                    </span>
                  )}
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingProduct(product)}
                  className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors"
                >
                  <PencilIcon className="h-4 w-4" />
                  <span className="text-sm">Edit</span>
                </button>
                <button className="flex items-center justify-center px-3 py-2 bg-neutral-100 text-neutral-600 rounded-lg hover:bg-neutral-200 transition-colors">
                  <EyeIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="flex items-center justify-center px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <PhotoIcon className="mx-auto h-16 w-16 text-neutral-400 mb-4" />
          <h3 className="text-lg font-medium text-neutral-900 mb-2">No products found</h3>
          <p className="text-neutral-600 mb-4">
            {searchTerm || selectedCategory !== 'All' || selectedStatus !== 'All' 
              ? 'Try adjusting your search or filters'
              : 'Get started by adding your first product'
            }
          </p>
          <Button onClick={() => setShowAddModal(true)}>
            Add Product
          </Button>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <ProductModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={(productData) => {
            const newProduct = {
              ...productData,
              id: Date.now(),
              createdAt: new Date().toISOString().split('T')[0],
            };
            setProducts([...products, newProduct]);
            setShowAddModal(false);
          }}
        />
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <ProductModal
          isOpen={!!editingProduct}
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={(productData) => {
            setProducts(products.map(p => 
              p.id === editingProduct.id ? { ...productData, id: editingProduct.id } : p
            ));
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
}

// Product Modal Component
function ProductModal({ isOpen, product, onClose, onSave }: {
  isOpen: boolean;
  product?: Product | null;
  onClose: () => void;
  onSave: (product: Omit<Product, 'id'>) => void;
}) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    category: product?.category || 'Business Suits',
    price: product?.price || '',
    stock: product?.stock || '',
    status: product?.status || 'Active',
    description: product?.description || '',
    fabrics: product?.fabrics?.join(', ') || '',
    colors: product?.colors?.join(', ') || '',
    sizes: product?.sizes?.join(', ') || '',
    image: product?.image || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
      fabrics: formData.fabrics.split(',').map(s => s.trim()).filter(Boolean),
      colors: formData.colors.split(',').map(s => s.trim()).filter(Boolean),
      sizes: formData.sizes.split(',').map(s => s.trim()).filter(Boolean),
      image: '/api/placeholder/100/100',
      createdAt: new Date().toISOString(),
    };
    
    onSave(productData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] flex flex-col"
      >
        <div className="p-6 border-b border-neutral-200 flex-shrink-0">
          <h2 className="text-xl font-semibold text-neutral-900">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Category *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="Business Suits">Business Suits</option>
                <option value="Wedding Wear">Wedding Wear</option>
                <option value="Casual Wear">Casual Wear</option>
                <option value="Ethnic Wear">Ethnic Wear</option>
              </select>
            </div>
          </div>

          {/* Product Image Upload */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Product Images *
            </label>
            <div className="border-2 border-dashed border-neutral-300 rounded-lg p-4 hover:border-primary-500 transition-colors">
              {formData.image ? (
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <img 
                      src={formData.image} 
                      alt="Product preview" 
                      className="h-20 w-20 rounded-lg object-cover border border-neutral-200"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-neutral-900">Image uploaded successfully</p>
                    <p className="text-xs text-neutral-500">Click below to change image</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, image: '' })}
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-neutral-400" />
                  <div className="mt-4">
                    <span className="mt-2 block text-sm font-medium text-neutral-900">
                      Click to upload product images
                    </span>
                    <span className="mt-1 block text-sm text-neutral-500">
                      PNG, JPG up to 10MB (Multiple files supported)
                    </span>
                  </div>
                </div>
              )}
              <div className="mt-4">
                <label htmlFor="product-images" className="cursor-pointer inline-block w-full">
                  <input
                    id="product-images"
                    name="product-images"
                    type="file"
                    multiple
                    accept="image/*"
                    className="sr-only"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        // Create object URL for preview
                        const file = e.target.files[0];
                        const imageUrl = URL.createObjectURL(file);
                        setFormData({ ...formData, image: imageUrl });
                        console.log('Selected files:', e.target.files);
                      }
                    }}
                  />
                  <div className="bg-white border border-neutral-300 rounded-lg px-4 py-2 text-center hover:bg-neutral-50 transition-colors">
                    <span className="text-sm font-medium text-neutral-700">
                      {formData.image ? 'Change Images' : 'Choose Files'}
                    </span>
                  </div>
                </label>
              </div>
            </div>
            <p className="mt-2 text-xs text-neutral-500">
              Tip: Upload high-quality images for better product presentation. First image will be used as the main product image.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Price (₹) *
              </label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Stock Quantity *
              </label>
              <input
                type="number"
                required
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="Active">Active</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
                <option value="Discontinued">Discontinued</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Product description..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Fabrics (comma-separated)
            </label>
            <input
              type="text"
              value={formData.fabrics}
              onChange={(e) => setFormData({ ...formData, fabrics: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g., Cotton, Silk, Wool"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Colors (comma-separated)
            </label>
            <input
              type="text"
              value={formData.colors}
              onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g., Navy Blue, Black, Grey"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Sizes (comma-separated)
            </label>
            <input
              type="text"
              value={formData.sizes}
              onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g., S, M, L, XL"
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-neutral-600 hover:text-neutral-800 transition-colors"
            >
              Cancel
            </button>
            <Button type="submit">
              {product ? 'Update Product' : 'Add Product'}
            </Button>
          </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
