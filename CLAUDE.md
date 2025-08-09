# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

Use Yarn (version 1.22.22) as the package manager:
- `yarn install` - Install dependencies
- `yarn dev` - Start development server (Next.js 14)
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint

## Architecture Overview

This is a Next.js 14 application using the App Router pattern with the following structure:

### Core Technologies
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with DaisyUI components
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: NextAuth.js with Google OAuth
- **File Upload**: Cloudinary integration
- **UI Libraries**: React Hook Form, React Hot Toast, Heroicons

### Application Structure
- `app/` - Next.js 14 App Router pages and API routes
  - `api/` - API endpoints for businesses, authentication, admin, search
  - `landing/` - Public marketing pages (about, pricing, contact, etc.)
- `components/` - Reusable React components organized by domain
  - `common/` - Shared UI components (Header, Footer, Pagination)
  - `landing/` - Landing page specific components
  - `forms/` - Form components and field types
- `libs/` - Core utilities and configurations
  - `mongoose.js` - Database connection management
  - `next-auth.js` - Authentication configuration
  - `cloudinary.js` - File upload service
- `models/` - Mongoose schemas (Business, User)
- `config.js` - Application configuration (branding, social links, Stripe plans)

### Key Features
- Business directory with categories and search
- User authentication and admin dashboard
- Image upload and management via Cloudinary
- Responsive design with custom animations
- SEO optimized with proper metadata

### Database Models
- **Business**: Core business listings with approval workflow
- **User**: User accounts with admin roles
- Uses MongoDB with connection pooling via Mongoose

### Styling System
- Tailwind CSS with custom animations and gradients
- DaisyUI for consistent component styling
- Custom keyframes for popup, shimmer, and wiggle effects
- Light theme only (configured in tailwind.config.js)

### Environment Setup
Requires MongoDB connection string in `MONGODB_URI` environment variable.