# My Tailor - Bespoke Tailoring Platform

A sophisticated e-commerce platform for bespoke tailoring services, offering custom-fit clothing with online consultations, video consultations, and home visits in the NCR region.

## 🎯 Features

### Core Functionality
- **Custom Product Catalog** - Suits, ethnic wear, wedding attire, and casual wear
- **3D Product Visualization** - Interactive 3D models with fabric selection
- **Multiple Service Types** - Direct buy, video consultation, and home visits
- **Advanced Personalization** - Customer profiles, measurements, and style preferences

### Enhanced User Experience
- **Comprehensive Customer Profiles** - Saved measurements, style preferences, wishlist
- **AI-Powered Recommendations** - Personalized product suggestions
- **Interactive Fabric Visualizer** - Real-time fabric and color selection on 3D models
- **Integrated Tailor Calendar** - Booking system for consultations and home visits

### Business Management
- **Admin Dashboard & CRM** - Complete business intelligence and customer management
- **Inventory Management** - Real-time fabric and accessory stock tracking
- **Dynamic Pricing Module** - Automated pricing with add-on costs
- **Advanced Analytics** - Conversion tracking, customer metrics, and reporting

### Post-Purchase Experience
- **Detailed Order Tracking** - Multi-step status updates from order to delivery
- **Customer Photo Gallery** - User-generated content and reviews
- **Alteration Request System** - Post-delivery alteration management

## 🛠️ Technology Stack

- **Frontend**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Database**: Prisma with PostgreSQL
- **Authentication**: Auth0
- **3D Visualization**: Three.js with React Three Fiber
- **Animation**: Framer Motion
- **Forms**: React Hook Form with Yup validation
- **UI Components**: Custom components with Headless UI

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL database (for production)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd my-tailor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure the following variables:
   - `DATABASE_URL` - PostgreSQL connection string
   - `AUTH0_SECRET` - Auth0 secret key
   - `AUTH0_BASE_URL` - Application base URL
   - `AUTH0_ISSUER_BASE_URL` - Auth0 domain
   - `AUTH0_CLIENT_ID` - Auth0 application client ID
   - `AUTH0_CLIENT_SECRET` - Auth0 application client secret

4. **Set up the database**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Homepage
├── components/
│   ├── layout/         # Header, Footer, Layout components
│   ├── product/        # Product-related components
│   └── ui/             # Reusable UI components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and configurations
├── types/              # TypeScript type definitions
└── prisma/
    └── schema.prisma   # Database schema
```

## 🎨 Design System

### Color Palette
- **Primary**: Deep Navy Blue (#1e3a8a)
- **Accent**: Refined Gold (#d4af37)
- **Background**: Pure White (#FFFFFF)
- **Text**: Soft Black (#222222)

### Typography
- **Headings**: Playfair Display (serif)
- **Body Text**: Inter (sans-serif)

### Components
- **Buttons**: Primary solid, secondary ghost style
- **Animations**: Subtle fade-ins and slide-ups with Framer Motion

## 🚧 Development Status

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

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email hello@mytailor.com or create an issue in this repository.
