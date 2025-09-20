import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// Cart Store
interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  image: string
  quantity: number
  serviceType: 'DIRECT_BUY' | 'VIDEO_CONSULTATION' | 'HOME_VISIT'
  fabricId?: string
  fabricName?: string
  measurements?: any
  notes?: string
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: Omit<CartItem, 'id'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  updateServiceType: (id: string, serviceType: CartItem['serviceType']) => void
  clearCart: () => void
  toggleCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (item) => {
        const id = Math.random().toString(36).substr(2, 9)
        set((state) => ({
          items: [...state.items, { ...item, id }]
        }))
      },
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== id)
        }))
      },
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }
        set((state) => ({
          items: state.items.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
        }))
      },
      updateServiceType: (id, serviceType) => {
        set((state) => ({
          items: state.items.map(item =>
            item.id === id ? { ...item, serviceType } : item
          )
        }))
      },
      clearCart: () => set({ items: [] }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          let itemPrice = item.price
          // Add service charges
          if (item.serviceType === 'VIDEO_CONSULTATION') itemPrice += 500
          if (item.serviceType === 'HOME_VISIT') itemPrice += 1000
          return total + (itemPrice * item.quantity)
        }, 0)
      }
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

// Wishlist Store
interface WishlistState {
  items: string[] // product IDs
  addItem: (productId: string) => void
  removeItem: (productId: string) => void
  isInWishlist: (productId: string) => boolean
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (productId) => {
        set((state) => ({
          items: state.items.includes(productId) 
            ? state.items 
            : [...state.items, productId]
        }))
      },
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter(id => id !== productId)
        }))
      },
      isInWishlist: (productId) => {
        return get().items.includes(productId)
      }
    }),
    {
      name: 'wishlist-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

// User Store
interface UserState {
  user: any | null
  setUser: (user: any) => void
  clearUser: () => void
  isAuthenticated: boolean
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: true }),
  clearUser: () => set({ user: null, isAuthenticated: false })
}))

// UI Store
interface UIState {
  sidebarOpen: boolean
  mobileMenuOpen: boolean
  toggleSidebar: () => void
  toggleMobileMenu: () => void
  closeSidebar: () => void
  closeMobileMenu: () => void
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: false,
  mobileMenuOpen: false,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
  closeSidebar: () => set({ sidebarOpen: false }),
  closeMobileMenu: () => set({ mobileMenuOpen: false })
}))