# Project Structure

This project is organized into two main directories: `frontend/` and `backend/`, with configuration files at the root level.

## Directory Structure

```
baho-coffee/
├── frontend/              # Frontend code
│   ├── components/        # React components
│   └── types/            # TypeScript type definitions
│
├── backend/               # Backend code
│   ├── lib/              # Server-side utilities
│   │   ├── db/          # Database utilities (Postgres)
│   │   ├── storage.ts   # Storage abstraction layer
│   │   └── ...
│   ├── data/            # Data files (JSON storage for local dev)
│   └── scripts/         # Utility scripts
│
├── app/                  # Next.js App Router (required at root)
│   ├── api/             # API routes (backend endpoints)
│   ├── page.tsx         # Home page
│   ├── layout.tsx       # Root layout
│   └── ...              # Other pages
│
├── public/              # Static assets (required at root by Next.js)
│
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── next.config.mjs      # Next.js configuration
└── README.md           # Project documentation
```

## Path Aliases

The project uses TypeScript path aliases for clean imports:

- `@/components/*` → `frontend/components/*`
- `@/types` → `frontend/types`
- `@/lib/*` → `backend/lib/*`
- `@/backend/*` → `backend/*`
- `@/*` → Root directory (for app, public, etc.)

## Import Examples

### Frontend Components
```typescript
import Navigation from "@/components/layout/Navigation";
import { CoffeeProduct } from "@/types";
```

### Backend Utilities
```typescript
import { Storage } from "@/backend/lib/storage";
import { PostgresStorage } from "@/backend/lib/db/storage";
import { getAllWashingStations } from "@/backend/lib/washingStationsData";
```

### API Routes
```typescript
// In app/api/contact/route.ts
import { Storage } from "@/backend/lib/storage";
```

## Why This Structure?

1. **Clear Separation**: Frontend and backend code are clearly separated
2. **Next.js Compatibility**: `app/` and `public/` remain at root (Next.js requirement)
3. **Maintainability**: Easy to navigate and understand the codebase
4. **Scalability**: Easy to add new features in the appropriate directory

## Notes

- `app/` directory must remain at root for Next.js App Router to work
- `public/` directory must remain at root for Next.js static file serving
- API routes are in `app/api/` (part of Next.js app structure) but conceptually are backend code
- All backend utilities, data, and scripts are in `backend/`
- All frontend components and types are in `frontend/`

