## Overview

This is a React-based frontend for a data analytics dashboard that visualizes revenue, units, and profit across multiple dimensions (time, category, region). It consumes REST APIs and renders dynamic charts with filtering and forecasting capabilities.

---
### Installation & Setup

```bash
# Install dependencies
cd frontend
npm install

# Configure environment
cp .env.example .env  # VITE_API_URL=http://localhost:3000
```

### Available Scripts

```bash
# Development mode
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Folder Structure

```
src/
├── components/     # Reusable UI components
├── hooks/          # Custom React hooks
├── lib/            # Utility functions and API clients
├── routes/         # Application routes
└── types/          # TypeScript type definitions
```
### Dynamic Charts

* Trend (Line chart)
* Comparison (Bar / Stacked bar)
* Breakdown (Pie / Donut)
* Growth (Line with %)
* Forecast (Actual vs Predicted)

---

### Filters (URL-driven)

Filters are controlled via URL query params:

```
?metric=revenue&groupBy=quarter&category=electronics&region=north
```

### Major Packages & Libraries

- **React 19** + **React DOM** - UI library
- **TanStack React Query** - Data fetching and state synchronization
- **TanStack React Router** - Type-safe routing
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Data visualization charts
- **Sonner** - Toast notifications
- **Shadcn/ui** - Accessible UI components
- **Lucide React** - Icon library

### Data Flow

1. **API Layer** (`src/lib/`) - Custom fetch function configured with base URL
2. **React Query Hooks** (`src/hooks/`) - Encapsulate API calls with caching
3. **Components** (`src/components/`) - UI consuming state and hooks
4. **Routes** (`src/routes/`) - Page-level components with data requirements

### Key Patterns

- **Custom Hooks**: Encapsulate data fetching logic with React Query
- **API Abstraction**: Centralized API client with interceptors
- **State Separation**: Server state (React Query) vs client state (Zustand)
- **Type Safety**: End-to-end TypeScript with API route types
- **Optimistic Updates**: Automatic cache invalidation and updates

## Project Overview

This predictive data dashboard combines:
- **Backend**: Node.js/Express API with AI integration (Ollama)
- **Frontend**: Modern React stack with TanStack ecosystem
- **Features**: Data processing, AI insights, interactive visualizations
- **Performance**: Efficient caching, optimized builds, lazy loading

The application enables users to upload data, process it through AI models, and visualize predictive insights in real-time.


