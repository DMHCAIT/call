// API utilities for server-side operations
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export { prisma }

// Error handling utility
export class ApiError extends Error {
  statusCode: number
  
  constructor(message: string, statusCode: number = 400) {
    super(message)
    this.statusCode = statusCode
  }
}

// API response wrapper
export function apiResponse<T>(data: T, message: string = 'Success') {
  return {
    success: true,
    message,
    data
  }
}

export function apiError(message: string, statusCode: number = 400) {
  return {
    success: false,
    message,
    statusCode
  }
}

// Authentication middleware - placeholder until next-auth is installed
export async function requireAuth(req: NextApiRequest, res: NextApiResponse) {
  // Placeholder implementation - replace with actual getServerSession after installing next-auth
  const session: any = null // await getServerSession(req, res, {})
  
  if (!session?.user?.email) {
    res.status(401).json(apiError('Authentication required', 401))
    return null
  }
  
  // Get user from database
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      profile: true,
      measurements: true,
      stylePreferences: true
    }
  })
  
  if (!user) {
    res.status(401).json(apiError('User not found', 401))
    return null
  }
  
  return user
}

// Admin authentication middleware
export async function requireAdmin(req: NextApiRequest, res: NextApiResponse) {
  const user = await requireAuth(req, res)
  
  if (!user) return null
  
  // Check if user has admin role (you can implement this based on your needs)
  if (user.email !== process.env.ADMIN_EMAIL) {
    res.status(403).json(apiError('Admin access required', 403))
    return null
  }
  
  return user
}

// Pagination helper
export function getPagination(req: NextApiRequest) {
  const page = parseInt(req.query.page as string) || 1
  const limit = parseInt(req.query.limit as string) || 10
  const skip = (page - 1) * limit
  
  return { page, limit, skip }
}

// Search and filter helpers
export function buildWhereClause(query: any) {
  const where: any = {}
  
  // Search by name or description
  if (query.search) {
    where.OR = [
      { name: { contains: query.search, mode: 'insensitive' } },
      { description: { contains: query.search, mode: 'insensitive' } }
    ]
  }
  
  // Filter by category
  if (query.category) {
    where.category = { slug: query.category }
  }
  
  // Filter by price range
  if (query.minPrice || query.maxPrice) {
    where.basePrice = {}
    if (query.minPrice) where.basePrice.gte = parseFloat(query.minPrice)
    if (query.maxPrice) where.basePrice.lte = parseFloat(query.maxPrice)
  }
  
  // Filter by featured products
  if (query.featured === 'true') {
    where.isFeatured = true
  }
  
  // Only active products
  where.isActive = true
  
  return where
}

// Image upload helper
export function validateImageUpload(file: any) {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
  const maxSize = 5 * 1024 * 1024 // 5MB
  
  if (!allowedTypes.includes(file.type)) {
    throw new ApiError('Invalid file type. Only JPEG, PNG, and WebP are allowed.')
  }
  
  if (file.size > maxSize) {
    throw new ApiError('File too large. Maximum size is 5MB.')
  }
  
  return true
}

// Email utilities
export async function sendEmail(to: string, subject: string, html: string) {
  // This would integrate with your email service (Nodemailer, SendGrid, etc.)
  console.log(`Sending email to ${to}: ${subject}`)
  // Implementation depends on your email service
}

// SMS utilities
export async function sendSMS(to: string, message: string) {
  // This would integrate with Twilio or another SMS service
  console.log(`Sending SMS to ${to}: ${message}`)
  // Implementation depends on your SMS service
}

// Notification helpers
export async function sendAppointmentReminder(consultation: any) {
  const message = `Reminder: Your ${consultation.type.toLowerCase()} consultation is scheduled for ${new Date(consultation.scheduledAt).toLocaleString()}`
  
  // Send email
  await sendEmail(
    consultation.user.email,
    'Consultation Reminder - My Tailor',
    `<p>${message}</p>`
  )
  
  // Send SMS if phone number available
  if (consultation.user.phone) {
    await sendSMS(consultation.user.phone, message)
  }
}

export async function sendOrderStatusUpdate(order: any, newStatus: string) {
  const statusMessage = getOrderStatusMessage(newStatus)
  
  await sendEmail(
    order.user.email,
    `Order Update - ${order.orderNumber}`,
    `<p>Your order ${order.orderNumber} has been updated to: ${statusMessage}</p>`
  )
  
  if (order.user.phone) {
    await sendSMS(
      order.user.phone,
      `Order ${order.orderNumber}: ${statusMessage}`
    )
  }
}

function getOrderStatusMessage(status: string): string {
  const messages: Record<string, string> = {
    'CONFIRMED': 'Your order has been confirmed and will be processed soon.',
    'MEASUREMENTS_FINALIZED': 'Your measurements have been finalized.',
    'FABRIC_CUTTING': 'We have started cutting your fabric.',
    'STITCHING': 'Your garment is being stitched.',
    'FINISHING': 'Final touches are being added to your garment.',
    'SHIPPED': 'Your order has been shipped and is on its way!',
    'DELIVERED': 'Your order has been delivered. Thank you for choosing My Tailor!'
  }
  
  return messages[status] || 'Your order status has been updated.'
}

// Analytics helpers
export async function trackEvent(
  type: string,
  userId?: string,
  sessionId?: string,
  metadata?: any
) {
  try {
    await prisma.conversionEvent.create({
      data: {
        type,
        userId,
        sessionId: sessionId || 'anonymous',
        metadata: metadata || {}
      }
    })
  } catch (error) {
    console.error('Error tracking event:', error)
  }
}

export async function trackPageView(
  page: string,
  userId?: string,
  sessionId?: string,
  req?: NextApiRequest
) {
  try {
    await prisma.pageView.create({
      data: {
        page,
        userId,
        sessionId: sessionId || 'anonymous',
        userAgent: req?.headers['user-agent'],
        referer: req?.headers['referer'] as string
      }
    })
  } catch (error) {
    console.error('Error tracking page view:', error)
  }
}

// Helper for generating secure random tokens
export function generateSecureToken(length: number = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}