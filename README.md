# Predictive Data Dashboard

A full-stack application for predictive data analysis with AI-powered insights.

## Table of Contents
- [Backend Section](#backend-section)
- [Frontend Section](#frontend-section)

## Backend Section

### Overview
This backend provides APIs for:

Natural language query interpretation (via LLM)
Data aggregation & transformation
AI-generated executive summaries
Caching & rate limiting for performance and cost control
Built using:

Node.js + Express
TypeScript
Zod (validation)
In-memory caching (upgradeable to Redis)
Ollama (LLM inference)

### Architecture

The backend follows a layered architecture:

```
src/
├── routes/         # API route definitions
├── controllers/    # Request handlers
├── services/       # Business logic
├── utils/          # Utility functions
├── cache/          # Caching mechanisms
├── schemas/        # Validation schemas
├── middleware/     # Custom middleware
└── config/         # Configuration files
```

### Request → Response Flow

1. **Routes** (`src/routes/`) - Define API endpoints and apply middleware
2. **Middleware** (`src/middleware/`) - Handle rate limiting, error handling
3. **Controllers** (`src/controllers/`) - Process requests, validate input, coordinate services
4. **Services** (`src/services/`) - Implement business logic (Ollama AI, data processing)
5. **Utils/Cache** (`src/utils/`, `src/cache/`) - Provide helper functions and caching
6. **Schemas** (`src/schemas/`) - Define data validation rules with Zod

### Key Design Patterns

- **Validation**: Zod schemas for request/response validation
- **Caching**: In-memory cache for frequently accessed data
- **Service Abstraction**: Separation of business logic from controllers
- **Middleware Composition**: Express middleware for cross-cutting concerns
- **Error Handling**: Centralized error handling middleware
- **Rate Limiting**: Protection against abuse with express-rate-limit

### Environment Requirements

- **Node.js**: v18+ (tested with v20.x)
- **Environment Variables**:
  - `PORT`: Server port (default: 3000)
  - `OLLAMA_URL`: Ollama API endpoint
  - `OLLAMA_API_KEY`: Authentication key for Ollama
  - `OLLAMA_MODEL`: AI model identifier

### Installation & Setup

```bash
# Install dependencies
cd backend
npm install

# Configure environment
cp .env.example .env  # Edit with your values
```

### Available Scripts

```bash
# Development mode (auto-reload)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Clean build artifacts
npm run clean
```

### API Endpoints

**Base Path**: `/api/v1`

---

#### Data Endpoints

* `GET /api/v1/summary`
  Returns high-level aggregated statistics (total revenue, units, profit).

* `GET /api/v1/cate-breakdown`
  Provides category-wise breakdown of metrics (e.g., Electronics, Clothing).

* `GET /api/v1/trends`
  Returns time-series trend data (monthly or quarterly).

* `GET /api/v1/comparision`
  Compares metrics across categories or time periods.

* `GET /api/v1/growth`
  Returns growth analysis (increase/decrease over time).

* `GET /api/v1/forecast`
  Provides projected future values based on historical data.

---

#### AI Endpoints

* `POST /api/v1/ai/query`
  Converts natural language into structured query JSON.

  **Request**

  ```json
  {
    "query": "compare profit data of 2022"
  }
  ```

  **Response**

  ```json
  {
    "queryType": "comparison",
    "metric": "profit",
    "category": null,
    "year": "2022",
    "quarter": null,
    "source": "ai"
  }
  ```

---

* `GET /api/v1/ai/summary`
  Generates a 1–2 sentence executive summary from dataset.

  **Query Params (example)**

  ```txt
  ?granularity=monthly
  ```

  **Response**

  ```json
  {
    "summary": "Revenue and profit show strong upward growth with noticeable volatility, especially in recent periods.",
    "source": "ai"
  }
  ```
---

### AI Prompting Strategy

This system uses **structured prompt engineering** to ensure deterministic, reliable, and parseable outputs from the LLM. The design separates responsibilities into two distinct prompt types.

---

#### 1. Query Interpretation Prompt

**Purpose**: Convert natural language into strict JSON.

**Key Characteristics**:

* Enforces a **fixed schema**
* Restricts allowed values (queryType, metric, category)
* Returns **only valid JSON** (no text, no markdown)
* Handles ambiguity via `"invalid"` fallback

**Techniques Used**:

* Explicit schema definition inside prompt
* Controlled vocabulary (enum-like constraints)
* Rule-based classification (trend, comparison, growth, forecast)
* Hard instructions: *“ONLY return JSON”*

#### 2. Executive Summary Prompt

**Purpose**: Generate concise business insights from structured data.

**Key Characteristics**:

* Output limited to **1–2 sentences**
* Focus on:

  * trend direction
  * volatility
  * recent performance
* Avoids vague or fallback responses

**Techniques Used**:

* Forced brevity constraints
* Bias toward **trend detection over uncertainty**
* Explicit prohibition of:

  * “insufficient data”
  * unnecessary disclaimers

--- 

#### 3. Deterministic Output Enforcement

To ensure reliability:

* All AI responses are validated using **Zod schemas**
* Invalid or malformed outputs are replaced with a safe fallback
* No direct trust is placed in LLM output

---

#### 4. Dynamic Prompt Injection

Prompts are dynamically constructed at runtime:

* Dataset injected via `{{DATA}}`
* Category constraints injected from backend constants

This ensures:

* Context-aware responses
* Reduced hallucination
* Consistency with backend data model

---

#### 5. Caching Strategy for Prompts

* Query prompts → cached using normalized query string
* Summary prompts → cached using hashed dataset + granularity

This reduces:

* LLM latency
* Cost of repeated inference

---

#### 6. Design Principles

* **Separation of Concerns**

  * Query parsing ≠ insight generation

* **Strict Contracts**

  * JSON schema enforced at prompt + validation level

* **Fail-Safe Defaults**

  * Invalid queries return structured null response

* **Performance First**

  * Cache before LLM call
  * Rate-limit expensive endpoints

---

## Frontend Section

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

