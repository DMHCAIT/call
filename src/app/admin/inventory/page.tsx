'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  PlusIcon,
  CubeIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  ArchiveBoxIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';

// Mock data for inventory
const mockInventoryItems = [
  {
    id: 1,
    name: 'Italian Wool Fabric',
    category: 'Fabrics',
    sku: 'IWF-001',
    quantity: 45,
    unit: 'meters',
    minStock: 20,
    maxStock: 100,
    cost: 2500,
    supplier: 'Milano Textiles',
    location: 'Warehouse A - Rack 1',
    status: 'In Stock',
    lastRestocked: '2025-09-10',
    notes: 'Premium quality Italian wool, navy blue color'
  },
  {
    id: 2,
    name: 'Cashmere Blend Fabric',
    category: 'Fabrics',
    sku: 'CBF-002',
    quantity: 15,
    unit: 'meters',
    minStock: 25,
    maxStock: 80,
    cost: 4500,
    supplier: 'Kashmir Mills',
    location: 'Warehouse A - Rack 2',
    status: 'Low Stock',
    lastRestocked: '2025-08-28',
    notes: 'Luxury cashmere blend, charcoal grey'
  },
  {
    id: 3,
    name: 'Mother of Pearl Buttons',
    category: 'Accessories',
    sku: 'MPB-003',
    quantity: 500,
    unit: 'pieces',
    minStock: 200,
    maxStock: 1000,
    cost: 15,
    supplier: 'Button House',
    location: 'Storage Room - Shelf B3',
    status: 'In Stock',
    lastRestocked: '2025-09-05',
    notes: 'Premium 15mm diameter buttons'
  },
  {
    id: 4,
    name: 'Silk Lining Fabric',
    category: 'Fabrics',
    sku: 'SLF-004',
    quantity: 8,
    unit: 'meters',
    minStock: 15,
    maxStock: 60,
    cost: 1200,
    supplier: 'Silk Traders Ltd',
    location: 'Warehouse B - Rack 3',
    status: 'Low Stock',
    lastRestocked: '2025-08-15',
    notes: 'Bemberg silk lining, multiple colors available'
  },
  {
    id: 5,
    name: 'Gold Thread',
    category: 'Embellishments',
    sku: 'GT-005',
    quantity: 120,
    unit: 'spools',
    minStock: 50,
    maxStock: 200,
    cost: 800,
    supplier: 'Zardozi Crafts',
    location: 'Storage Room - Shelf A1',
    status: 'In Stock',
    lastRestocked: '2025-09-12',
    notes: 'High quality gold thread for embroidery work'
  },
  {
    id: 6,
    name: 'Canvas Interfacing',
    category: 'Accessories',
    sku: 'CI-006',
    quantity: 0,
    unit: 'meters',
    minStock: 30,
    maxStock: 100,
    cost: 350,
    supplier: 'Tailoring Supplies Co',
    location: 'Warehouse A - Rack 4',
    status: 'Out of Stock',
    lastRestocked: '2025-07-20',
    notes: 'Canvas interfacing for suit construction'
  }
];

const categories = ['All', 'Fabrics', 'Accessories', 'Embellishments', 'Tools'];
const statusFilters = ['All', 'In Stock', 'Low Stock', 'Out of Stock'];

interface InventoryItem {
  id: number;
  name: string;
  category: string;
  sku: string;
  quantity: number;
  unit: string;
  minStock: number;
  maxStock: number;
  cost: number;
  supplier: string;
  location: string;
  status: string;
  lastRestocked: string;
  notes: string;
}

