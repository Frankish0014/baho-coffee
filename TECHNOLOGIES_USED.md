# Technologies & Languages Used in Baho Coffee Website

This document provides a comprehensive breakdown of all technologies, languages, frameworks, and services used in the Baho Coffee website, classified by their role and purpose.

---

## 📋 **Programming Languages**

### **Primary Language**
- **TypeScript** - Main programming language for both frontend and backend
  - Used for type safety and better code maintainability
  - Target: ES2017
  - Strict mode enabled 

 **Markup & Styling Languages**
- **HTML** - Structure (via JSX/TSX)
- **CSS** - Styling (via Tailwind CSS)
- **JavaScript** - Runtime (via Node.js and React)

---

 **Frontend Technologies**

 **Core Framework**
- **Next.js 15** (App Router) 
  - React framework for production
  - Server-Side Rendering (SSR)
  - Static Site Generation (SSG)
  - API Routes
  - Image optimization
  - Built-in routing

### **UI Library**
- **React 19.2.3**
  - Component-based UI library
  - React DOM 19.2.3
  - JSX/TSX syntax

### **Styling & Design**
- **Tailwind CSS 3.4.18**
  - Utility-first CSS framework
  - Custom color palette (primary, coffee)
  - Dark mode support
  - Responsive design utilities
- **PostCSS 8.5.6**
  - CSS processing
- **Autoprefixer 10.4.22**
  - Automatic vendor prefixing

### **Animations & Interactions**
- **Framer Motion 11.18.2**
  - Animation library for React
  - Page transitions
  - Component animations
  - Scroll animations
- **React Intersection Observer 9.5.3**
  - Scroll-triggered animations
  - Lazy loading detection

### **Icons & Visual Elements**
- **Lucide React 0.468.0**
  - Icon library
  - Used throughout UI components
- **React Icons 5.5.0**
  - Additional icon sets

### **Forms & Validation**
- **React Hook Form 7.49.3**
  - Form state management
  - Form validation
- **Zod 3.22.4**
  - Schema validation
  - TypeScript-first validation
- **@hookform/resolvers 3.3.4**
  - Integration between React Hook Form and Zod

### **Maps & Location Services**
- **Leaflet 1.9.4**
  - Open-source mapping library
- **React Leaflet 5.0.0**
  - React components for Leaflet
- **@react-google-maps/api 2.20.7**
  - Google Maps integration (optional)

### **Data Fetching & State Management**
- **@tanstack/react-query 5.90.10**
  - Server state management
  - Data fetching and caching
  - API synchronization

### **UI Components & Sliders**
- **Swiper 12.0.3**
  - Touch slider/carousel
  - Image galleries
  - Hero section sliders

### **Utilities**
- **clsx 2.1.0**
  - Conditional class names
- **tailwind-merge 2.2.0**
  - Merge Tailwind classes

### **SEO & Meta Tags**
- **next-seo 6.8.0**
  - SEO optimization
  - Meta tags management
- **next-sitemap 4.2.3**
  - Sitemap generation
  - Robots.txt generation

---

## ⚙️ **Backend Technologies**

### **Server Framework**
- **Next.js API Routes**
  - Serverless API endpoints
  - RESTful API structure
  - File-based routing

### **Runtime**
- **Node.js**
  - JavaScript runtime
  - Server-side execution

### **HTTP Client**
- **Axios 1.13.2**
  - HTTP requests
  - API communication

### **Authentication**
- **next-auth 4.24.13**
  - Authentication system
  - Session management

---

## 🗄️ **Database & Data Storage**

### **Primary Database**
- **PostgreSQL**
  - Relational database
  - Production database

### **Database Drivers & Libraries**
- **@vercel/postgres 0.10.0**
  - Vercel Postgres integration
  - Serverless database connection
- **@neondatabase/serverless 1.0.2**
  - Neon serverless Postgres driver
  - Edge-compatible database access
- **pg** (via @neondatabase/serverless)
  - PostgreSQL client

### **Caching (Optional)**
- **Redis 5.10.0**
  - In-memory data store
  - Caching layer
  - Session storage

### **File System Storage**
- **JSON Files** (Development)
  - Local data storage
  - Fallback when database not configured

---

## 💳 **Payment Processing**

### **Payment Gateway**
- **Stripe 20.0.0**
  - Payment processing
  - Payment intents
  - Webhook handling
