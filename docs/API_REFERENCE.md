# API & Component Reference

Complete reference for components, hooks, and utilities in the project.

## Components

### ChartsSection
Displays sentiment analytics with various chart types.

**Location:** `src/components/ChartsSection.tsx`

**Props:**
```typescript
interface ChartsSectionProps {
  data?: Array<{
    sentimentType: string;
    count: number;
  }>;
  title?: string;
}
```

**Usage:**
```tsx
<ChartsSection data={sentimentData} title="Sentiment Overview" />
```

### CSVUpload
Handles CSV file uploads and data import.

**Location:** `src/components/CSVUpload.tsx`

**Props:**
```typescript
interface CSVUploadProps {
  onUpload?: (data: any[]) => void;
  accept?: string;
  maxSize?: number;
}
```

**Usage:**
```tsx
<CSVUpload onUpload={handleDataUpload} />
```

### SentimentMeter
Visual sentiment gauge component.

**Location:** `src/components/SentimentMeter.tsx`

**Props:**
```typescript
interface SentimentMeterProps {
  positive: number;
  negative: number;
  neutral: number;
  showPercentage?: boolean;
}
```

**Usage:**
```tsx
<SentimentMeter positive={60} negative={20} neutral={20} />
```

### WeeklyTrend
Time-series trend visualization.

**Location:** `src/components/WeeklyTrend.tsx`

**Props:**
```typescript
interface WeeklyTrendProps {
  data?: Array<{
    date: string;
    sentiment: number;
  }>;
  currency?: string;
}
```

**Usage:**
```tsx
<WeeklyTrend data={trendData} />
```

### ProblemAnalysis
Problem identification and listing component.

**Location:** `src/components/ProblemAnalysis.tsx`

**Props:**
```typescript
interface ProblemAnalysisProps {
  problems?: Array<{
    id: string;
    description: string;
    frequency: number;
    category: string;
  }>;
  onSelect?: (problem: Problem) => void;
}
```

**Usage:**
```tsx
<ProblemAnalysis problems={identifiedProblems} />
```

### ReportExport
Export analysis results and reports.

**Location:** `src/components/ReportExport.tsx`

**Props:**
```typescript
interface ReportExportProps {
  reportData?: any;
  formats?: ('pdf' | 'csv' | 'json')[];
  onExport?: (format: string) => void;
}
```

**Usage:**
```tsx
<ReportExport reportData={analysisData} />
```

## Pages

### UserDashboard
Main user dashboard and workspace.

**Location:** `src/pages/UserDashboard.tsx`

**Route:** `/dashboard`

**Requirements:** Authenticated user

**Features:**
- CSV upload
- Sentiment analysis
- Charts and visualizations
- Trend analysis
- Report export

### AdminDashboard
Admin control panel.

**Location:** `src/pages/AdminDashboard.tsx`

**Route:** `/admin/dashboard`

**Requirements:** Admin user

**Features:**
- System overview
- User management
- Data management
- System settings

### Login
User authentication page.

**Location:** `src/pages/Login.tsx`

**Route:** `/login`

**Features:**
- Email/password login
- Remember me option
- Sign up link

### Signup
User registration page.

**Location:** `src/pages/Signup.tsx`

**Route:** `/signup`

**Features:**
- User registration
- Email validation
- Password strength indicator

## Hooks

### useToast
Display toast notifications.

**Location:** `src/hooks/use-toast.ts`

**Usage:**
```tsx
const { toast } = useToast();

toast({
  title: "Success",
  description: "Data uploaded successfully",
  variant: "default"
});
```

**Parameters:**
```typescript
interface Toast {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
  duration?: number;
}
```

### useMobile
Detect if device is mobile viewport.

**Location:** `src/hooks/use-mobile.tsx`

**Usage:**
```tsx
const isMobile = useMobile();

return isMobile ? <MobileView /> : <DesktopView />;
```

## Context/Hooks

### AuthContext
Global authentication state management.

**Location:** `src/auth/AuthContext.tsx`

**Provides:**
```typescript
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, password: string) => Promise<void>;
  isAdmin: boolean;
}
```

**Usage:**
```tsx
import { useAuth } from '@/auth/AuthContext';

function MyComponent() {
  const { user, isAdmin, logout } = useAuth();
  
  return (
    <div>
      {user && <span>Welcome {user.email}</span>}
      {isAdmin && <AdminPanel />}
    </div>
  );
}
```

## Utility Functions

### cn() - Class Name Utility
Combine Tailwind CSS classes.

**Location:** `src/lib/utils.ts`

**Usage:**
```tsx
import { cn } from '@/lib/utils';

const buttonClass = cn(
  'px-4 py-2 rounded',
  isActive && 'bg-blue-500'
);
```

## UI Components Library

All shadcn/ui components are available in `src/components/ui/`:

- `button.tsx` - Button component
- `card.tsx` - Card container
- `dialog.tsx` - Modal dialog
- `form.tsx` - Form wrapper
- `input.tsx` - Text input
- `textarea.tsx` - Multi-line text
- `badge.tsx` - Status badge
- `tabs.tsx` - Tab navigation
- `select.tsx` - Select dropdown
- `checkbox.tsx` - Checkbox input
- `radio-group.tsx` - Radio buttons
- `slider.tsx` - Value slider
- `table.tsx` - Data table
- `chart.tsx` - Chart components
- And many more...

## Types

### Review Type
Defined in `src/types/review.ts`

```typescript
interface Review {
  id: string;
  content: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  timestamp: Date;
  source: string;
  userId?: string;
  metadata?: Record<string, any>;
}
```

## Import Paths

All imports use TypeScript path aliases:

```tsx
// Components
import ChartsSection from '@/components/ChartsSection';
import { SentimentMeter } from '@/components/SentimentMeter';

// Pages
import UserDashboard from '@/pages/UserDashboard';

// Hooks
import { useToast } from '@/hooks/use-toast';
import { useMobile } from '@/hooks/use-mobile';

// Auth
import { useAuth } from '@/auth/AuthContext';
import ProtectedRoute from '@/auth/ProtectedRoute';

// Utils
import { cn } from '@/lib/utils';

// Types
import type { Review } from '@/types/review';

// UI Components
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
```

## Best Practices

1. **Always use TypeScript types** for component props
2. **Use custom hooks** to extract component logic
3. **Keep components** focused and single-responsibility
4. **Use Tailwind classes** for styling
5. **Handle errors** with try-catch and error boundaries
6. **Use Context** for global state only
7. **Memoize** expensive computations and components
8. **Test** components with real data

## Performance Tips

- Use `React.memo()` to prevent unnecessary re-renders
- Use `useMemo()` for expensive calculations
- Use `useCallback()` for event handlers
- Lazy load routes with `React.lazy()`
- Optimize images and assets
- Use Vite's code splitting

## Troubleshooting

### Component Not Importing
- Check import path with `@/` alias
- Verify file exists in correct location
- Clear node_modules and reinstall

### TypeScript Errors
- Run `npx tsc --noEmit` to check all errors
- Verify types are imported correctly
- Check type definitions in `src/types/`

### Component Not Rendering
- Check if all required props are provided
- Verify parent component exists
- Check browser console for errors
- Ensure component is exported from file
