# SIX Mensa - Copilot Instructions

## Project Overview
This is a Next.js application that displays cafeteria menus for SIX company restaurants. The app fetches and displays weekly menus for different locations (HTP and HT201), supports multiple languages, and provides both text and PDF views of the menus.

## Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **State Management**: Zustand (`lib/store.ts`)
- **Styling**: Tailwind CSS with custom components
- **UI Components**: shadcn/ui components in `components/ui/`
- **Data Fetching**: API routes with cheerio for web scraping
- **Deployment**: Vercel with PWA support

## Project Structure

### Core App Structure
- `app/` - Next.js App Router pages and API routes
  - `api/` - API endpoints for menu data and translation services
  - `page.tsx` - Main homepage with menu display
  - `layout.tsx` - Root layout with navigation and providers
  - `compare/` - Menu comparison pages
  - `settings/` - User preferences page

### Key Components
- `components/` - Reusable UI components
  - `menu-page.tsx` - Main menu display component
  - `pdf-page.tsx` - PDF menu viewer with skeleton loading
  - `menu-card.tsx` - Individual menu item card
  - `navbar/nav.tsx` - Main navigation component
  - `ui/` - shadcn/ui components (Button, Select, etc.)

### State Management
- `lib/store.ts` - Zustand store with app state:
  - `language` - UI language (de/en)
  - `translationEngine` - Translation service selection
  - `selectedMensa` - Current cafeteria (htp/ht201)
  - `selectedViewMode` - Display mode (text/pdf)
  - `displayFeaturedMenu` - Featured menu toggle
  - `color` - Theme color customization

### API Routes
- `/api/htp/route.ts` - HTP cafeteria menu data
- `/api/ht201/route.ts` - HT201 cafeteria menu data  
- `/api/translate/route.ts` - Translation services
- `/api/scrape/cheerio/route.ts` - Web scraping for menu data
- `/api/pdf-links/route.ts` - PDF menu links

## Development Guidelines

### Code Style
- Use TypeScript with strict type checking
- Follow React functional component patterns with hooks
- Use Tailwind CSS utility classes for styling
- Implement proper error handling and loading states
- Use `"use client"` directive for client-side components when needed

### State Management Patterns
- Access global state via `useStore()` hook
- Update state through store actions (e.g., `setLanguage`, `setSelectedMensa`)
- Persist user preferences to localStorage
- Handle SSR/client-side hydration properly

### API Development
- API routes return JSON responses with proper error handling
- Use TypeScript interfaces for API response types
- Implement caching strategies for menu data
- Support CORS for external API calls

### Component Development
- Create reusable components in `components/` directory
- Use shadcn/ui components as building blocks
- Implement proper loading and error states
- Support responsive design with Tailwind breakpoints
- Use proper semantic HTML for accessibility

### Translation & Internationalization
- Support German (de) and English (en) languages
- Use translation APIs (MyMemory, LibreTranslate) for menu content
- Store language preference in app state
- Consider menu item translation caching

### Menu Data Structure
- Menu items should include: title, description, price, category
- Support different menu types: regular, featured, vegetarian, etc.
- Handle menu availability by date/day
- Support both HTP and HT201 location formats

## Common Patterns

### Adding New Components
```typescript
// Use proper TypeScript interfaces
interface MenuCardProps {
  title: string;
  description?: string;
  price: number;
  category: string;
}

// Follow naming conventions
export default function MenuCard({ title, description, price, category }: MenuCardProps) {
  const { language } = useStore();
  
  return (
    <div className="menu-card">
      {/* Component content */}
    </div>
  );
}
```

### API Route Pattern
```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // API logic here
    return NextResponse.json({ data: result });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
```

### State Updates
```typescript
const { selectedMensa, setSelectedMensa } = useStore();

// Update state and persist to localStorage
const handleMensaChange = (newMensa: string) => {
  setSelectedMensa(newMensa);
};
```

## Testing & Quality
- Use Next.js built-in linting with `npm run lint`
- Test responsive design on mobile and desktop
- Verify PWA functionality works correctly
- Test menu data fetching and error states
- Ensure proper TypeScript compilation with `npm run build`

## Deployment Notes
- Deployed on Vercel with automatic deployments from main branch
- PWA manifest configured in `app/manifest.webmanifest`
- Environment variables managed through Vercel dashboard
- Speed Insights and analytics integration included