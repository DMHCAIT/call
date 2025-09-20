'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  PlusIcon,
  CalendarDaysIcon,
  VideoCameraIcon,
  HomeIcon,
  ClockIcon,
  UserIcon,
  PhoneIcon,
  CheckCircleIcon,
  XCircleIcon,
  MagnifyingGlassIcon,
  PencilIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';

// Mock data for consultations
const mockConsultations = [
  {
    id: 'CONS-001',
    customer: {
      name: 'Vikram Singh',
      email: 'vikram.singh@email.com',
      phone: '+91 98765 43210',
    },
    type: 'Video Consultation',
    date: '2025-09-18',
    time: '14:00',
    duration: 60,
    status: 'Scheduled',
    product: 'Wedding Sherwani',
    notes: 'Customer wants to discuss fabric options and embroidery designs for his upcoming wedding.',
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    address: null
  },
  {
    id: 'CONS-002',
    customer: {
      name: 'Meera Joshi',
      email: 'meera.joshi@email.com',
      phone: '+91 87654 32109',
    },
    type: 'Home Visit',
    date: '2025-09-18',
    time: '16:00',
    duration: 90,
    status: 'Scheduled',
    product: 'Saree Blouse',
    notes: 'Home visit for measurements and fabric selection. Customer prefers traditional designs.',
    meetingLink: null,
    address: '456 Park Street, Mumbai, Maharashtra 400001'
  },
  {
    id: 'CONS-003',
    customer: {
      name: 'Arjun Mehta',
      email: 'arjun.mehta@email.com',
      phone: '+91 76543 21098',
    },
    type: 'Video Consultation',
    date: '2025-09-19',
    time: '10:00',
    duration: 45,
    status: 'Scheduled',
    product: 'Casual Blazer',
    notes: 'Consultation for business casual wardrobe. Customer interested in multiple pieces.',
    meetingLink: 'https://meet.google.com/xyz-uvwx-yz',
    address: null
  },
  {
    id: 'CONS-004',
    customer: {
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 65432 10987',
    },
    type: 'Home Visit',
    date: '2025-09-17',
    time: '11:00',
    duration: 120,
    status: 'Completed',
    product: 'Wedding Lehenga',
    notes: 'Completed consultation and measurements taken. Customer very satisfied with fabric selection.',
    meetingLink: null,
    address: '789 Residency Road, Bangalore, Karnataka 560001'
  },
];

const consultationTypes = ['All', 'Video Consultation', 'Home Visit'];
const statusOptions = ['All', 'Scheduled', 'In Progress', 'Completed', 'Cancelled'];

interface Consultation {
  id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  type: string;
  date: string;
  time: string;
  duration: number;
  status: string;
  product: string;
  notes: string;
  meetingLink: string | null;
  address: string | null;
}

