# School ERP Architecture Documentation

## Monorepo Layout
Built with Turborepo and npm/pnpm workspace layout:

```text
school-erp/
├── apps/
│   ├── web/               # Next.js 14 App Router application
│   ├── student-mobile/    # Student Mobile Application (Expo / React Native)
│   ├── teacher-mobile/    # Teacher Mobile Application (Expo / React Native)
│   └── parent-mobile/     # Parent Mobile Application (Mobile-Only)
└── packages/
    ├── design-tokens/     # Color palette, spacing, typography tokens
    ├── types/             # Shared TypeScript models and interfaces
    ├── constants/         # Navigation maps, role enums
    ├── mock-data/         # Centralized 5,000-student dataset
    ├── validation/        # Zod validation schemas
    ├── utils/             # Formatters, grade calculators, math helpers
    └── ui/                # Shared UI component library
```

## Phase 1 Frontend Boundaries & Service Layer

All UI components consume promises returned by standard TypeScript services located in `apps/web/services/`:
- `studentService.ts`
- `teacherService.ts`
- `attendanceService.ts`
- `examService.ts`
- `feeService.ts`
- `admissionService.ts`
- `transportService.ts`
- `libraryService.ts`
- `notificationService.ts`

### Phase 2 Backend Migration Strategy
When introducing the FastAPI / PostgreSQL backend in Phase 2, update the implementations inside `services/*.ts` to fetch from REST / GraphQL endpoints. Zero modifications will be required inside UI components.