export default function InventoryPage() {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>(mockInventoryItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);

  // Filter items
  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock':
        return 'bg-green-100 text-green-800';
      case 'Low Stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'Out of Stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'In Stock':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'Low Stock':
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />;
      case 'Out of Stock':
        return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <CubeIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const calculateStatus = (quantity: number, minStock: number) => {
    if (quantity === 0) return 'Out of Stock';
    if (quantity <= minStock) return 'Low Stock';
    return 'In Stock';
  };

  const handleUpdateStock = (id: number, newQuantity: number) => {
    setInventoryItems(items => 
      items.map(item => 
        item.id === id 
          ? { ...item, quantity: newQuantity, status: calculateStatus(newQuantity, item.minStock) }
          : item
      )
    );
  };

  const handleDeleteItem = (id: number) => {
    if (confirm('Are you sure you want to delete this inventory item?')) {
      setInventoryItems(items => items.filter(item => item.id !== id));
    }
  };

  const lowStockItems = inventoryItems.filter(item => item.status === 'Low Stock' || item.status === 'Out of Stock');

  return (
    <div className="p-2 pt-3 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Inventory Management</h1>
          <p className="text-neutral-600">Track fabrics, accessories, and supplies</p>
        </div>
        <Button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Item</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Total Items</p>
              <p className="text-2xl font-bold text-neutral-900">{inventoryItems.length}</p>
            </div>
            <CubeIcon className="h-8 w-8 text-primary-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">In Stock</p>
              <p className="text-2xl font-bold text-green-600">
                {inventoryItems.filter(item => item.status === 'In Stock').length}
              </p>
            </div>
            <CheckCircleIcon className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Low Stock</p>
              <p className="text-2xl font-bold text-yellow-600">
                {inventoryItems.filter(item => item.status === 'Low Stock').length}
              </p>
            </div>
            <ExclamationTriangleIcon className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Out of Stock</p>
              <p className="text-2xl font-bold text-red-600">
                {inventoryItems.filter(item => item.status === 'Out of Stock').length}
              </p>
            </div>
            <ArchiveBoxIcon className="h-8 w-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-50 border border-yellow-200 rounded-xl p-4"
        >
          <div className="flex items-center space-x-2 mb-2">
            <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600" />
            <h3 className="font-semibold text-yellow-800">Low Stock Alert</h3>
          </div>
          <p className="text-yellow-700 text-sm mb-3">
            {lowStockItems.length} item(s) need restocking:
          </p>
          <div className="flex flex-wrap gap-2">
            {lowStockItems.map(item => (
              <span key={item.id} className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                {item.name} ({item.quantity} {item.unit})
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search items, SKU, or supplier..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
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
          <div className="md:w-48">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {statusFilters.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-900">Item</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-900">SKU</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-900">Category</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-900">Quantity</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-900">Status</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-900">Cost</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-900">Supplier</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {filteredItems.map((item, index) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-neutral-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(item.status)}
                      <div>
                        <div className="font-medium text-neutral-900">{item.name}</div>
                        <div className="text-sm text-neutral-500">{item.location}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm text-neutral-600">{item.sku}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-neutral-900">{item.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleUpdateStock(item.id, Number(e.target.value))}
                        className="w-20 px-2 py-1 text-sm border border-neutral-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-transparent"
                      />
                      <span className="text-sm text-neutral-500">{item.unit}</span>
                    </div>
                    <div className="text-xs text-neutral-400 mt-1">
                      Min: {item.minStock} | Max: {item.maxStock}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-neutral-900">₹{item.cost}</span>
                    <div className="text-xs text-neutral-500">per {item.unit}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-neutral-900">{item.supplier}</div>
                    <div className="text-xs text-neutral-500">Last: {item.lastRestocked}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setEditingItem(item)}
                        className="p-1 text-primary-600 hover:text-primary-700"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="p-1 text-red-600 hover:text-red-700"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <CubeIcon className="mx-auto h-16 w-16 text-neutral-400 mb-4" />
          <h3 className="text-lg font-medium text-neutral-900 mb-2">No inventory items found</h3>
          <p className="text-neutral-600 mb-4">
            {searchTerm || selectedCategory !== 'All' || selectedStatus !== 'All' 
              ? 'Try adjusting your search or filters'
              : 'Start by adding your first inventory item'
            }
          </p>
          <Button onClick={() => setShowAddModal(true)}>
            Add Item
          </Button>
        </div>
      )}

      {/* Add/Edit Item Modal */}
      {(showAddModal || editingItem) && (
        <InventoryModal
          isOpen={showAddModal || !!editingItem}
          item={editingItem}
          onClose={() => {
            setShowAddModal(false);
            setEditingItem(null);
          }}
          onSave={(itemData) => {
            if (editingItem) {
              setInventoryItems(items => 
                items.map(item => 
                  item.id === editingItem.id ? { ...itemData, id: editingItem.id } : item
                )
              );
              setEditingItem(null);
            } else {
              const newItem = {
                ...itemData,
                id: Math.max(...inventoryItems.map(i => i.id)) + 1,
              };
              setInventoryItems(items => [...items, newItem]);
              setShowAddModal(false);
            }
          }}
        />
      )}
    </div>
  );
}

// Inventory Modal Component
function InventoryModal({ isOpen, item, onClose, onSave }: {
  isOpen: boolean;
  item?: InventoryItem | null;
  onClose: () => void;
  onSave: (item: Omit<InventoryItem, 'id'>) => void;
}) {
  const [formData, setFormData] = useState({
    name: item?.name || '',
    category: item?.category || 'Fabrics',
    sku: item?.sku || '',
    quantity: item?.quantity || 0,
    unit: item?.unit || 'meters',
    minStock: item?.minStock || 10,
    maxStock: item?.maxStock || 100,
    cost: item?.cost || 0,
    supplier: item?.supplier || '',
    location: item?.location || '',
    notes: item?.notes || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const status = formData.quantity === 0 ? 'Out of Stock' : 
                  formData.quantity <= formData.minStock ? 'Low Stock' : 'In Stock';
    
    const itemData = {
      ...formData,
      status,
      lastRestocked: new Date().toISOString().split('T')[0],
    };
    
    onSave(itemData);
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
            {item ? 'Edit Inventory Item' : 'Add New Inventory Item'}
          </h2>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Item Name *
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
                SKU *
              </label>
              <input
                type="text"
                required
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
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
                <option value="Fabrics">Fabrics</option>
                <option value="Accessories">Accessories</option>
                <option value="Embellishments">Embellishments</option>
                <option value="Tools">Tools</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Unit
              </label>
              <select
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="meters">Meters</option>
                <option value="pieces">Pieces</option>
                <option value="spools">Spools</option>
                <option value="sets">Sets</option>
                <option value="kg">Kilograms</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Current Quantity *
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Minimum Stock Level *
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.minStock}
                onChange={(e) => setFormData({ ...formData, minStock: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Maximum Stock Level *
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.maxStock}
                onChange={(e) => setFormData({ ...formData, maxStock: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Cost per Unit (₹) *
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.cost}
                onChange={(e) => setFormData({ ...formData, cost: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Supplier
              </label>
              <input
                type="text"
                value={formData.supplier}
                onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., Warehouse A - Rack 1"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Notes
            </label>
            <textarea
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Additional notes about this item..."
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
              {item ? 'Update Item' : 'Add Item'}
            </Button>
          </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}