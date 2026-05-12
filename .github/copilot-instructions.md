# Copilot Instructions for Brisaclaude

## Repository shape

This repository is a multi-project workspace:

- `BRISA-BACKEND`: Spring Boot 3.1.1 API (Java 21, Maven, PostgreSQL, JWT auth)
- `BRISA-FRONTEND`: Vue 3 + Vite SPA that consumes the backend API
- `Brisa ONE`: separate React + Vite bundle (Figma/Make export), not wired into `BRISA-FRONTEND`

When implementing features, confirm which project is in scope before editing.

## Build, run, and test commands

### BRISA-BACKEND (`BRISA-BACKEND`)

- Install/build package:
  - `.\mvnw.cmd clean install`
- Run API locally:
  - `.\mvnw.cmd spring-boot:run`
- Run full test suite:
  - `.\mvnw.cmd test`
- Run a single test class:
  - `.\mvnw.cmd -Dtest=AuthApplicationTests test`
- Run a single test method:
  - `.\mvnw.cmd -Dtest=AuthApplicationTests#contextLoads test`

### BRISA-FRONTEND (`BRISA-FRONTEND`)

- Install dependencies:
  - `npm install`
- Run dev server:
  - `npm run dev`
- Build production bundle:
  - `npm run build`

### Brisa ONE (`Brisa ONE`)

- Install dependencies:
  - `npm i`
- Run dev server:
  - `npm run dev`
- Build production bundle:
  - `npm run build`

## High-level architecture

### Backend domain flow

- Core business graph is **Program -> Class -> Stage**.
- `PeopleModel` links into classes through `EnrollmentModel` and stage progress through `StageCandidateModel`.
- Overview/list screens are backed by integration services (`PeopleIntegrationService`, `ProgramIntegrationService`) that aggregate multiple repositories and return composed DTOs for filters, tabs, and summaries.

### Backend layering

- Controller layer in `controllers/` exposes REST endpoints under `api/*`.
- Business logic is split between:
  - CRUD/import services (e.g., `PeopleService`, `ProgramService`)
  - cross-aggregate integration services for dashboard/list pages.
- Data access is in `repositories/`, with custom `findAllWithRelations()` fetch-join queries for integration/overview workloads.
- `LogHelper` + `SystemLogService` provide async system audit logging used by controllers after create/update/delete/import operations.

### Security/auth model

- JWT-based stateless auth:
  - `AuthenticationController` issues tokens
  - `SecurityFilter` reads `Authorization: Bearer <token>` and loads user into `SecurityContext`
  - `SecurityConfigurations` enables stateless security and allows auth endpoints + protects the rest
- Frontend stores `token` and `user` in `localStorage`.

### Frontend flow

- Vue app entry: `src/main.js` -> `App.vue` -> `router/index.js`.
- Route protection is meta-driven (`meta.requiresAuth`) and enforced in a global `beforeEach` guard.
- API access is centralized in `src/services/api.js` (Axios instance + request interceptor that injects JWT).
- Feature services (`peopleService`, `programService`, etc.) wrap API endpoints and are the expected boundary for view components.
- Program registration is a large wizard-style flow under `src/views/ProgramRegistration/`.

### Seed/bootstrap behavior

- `DataSeeder` creates default admin/user on startup when user table is empty.
- `StageSelectionSeedRunner` (guarded by `brisa.seed.enable=true`) creates deterministic seed data for selection stages.

## Key conventions in this codebase

- **Language/domain naming is mixed**: code identifiers are often English, while DTO fields/messages/UI labels are Portuguese. Keep existing wording style per module instead of force-translating.
- **Overview endpoints return composed DTOs**, not raw entities (`PeopleOverviewResponseDTO`, `ProgramOverviewResponseDTO` with summary + tabs + filtered items). Preserve this shape when expanding filters.
- **Import endpoints use multipart with field name `file`** (frontend services and backend controllers are aligned on this contract).
- **Repository optimization pattern**: integration services prefer bulk loads (`findAllWithRelations`, grouped maps) and in-memory aggregation over repeated per-item queries.
- **Audit logging pattern**: controllers call `logHelper` after state-changing operations; log failures are intentionally non-blocking for request success.
- **Frontend auth conventions**:
  - protected routes must include `meta.requiresAuth: true`
  - login route is `/` and redirects to `/home` when authenticated
  - shared API calls must go through the Axios `api` instance to preserve JWT injection.
