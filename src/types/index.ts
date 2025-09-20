// Base user types
export interface User {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
  profile?: UserProfile;
}

export interface UserProfile {
  id: string;
  userId: string;
  avatar?: string;
  dateOfBirth?: Date;
  preferredFit?: 'slim' | 'regular' | 'comfort';
  preferredColors: string[];
  occasions: string[];
  totalSpent: number;
  totalOrders: number;
  loyaltyPoints: number;
}

// Product types
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  basePrice: number;
  categoryId: string;
  category: Category;
  images: ProductImage[];
  variants: ProductVariant[];
  fabrics: ProductFabric[];
  metaTitle?: string;
  metaDescription?: string;
  isActive: boolean;
  isFeatured: boolean;
  modelUrl?: string;
  modelConfig?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  altText?: string;
  isPrimary: boolean;
  sortOrder: number;
}

export interface ProductVariant {
  id: string;
  productId: string;
  name: string;
  type: string;
  value: string;
  priceAdjustment: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  children?: Category[];
}

// Fabric and customization types
export interface Fabric {
  id: string;
  name: string;
  description?: string;
  composition?: string;
  weight?: number;
  texture?: string;
  care?: string;
  pricePerMeter: number;
  color: string;
  pattern?: string;
  image?: string;
  stockQuantity: number;
  isActive: boolean;
}

export interface ProductFabric {
  productId: string;
  fabricId: string;
  fabric: Fabric;
  isDefault: boolean;
  priceAdjustment: number;
}

// Measurement types
export interface Measurement {
  id: string;
  userId: string;
  name: string;
  isDefault: boolean;
  chest?: number;
  waist?: number;
  hips?: number;
  shoulders?: number;
  armLength?: number;
  legLength?: number;
  neck?: number;
  createdAt: Date;
  updatedAt: Date;
}

// Order types
export type OrderStatus = 
  | 'PENDING'
  | 'CONFIRMED'
  | 'MEASUREMENTS_FINALIZED'
  | 'FABRIC_CUTTING'
  | 'STITCHING'
  | 'FINISHING'
  | 'QUALITY_CHECK'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'COMPLETED'
  | 'CANCELLED';

export type ServiceType = 'DIRECT_BUY' | 'VIDEO_CONSULTATION' | 'HOME_VISIT';

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  status: OrderStatus;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  shippingAddress?: Address;
  billingAddress?: Address;
  trackingNumber?: string;
  createdAt: Date;
  updatedAt: Date;
  shippedAt?: Date;
  deliveredAt?: Date;
  items: OrderItem[];
  statusHistory: OrderStatusHistory[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  product: Product;
  fabricId?: string;
  fabric?: Fabric;
  quantity: number;
  unitPrice: number;
  total: number;
  measurements?: Record<string, unknown>;
  notes?: string;
  serviceType: ServiceType;
  consultationId?: string;
}

export interface OrderStatusHistory {
  id: string;
  orderId: string;
  status: OrderStatus;
  notes?: string;
  createdAt: Date;
}

// Consultation types
export type ConsultationType = 'VIDEO' | 'HOME_VISIT';
export type ConsultationStatus = 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'RESCHEDULED';

export interface Consultation {
  id: string;
  userId: string;
  type: ConsultationType;
  status: ConsultationStatus;
  scheduledAt: Date;
  duration: number;
  notes?: string;
  tailorNotes?: string;
  meetingUrl?: string;
  address?: Record<string, unknown>;
  measurements?: Record<string, unknown>;
  recommendations?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Address type
export interface Address {
  id: string;
  userId: string;
  type: string;
  name: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault: boolean;
}

// Cart and wishlist types
export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  fabricId?: string;
  fabric?: Fabric;
  quantity: number;
  serviceType: ServiceType;
  measurements?: Measurement;
  notes?: string;
}

export interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  product: Product;
  addedAt: Date;
}

// Review type
export interface Review {
  id: string;
  userId: string;
  user: User;
  productId: string;
  rating: number;
  title?: string;
  comment?: string;
  images: string[];
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Style preferences
export interface StylePreference {
  id: string;
  userId: string;
  category: string;
  styles: string[];
  colors: string[];
  fabrics: string[];
}

// Form types for UI
export interface BookingFormData {
  serviceType: ServiceType;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  address?: Partial<Address>;
}

export interface CheckoutFormData {
  shippingAddress: Omit<Address, 'id' | 'userId'>;
  billingAddress?: Omit<Address, 'id' | 'userId'>;
  paymentMethod: 'card' | 'upi' | 'netbanking';
  paymentDetails: Record<string, unknown>;
}

// Analytics types
export interface PageView {
  id: string;
  page: string;
  userId?: string;
  sessionId: string;
  userAgent?: string;
  referer?: string;
  viewedAt: Date;
}

export interface ConversionEvent {
  id: string;
  type: string;
  userId?: string;
  sessionId: string;
  productId?: string;
  value?: number;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Search and filtering types
export interface ProductFilters {
  category?: string;
  priceRange?: [number, number];
  colors?: string[];
  fabrics?: string[];
  occasions?: string[];
  inStock?: boolean;
  featured?: boolean;
}

export interface SearchParams extends ProductFilters {
  q?: string;
  sortBy?: 'price' | 'name' | 'created' | 'popularity';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}