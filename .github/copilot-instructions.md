# My Tailor - Custom Instructions

## Project Overview
My Tailor is a sophisticated e-commerce platform for bespoke tailoring services featuring:
- Custom-fit clothing with online consultations
- Video consultations and home visits in NCR region
- Advanced personalization and customer profiles
- 3D product visualization
- Comprehensive admin dashboard and CRM

## Technology Stack
- **Frontend**: Next.js 15 with TypeScript, Tailwind CSS
- **Database**: Prisma with PostgreSQL
- **Authentication**: Auth0
- **UI Components**: Custom components with Headless UI
- **3D Visualization**: Three.js with React Three Fiber
- **Animation**: Framer Motion
- **Forms**: React Hook Form with Yup validation

## Project Structure
```
src/
├── app/                 # Next.js App Router pages
├── components/
│   ├── layout/         # Header, Footer, Layout
│   ├── product/        # Product-related components
│   └── ui/            # Reusable UI components
├── hooks/             # Custom React hooks
├── lib/              # Utility functions and configurations
└── types/            # TypeScript type definitions
```

## Key Features Implementation Status
- [x] Project setup with Next.js, TypeScript, Tailwind CSS
- [x] Database schema with comprehensive models
- [x] Elegant design system with proper typography
- [x] Responsive header and footer components
- [x] Beautiful homepage with hero section
- [ ] Product catalog with 3D visualization
- [ ] User authentication and profiles
- [ ] Consultation booking system
- [ ] Shopping cart and checkout
- [ ] Admin dashboard and CRM
- [ ] Payment integration
- [ ] Order tracking and management

## Design Guidelines
- **Colors**: Deep navy blue (#1e3a8a) primary, refined gold (#d4af37) accent
- **Typography**: Playfair Display for headings, Inter for body text
- **Background**: Pure white (#FFFFFF) with soft black (#222222) text
- **Buttons**: Primary solid, secondary ghost style
- **Animations**: Subtle fade-ins and slide-ups with Framer Motion

## Development Notes
- Use the established design system colors and typography
- Follow the component structure with proper TypeScript types
- Implement responsive design for all components
- Use Prisma for all database operations
- Maintain consistent spacing and layout patterns