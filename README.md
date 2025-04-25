# DevPortal

A comprehensive development portal that provides a modern interface for API documentation, testing, and configuration management. Built with Next.js, this platform offers a centralized solution for development teams.

## Features

- Modern Next.js App Router architecture
- Swagger UI integration for API documentation
- API testing and request management
- Configuration management
- Responsive sidebar navigation
- Dark mode support
- Dashboard for metrics and monitoring
- TypeScript for type safety
- Tailwind CSS for styling

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Copy `.env.example` to `.env.local` and update the values:

```bash
cp .env.example .env.local
```

Required environment variables:

- `NEXT_PUBLIC_API_URL`: The base URL of your API

## Structure

- `/app` - Next.js app router pages and API routes
- `/components` - Reusable UI components
- `/lib` - Utility functions and shared code
- `/public` - Static assets

## Technologies

- [Next.js](https://nextjs.org)
- [Swagger UI](https://swagger.io/tools/swagger-ui/)
- [TailwindCSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)
- [Radix UI](https://www.radix-ui.com)
