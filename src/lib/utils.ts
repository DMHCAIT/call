import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency: string = 'INR'): string {
  if (currency === 'INR') {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(price);
}

export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return dateObj.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  });
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return function (...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substr(2, 4).toUpperCase();
  return `MT${timestamp.slice(-6)}${random}`;
}

export function isValidIndianPincode(pincode: string): boolean {
  return /^[1-9][0-9]{5}$/.test(pincode);
}

export function isValidIndianPhone(phone: string): boolean {
  return /^[6-9]\d{9}$/.test(phone.replace(/\D/g, ''));
}

export function calculateServicePrice(basePrice: number, serviceType: string): number {
  switch (serviceType) {
    case 'VIDEO_CONSULTATION':
      return basePrice + 500;
    case 'HOME_VISIT':
      return basePrice + 1000;
    default:
      return basePrice;
  }
}

export function getServiceTypeLabel(serviceType: string): string {
  switch (serviceType) {
    case 'VIDEO_CONSULTATION':
      return 'Video Consultation';
    case 'HOME_VISIT':
      return 'Home Visit';
    case 'DIRECT_BUY':
    default:
      return 'Direct Buy';
  }
}

export function getOrderStatusLabel(status: string): string {
  const statusLabels: Record<string, string> = {
    PENDING: 'Order Placed',
    CONFIRMED: 'Order Confirmed',
    MEASUREMENTS_FINALIZED: 'Measurements Finalized',
    FABRIC_CUTTING: 'Fabric Cutting',
    STITCHING: 'Stitching in Progress',
    FINISHING: 'Finishing & Quality Check',
    QUALITY_CHECK: 'Quality Check',
    SHIPPED: 'Shipped',
    DELIVERED: 'Delivered',
    COMPLETED: 'Completed',
    CANCELLED: 'Cancelled'
  };
  return statusLabels[status] || status;
}

export function getOrderStatusProgress(status: string): number {
  const statusProgress: Record<string, number> = {
    PENDING: 10,
    CONFIRMED: 20,
    MEASUREMENTS_FINALIZED: 30,
    FABRIC_CUTTING: 40,
    STITCHING: 60,
    FINISHING: 80,
    QUALITY_CHECK: 90,
    SHIPPED: 95,
    DELIVERED: 100,
    COMPLETED: 100,
    CANCELLED: 0
  };
  return statusProgress[status] || 0;
}

export function isNCRArea(pincode: string): boolean {
  // Delhi, Gurgaon, Noida, Faridabad, Ghaziabad pincodes
  const ncrPincodes = [
    // Delhi
    /^11[0-9]{4}$/,
    // Gurgaon
    /^12[0-9]{4}$/,
    // Noida
    /^20[0-9]{4}$/,
    // Faridabad
    /^12[1-9]{4}$/,
    // Ghaziabad
    /^20[0-9]{4}$/
  ];
  
  return ncrPincodes.some(pattern => pattern.test(pincode));
}

export function generateConsultationUrl(consultationId: string): string {
  // This would integrate with your video conferencing service
  return `/consultation/video/${consultationId}`;
}

export function calculateEstimatedDelivery(serviceType: string, createdAt: Date): Date {
  const deliveryDays = {
    'DIRECT_BUY': 7,
    'VIDEO_CONSULTATION': 14,
    'HOME_VISIT': 21
  };
  
  const days = deliveryDays[serviceType as keyof typeof deliveryDays] || 14;
  const estimatedDate = new Date(createdAt);
  estimatedDate.setDate(estimatedDate.getDate() + days);
  
  return estimatedDate;
}

export function getRecommendationScore(user: any, product: any): number {
  let score = 0;
  
  // Style preferences match
  if (user?.stylePreferences?.some((pref: any) => 
    product.category?.name?.toLowerCase().includes(pref.category?.toLowerCase())
  )) {
    score += 30;
  }
  
  // Color preferences match
  if (user?.preferredColors?.some((color: string) =>
    product.name?.toLowerCase().includes(color.toLowerCase())
  )) {
    score += 20;
  }
  
  // Previous purchase history
  if (user?.orders?.length > 0) {
    score += 10;
  }
  
  // Product popularity
  if (product.isFeatured) {
    score += 15;
  }
  
  // Random factor for variety
  score += Math.random() * 25;
  
  return Math.min(score, 100);
}