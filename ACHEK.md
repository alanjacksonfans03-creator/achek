# Achek Digital Solutions

## Overview

Achek Digital Solutions is a full-service digital agency based in Nigeria, founded by Caleb Onuche (Calebosky). The company provides comprehensive digital services including web development, mobile app development, digital marketing, UI/UX design, cloud solutions, hosting services, and more. This repository contains a full-stack web application built with modern technologies to showcase the company's services and handle client interactions.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS with custom design system using shadcn/ui components
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Theme Support**: Custom theme provider with dark/light mode switching
- **UI Components**: Comprehensive component library built on Radix UI primitives

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API architecture with organized route handlers
- **File Uploads**: Multer middleware for handling image uploads
- **Email Services**: Multiple email providers (SendGrid, Nodemailer) for transactional emails
- **Payment Integration**: Flutterwave payment gateway for Nigerian market
- **Error Handling**: Hapi Boom for structured error responses

### Database & ORM
- **Database**: MySQL with configurable connection (defaults to localhost)
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema**: Structured tables for users, portfolio, testimonials, messages, and newsletter subscriptions
- **Migrations**: Drizzle Kit for database schema management

### Authentication & Security
- **Authentication**: JWT-based authentication system
- **Password Hashing**: bcrypt for secure password storage
- **CORS**: Configured for cross-origin resource sharing
- **Environment Variables**: dotenv for configuration management

### Content Management
- **Portfolio Management**: Dynamic portfolio project display with admin CRUD operations
- **Testimonials System**: Client testimonial collection and display
- **Blog System**: Static blog posts with SEO-friendly routing
- **Contact Forms**: Multi-purpose contact and quote request forms

### SEO & Analytics
- **SEO Optimization**: Meta tags, structured data, and sitemap generation
- **Analytics**: Google Analytics integration with event tracking
- **Social Media**: Open Graph and Twitter Card meta tags
- **Performance**: Optimized images, lazy loading, and efficient bundling

### Deployment & Hosting
- **Build Process**: Separate client and server build processes
- **Static Assets**: Optimized asset serving with proper caching headers
- **Development**: Hot module replacement with Vite dev server
- **Production**: Compiled server bundle with static file serving

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: react, react-dom, @types/react for UI framework
- **Vite**: Build tool with plugins for React and development enhancements
- **Express**: Node.js web framework for server-side operations
- **TypeScript**: Static typing for both client and server code

### Database & ORM
- **Drizzle ORM**: drizzle-orm, drizzle-kit for type-safe database operations
- **MySQL2**: Database driver for MySQL connections
- **Drizzle Zod**: Schema validation integration

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Headless UI components (@radix-ui/* packages)
- **Lucide React**: Icon library for consistent iconography
- **shadcn/ui**: Pre-built component library configuration

### State Management & Data Fetching
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form handling with validation
- **Hookform Resolvers**: Integration with validation libraries

### Authentication & Security
- **JWT**: jsonwebtoken for token-based authentication
- **bcrypt**: Password hashing and verification
- **Hapi Boom**: HTTP error handling

### Email Services
- **SendGrid**: @sendgrid/mail for transactional emails
- **Nodemailer**: Alternative email service provider

### Payment Processing
- **Flutterwave**: Payment gateway integration for Nigerian payments

### Development Tools
- **ESBuild**: Fast bundling for server-side code
- **PostCSS**: CSS processing with Autoprefixer
- **Replit Plugins**: Development environment enhancements