import { z } from 'zod'

// User Registration Schema
export const userRegistrationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  password: z.string().min(8, 'Password must be at least 8 characters')
})

// User Profile Schema
export const userProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  dateOfBirth: z.string().optional(),
  preferredFit: z.enum(['slim', 'regular', 'comfort']).optional(),
  preferredColors: z.array(z.string()).optional(),
  occasions: z.array(z.string()).optional()
})

// Measurement Schema
export const measurementSchema = z.object({
  name: z.string().min(1, 'Measurement name is required'),
  chest: z.number().positive().optional(),
  waist: z.number().positive().optional(),
  hips: z.number().positive().optional(),
  shoulders: z.number().positive().optional(),
  armLength: z.number().positive().optional(),
  legLength: z.number().positive().optional(),
  neck: z.number().positive().optional(),
  isDefault: z.boolean().default(false)
})

// Address Schema
export const addressSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  line1: z.string().min(5, 'Address line 1 is required'),
  line2: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  pincode: z.string().min(6, 'Pincode must be 6 digits').max(6, 'Pincode must be 6 digits'),
  country: z.string().default('India'),
  type: z.enum(['shipping', 'billing']).default('shipping'),
  isDefault: z.boolean().default(false)
})

// Consultation Booking Schema
export const consultationBookingSchema = z.object({
  type: z.enum(['VIDEO', 'HOME_VISIT']),
  scheduledAt: z.string().refine((date: string) => new Date(date) > new Date(), {
    message: 'Scheduled time must be in the future'
  }),
  notes: z.string().optional(),
  address: z.object({
    line1: z.string().min(5, 'Address is required'),
    line2: z.string().optional(),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State is required'),
    pincode: z.string().min(6, 'Pincode is required')
  }).optional()
}).refine((data: any) => {
  if (data.type === 'HOME_VISIT' && !data.address) {
    return false
  }
  return true
}, {
  message: 'Address is required for home visits',
  path: ['address']
})

// Product Review Schema
export const reviewSchema = z.object({
  rating: z.number().min(1, 'Rating is required').max(5, 'Rating cannot exceed 5'),
  title: z.string().min(5, 'Title must be at least 5 characters').optional(),
  comment: z.string().min(10, 'Comment must be at least 10 characters').optional(),
  images: z.array(z.string()).optional()
})

// Order Schema
export const orderSchema = z.object({
  items: z.array(z.object({
    productId: z.string(),
    fabricId: z.string().optional(),
    quantity: z.number().positive(),
    serviceType: z.enum(['DIRECT_BUY', 'VIDEO_CONSULTATION', 'HOME_VISIT']),
    measurements: z.any().optional(),
    notes: z.string().optional()
  })),
  shippingAddress: addressSchema,
  billingAddress: addressSchema.optional(),
  consultationId: z.string().optional()
})

// Contact Form Schema
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number is required'),
  subject: z.string().min(5, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters')
})

// Newsletter Schema
export const newsletterSchema = z.object({
  email: z.string().email('Invalid email address')
})

// Type exports
export type UserRegistration = z.infer<typeof userRegistrationSchema>
export type UserProfile = z.infer<typeof userProfileSchema>
export type Measurement = z.infer<typeof measurementSchema>
export type Address = z.infer<typeof addressSchema>
export type ConsultationBooking = z.infer<typeof consultationBookingSchema>
export type ProductReview = z.infer<typeof reviewSchema>
export type OrderData = z.infer<typeof orderSchema>
export type ContactForm = z.infer<typeof contactFormSchema>
export type Newsletter = z.infer<typeof newsletterSchema>