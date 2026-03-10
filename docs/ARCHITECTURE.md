# Architecture Documentation

Overview of the project structure, design patterns, and component architecture.

## Project Structure

```
src/
├── assets/              # Static assets (images, fonts, etc.)
├── auth/                # Authentication & authorization
│   ├── AuthContext.tsx  # Auth state management
│   ├── ProtectedRoute.tsx # Route protection wrapper
│   └── AdminRoute.tsx    # Admin-only routes
├── components/          # Reusable React components
│   ├── ui/              # UI components from shadcn/ui
│   ├── ChartsSection.tsx
│   ├── CSVUpload.tsx
│   ├── ProblemAnalysis.tsx
│   ├── ReportExport.tsx
│   ├── SentimentMeter.tsx
│   └── WeeklyTrend.tsx
├── hooks/               # Custom React hooks
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── lib/                 # Utility functions
│   └── utils.ts
├── pages/               # Page components
│   ├── Admin.tsx
│   ├── AdminDashboard.tsx
│   ├── Index.tsx
│   ├── Login.tsx
│   ├── NotFound.tsx
│   ├── Signup.tsx
│   └── UserDashboard.tsx
├── types/               # TypeScript type definitions
│   └── review.ts
├── App.tsx              # Main app component
├── App.css              # App styles
├── main.tsx             # Entry point
└── index.css            # Global styles
```

## Core Modules

### 1. Authentication Module (`src/auth/`)

Handles user authentication and authorization:

- **AuthContext.tsx**: Manages global auth state
  - User login/logout
  - Role management (Admin/User)
  - Auth token handling

- **ProtectedRoute.tsx**: Wrapper for protected pages
  - Redirects unauthenticated users to login
  - Maintains route accessibility

- **AdminRoute.tsx**: Admin-only route protection
  - Restricts access to admin features
  - Redirects non-admin users

### 2. Components Module (`src/components/`)

Reusable React components for UI:

- **CSVUpload.tsx**: Handles CSV file imports
- **ChartsSection.tsx**: Displays sentiment analytics charts
- **SentimentMeter.tsx**: Visual sentiment gauge
- **WeeklyTrend.tsx**: Time-series sentiment trends
- **ProblemAnalysis.tsx**: Identifies key issues from feedback
- **ReportExport.tsx**: Exports analysis reports
- **ui/**: shadcn/ui component library (buttons, dialogs, cards, etc.)

### 3. Pages Module (`src/pages/`)

Full-page components representing routes:

- **Login.tsx**: User login page
- **Signup.tsx**: User registration
- **Index.tsx**: Home/landing page
- **UserDashboard.tsx**: Main user dashboard
- **AdminDashboard.tsx**: Admin control panel
- **Admin.tsx**: Admin management page
- **NotFound.tsx**: 404 error page

## State Management

Uses **React Context API** for global state:

```
AuthContext
├── User authentication state
├── User roles (admin/user)
└── Auth token management
```

## Styling Architecture

- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Pre-built component library
- **App.css**: App-specific styles
- **index.css**: Global styles

## Type System

TypeScript types defined in `src/types/`:

```typescript
// review.ts
interface Review {
  id: string;
  content: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  timestamp: Date;
  source: string;
}
```

## Data Flow

```
User Input
    ↓
Component (CSVUpload)
    ↓
Processing/Analysis
    ↓
State Update (Context)
    ↓
Component Re-render (Charts, Dashboard)
    ↓
Display Results
```

## Component Hierarchy

```
App
├── AuthContext (Provider)
├── Router
│   ├── ProtectedRoute
│   │   ├── UserDashboard
│   │   │   ├── ChartsSection
│   │   │   ├── SentimentMeter
│   │   │   ├── WeeklyTrend
│   │   │   └── CSVUpload
│   │   └── AdminRoute
│   │       └── AdminDashboard
│   ├── Login
│   ├── Signup
│   └── NotFound
```

## Best Practices

1. **Component Composition**: Break large components into smaller reusable pieces
2. **Type Safety**: Use TypeScript for all components
3. **State Management**: Use Context API for app-wide state
4. **CSS Isolation**: Use Tailwind utility classes instead of global styles
5. **Error Handling**: Implement proper error boundaries
6. **Performance**: Memoize expensive computations

## Performance Considerations

- Lazy load routes with React.lazy if needed
- Memoize components that receive unchanged props
- Optimize re-renders with React.memo
- Use Vite for fast development builds

## Future Architecture Improvements

- Add Redux or Zustand for complex state management
- Implement service layer for API calls
- Add error boundary components
- Create reusable form builder utilities
