'use client';

import { 
  CheckCircleIcon, 
  ExclamationTriangleIcon, 
  XCircleIcon, 
  InformationCircleIcon 
} from '@heroicons/react/24/outline';

// Simple toast notification system
let toastContainer: HTMLElement | null = null;

const createToastContainer = () => {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'fixed top-4 right-4 z-50 space-y-2';
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
};

const createToast = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
  const container = createToastContainer();
  
  const toast = document.createElement('div');
  toast.className = `
    max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto 
    flex ring-1 ring-black ring-opacity-5 transform transition-all duration-300 
    translate-x-full opacity-0
  `;
  
  const colors = {
    success: { border: 'border-l-green-500', icon: 'text-green-500' },
    error: { border: 'border-l-red-500', icon: 'text-red-500' },
    warning: { border: 'border-l-yellow-500', icon: 'text-yellow-500' },
    info: { border: 'border-l-blue-500', icon: 'text-blue-500' }
  };
  
  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  };
  
  toast.innerHTML = `
    <div class="flex-1 w-0 p-4 border-l-4 ${colors[type].border}">
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <span class="${colors[type].icon} text-lg">${icons[type]}</span>
        </div>
        <div class="ml-3 flex-1">
          <p class="text-sm font-medium text-gray-900">${message}</p>
        </div>
      </div>
    </div>
  `;
  
  container.appendChild(toast);
  
  // Animate in
  setTimeout(() => {
    toast.classList.remove('translate-x-full', 'opacity-0');
  }, 10);
  
  // Auto remove after 4 seconds
  setTimeout(() => {
    toast.classList.add('translate-x-full', 'opacity-0');
    setTimeout(() => {
      if (container.contains(toast)) {
        container.removeChild(toast);
      }
    }, 300);
  }, 4000);
};

// Custom toast functions
export const showToast = {
  success: (message: string) => createToast(message, 'success'),
  error: (message: string) => createToast(message, 'error'),
  warning: (message: string) => createToast(message, 'warning'),
  info: (message: string) => createToast(message, 'info'),
};

// Toast provider component (empty since we use imperative API)
const ToastProvider = () => {
  return null;
};

export default ToastProvider;