export default function ConsultationsPage() {
  const [consultations, setConsultations] = useState<Consultation[]>(mockConsultations);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Filter consultations
  const filteredConsultations = consultations.filter(consultation => {
    const matchesSearch = consultation.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         consultation.product.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || consultation.type === selectedType;
    const matchesStatus = selectedStatus === 'All' || consultation.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'Video Consultation' ? VideoCameraIcon : HomeIcon;
  };

  const handleStatusUpdate = (id: string, newStatus: string) => {
    setConsultations(consultations.map(consultation => 
      consultation.id === id ? { ...consultation, status: newStatus } : consultation
    ));
  };

  return (
    <div className="p-2 pt-3 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Consultation Management</h1>
          <p className="text-neutral-600">Schedule and manage video calls and home visits</p>
        </div>
        <Button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Schedule Consultation</span>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Total Scheduled</p>
              <p className="text-2xl font-bold text-neutral-900">
                {consultations.filter(c => c.status === 'Scheduled').length}
              </p>
            </div>
            <CalendarDaysIcon className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Video Calls</p>
              <p className="text-2xl font-bold text-neutral-900">
                {consultations.filter(c => c.type === 'Video Consultation').length}
              </p>
            </div>
            <VideoCameraIcon className="h-8 w-8 text-primary-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Home Visits</p>
              <p className="text-2xl font-bold text-neutral-900">
                {consultations.filter(c => c.type === 'Home Visit').length}
              </p>
            </div>
            <HomeIcon className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Completed</p>
              <p className="text-2xl font-bold text-neutral-900">
                {consultations.filter(c => c.status === 'Completed').length}
              </p>
            </div>
            <CheckCircleIcon className="h-8 w-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search consultations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="md:w-48">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {consultationTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="md:w-48">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Consultations List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredConsultations.map((consultation, index) => {
          const TypeIcon = getTypeIcon(consultation.type);
          return (
            <motion.div
              key={consultation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary-50 rounded-lg">
                    <TypeIcon className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900">{consultation.customer.name}</h3>
                    <p className="text-sm text-neutral-600">{consultation.type}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(consultation.status)}`}>
                  {consultation.status}
                </span>
              </div>

              {/* Details */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2 text-sm text-neutral-600">
                  <CalendarDaysIcon className="h-4 w-4" />
                  <span>{consultation.date} at {consultation.time}</span>
                  <span>({consultation.duration} mins)</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-neutral-600">
                  <UserIcon className="h-4 w-4" />
                  <span>Product: {consultation.product}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-neutral-600">
                  <PhoneIcon className="h-4 w-4" />
                  <span>{consultation.customer.phone}</span>
                </div>
              </div>

              {/* Notes */}
              <p className="text-sm text-neutral-700 bg-neutral-50 p-3 rounded-lg mb-4 line-clamp-2">
                {consultation.notes}
              </p>

              {/* Actions */}
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setSelectedConsultation(consultation);
                    setShowDetailModal(true);
                  }}
                  className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors"
                >
                  <span className="text-sm">View Details</span>
                </button>
                {consultation.status === 'Scheduled' && (
                  <>
                    {consultation.type === 'Video Consultation' && consultation.meetingLink && (
                      <a
                        href={consultation.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm"
                      >
                        Join Call
                      </a>
                    )}
                    <button
                      onClick={() => handleStatusUpdate(consultation.id, 'In Progress')}
                      className="px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm"
                    >
                      Start
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredConsultations.length === 0 && (
        <div className="text-center py-12">
          <CalendarDaysIcon className="mx-auto h-16 w-16 text-neutral-400 mb-4" />
          <h3 className="text-lg font-medium text-neutral-900 mb-2">No consultations found</h3>
          <p className="text-neutral-600 mb-4">
            {searchTerm || selectedType !== 'All' || selectedStatus !== 'All' 
              ? 'Try adjusting your search or filters'
              : 'Schedule your first consultation'
            }
          </p>
          <Button onClick={() => setShowAddModal(true)}>
            Schedule Consultation
          </Button>
        </div>
      )}

      {/* Add Consultation Modal */}
      {showAddModal && (
        <AddConsultationModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={(consultationData) => {
            const newConsultation = {
              ...consultationData,
              id: `CONS-${String(consultations.length + 1).padStart(3, '0')}`,
            };
            setConsultations([...consultations, newConsultation]);
            setShowAddModal(false);
          }}
        />
      )}

      {/* Consultation Detail Modal */}
      {showDetailModal && selectedConsultation && (
        <ConsultationDetailModal
          consultation={selectedConsultation}
          isOpen={showDetailModal}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedConsultation(null);
          }}
          onStatusUpdate={(newStatus) => {
            handleStatusUpdate(selectedConsultation.id, newStatus);
            setSelectedConsultation({ ...selectedConsultation, status: newStatus });
          }}
        />
      )}
    </div>
  );
}

// Add Consultation Modal
function AddConsultationModal({ isOpen, onClose, onSave }: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<Consultation, 'id'>) => void;
}) {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    type: 'Video Consultation',
    date: '',
    time: '',
    duration: 60,
    product: '',
    notes: '',
    address: '',
    meetingLink: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const consultationData = {
      customer: {
        name: formData.customerName,
        email: formData.customerEmail,
        phone: formData.customerPhone,
      },
      type: formData.type,
      date: formData.date,
      time: formData.time,
      duration: formData.duration,
      status: 'Scheduled',
      product: formData.product,
      notes: formData.notes,
      meetingLink: formData.type === 'Video Consultation' ? formData.meetingLink || null : null,
      address: formData.type === 'Home Visit' ? formData.address || null : null,
    };
    
    onSave(consultationData);
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
          <h2 className="text-xl font-semibold text-neutral-900">Schedule New Consultation</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Customer Name *
              </label>
              <input
                type="text"
                required
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Customer Email *
              </label>
              <input
                type="email"
                required
                value={formData.customerEmail}
                onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={formData.customerPhone}
                onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Consultation Type *
              </label>
              <select
                required
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="Video Consultation">Video Consultation</option>
                <option value="Home Visit">Home Visit</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Date *
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Time *
              </label>
              <input
                type="time"
                required
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Duration (minutes)
              </label>
              <select
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value={30}>30 minutes</option>
                <option value={45}>45 minutes</option>
                <option value={60}>60 minutes</option>
                <option value={90}>90 minutes</option>
                <option value={120}>120 minutes</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Product/Service
              </label>
              <input
                type="text"
                value={formData.product}
                onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., Wedding Suit, Business Blazer"
              />
            </div>
          </div>
          
          {formData.type === 'Video Consultation' && (
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Meeting Link
              </label>
              <input
                type="url"
                value={formData.meetingLink}
                onChange={(e) => setFormData({ ...formData, meetingLink: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="https://meet.google.com/..."
              />
            </div>
          )}
          
          {formData.type === 'Home Visit' && (
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Address *
              </label>
              <textarea
                rows={3}
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Complete address for home visit"
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Notes
            </label>
            <textarea
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Additional notes about the consultation..."
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
              Schedule Consultation
            </Button>
          </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

// Consultation Detail Modal
function ConsultationDetailModal({ consultation, isOpen, onClose, onStatusUpdate }: {
  consultation: Consultation;
  isOpen: boolean;
  onClose: () => void;
  onStatusUpdate: (status: string) => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-neutral-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-neutral-900">Consultation Details</h2>
            <button onClick={onClose} className="text-neutral-400 hover:text-neutral-600">
              <XCircleIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-neutral-900 mb-3">Customer Information</h3>
              <div className="space-y-2 text-sm">
                <div><strong>Name:</strong> {consultation.customer.name}</div>
                <div><strong>Email:</strong> {consultation.customer.email}</div>
                <div><strong>Phone:</strong> {consultation.customer.phone}</div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-neutral-900 mb-3">Consultation Details</h3>
              <div className="space-y-2 text-sm">
                <div><strong>Type:</strong> {consultation.type}</div>
                <div><strong>Date:</strong> {consultation.date}</div>
                <div><strong>Time:</strong> {consultation.time}</div>
                <div><strong>Duration:</strong> {consultation.duration} minutes</div>
                <div><strong>Product:</strong> {consultation.product}</div>
                <div><strong>Status:</strong> 
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full ${consultation.status === 'Completed' ? 'bg-green-100 text-green-800' : consultation.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {consultation.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {consultation.meetingLink && (
            <div>
              <h3 className="font-semibold text-neutral-900 mb-3">Meeting Link</h3>
              <a 
                href={consultation.meetingLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 underline"
              >
                {consultation.meetingLink}
              </a>
            </div>
          )}

          {consultation.address && (
            <div>
              <h3 className="font-semibold text-neutral-900 mb-3">Address</h3>
              <p className="text-sm text-neutral-700">{consultation.address}</p>
            </div>
          )}

          <div>
            <h3 className="font-semibold text-neutral-900 mb-3">Notes</h3>
            <p className="text-sm text-neutral-700 bg-neutral-50 p-3 rounded-lg">{consultation.notes}</p>
          </div>

          <div>
            <h3 className="font-semibold text-neutral-900 mb-3">Update Status</h3>
            <div className="flex items-center space-x-4">
              <select
                value={consultation.status}
                onChange={(e) => onStatusUpdate(e.target.value)}
                className="px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {statusOptions.slice(1).map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              <Button onClick={onClose}>Close</Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}