- **@stripe/stripe-js 8.5.3**
  - Stripe.js client library
- **@stripe/react-stripe-js 5.4.1**
  - React components for Stripe
  - Payment form components

---

## 📧 **Email Services**

### **Email Provider**
- **Resend 6.5.2**
  - Transactional emails
  - Newsletter emails
  - Contact form notifications
  - Order confirmations

---

## ☁️ **Cloud Services & APIs**

### **Media Management**
- **Cloudinary 2.8.0**
  - Image hosting
  - Image optimization
  - Media transformation

### **Content Management (Optional)**
- **Sanity CMS**
  - Headless CMS
  - Content management
  - Blog content

---

## 🛠️ **Development Tools**

### **Build Tools**
- **Webpack** (via Next.js)
  - Module bundling
  - Code splitting
  - Asset optimization

### **Code Quality**
- **ESLint 8.56.0**
  - Code linting
  - Code quality checks
- **eslint-config-next 15.0.0**
  - Next.js ESLint configuration

### **Type Definitions**
- **@types/node 20.11.0**
  - Node.js type definitions
- **@types/react 18.2.48**
  - React type definitions
- **@types/react-dom 18.2.18**
  - React DOM type definitions
- **@types/leaflet 1.9.8**
  - Leaflet type definitions

---

## 🚀 **Deployment & Hosting**

### **Hosting Platform**
- **Vercel**
  - Primary deployment platform
  - Serverless functions
  - Edge network
  - Automatic deployments

### **Database Hosting**
- **Vercel Postgres**
  - Managed PostgreSQL
  - Serverless database
- **Neon Database** (via serverless driver)
  - Alternative Postgres hosting

---

## 🔒 **Security & Middleware**

### **Security Features**
- **Input Validation** (Zod)
- **Email Sanitization**
- **Rate Limiting** (Middleware)
- **Security Headers** (Middleware)
- **XSS Prevention**
- **CSRF Protection** (Next.js built-in)

---

## 📊 **Analytics & Monitoring**

### **Analytics (Ready for Integration)**
- **Google Analytics** (Structure ready)
- **Custom Analytics Dashboard** (Built-in admin)

---

## 🎯 **Project Structure Classification**

### **Frontend Code**
- Location: `frontend/`
- Components: `frontend/components/`
- Types: `frontend/types/`
- Utilities: `frontend/lib/`

### **Backend Code**
- Location: `backend/`
- Libraries: `backend/lib/`
- Data: `backend/data/`
- Scripts: `backend/scripts/`

### **API Routes**
- Location: `app/api/`
- Structure: RESTful endpoints
- File-based routing

### **Pages**
- Location: `app/`
- App Router structure
- Server and Client Components

---

## 📦 **Package Management**

- **npm** - Node Package Manager
- **package.json** - Dependency management

---

## 🔧 **Configuration Files**

- **tsconfig.json** - TypeScript configuration
- **next.config.mjs** - Next.js configuration
- **tailwind.config.ts** - Tailwind CSS configuration
- **postcss.config.mjs** - PostCSS configuration
- **.eslintrc** - ESLint configuration

---

## 📝 **Summary by Category**

### **Frontend Stack**
- Next.js 15 + React 19 + TypeScript
- Tailwind CSS + Framer Motion
- React Hook Form + Zod
- Leaflet/React Leaflet
- TanStack Query

### **Backend Stack**
- Next.js API Routes
- Node.js Runtime
- PostgreSQL Database
- Vercel Postgres/Neon

### **Third-Party Services**
- Stripe (Payments)
- Resend (Email)
- Cloudinary (Media)
- Google Maps (Optional)
- Sanity CMS (Optional)

### **Development Tools**
- TypeScript
- ESLint
- Webpack
- npm

### **Deployment**
- Vercel Platform
- Serverless Functions
- Edge Network

---

## 🎓 **Technology Versions Summary**

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.0.10 | Full-stack framework |
| React | 19.2.3 | UI library |
| TypeScript | 5.3.3 | Programming language |
| Tailwind CSS | 3.4.18 | Styling framework |
| Framer Motion | 11.18.2 | Animations |
| Stripe | 20.0.0 | Payments |
| Resend | 6.5.2 | Email service |
| PostgreSQL | Latest | Database |
| Node.js | Latest | Runtime |

---

*Last Updated: Based on current package.json and project structure*


