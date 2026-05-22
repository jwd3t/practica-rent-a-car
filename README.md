# Angular Exam Template

This project is now organized as a reusable Angular exam template based on:

- standalone components
- Angular Material
- Angular Router
- Angular Signals
- `@ngx-translate/core`
- `json-server`
- a layered / bounded-context structure

Use this repository as a base and adapt the business names, endpoints, views and calculations for each exam case.

## Quick Reuse Strategy

When you start a new exam project, reuse this template in this order:

1. Copy `shared`
2. Copy `app.config.ts`, `app.ts`, `app.html`
3. Copy `environments`
4. Create or rename your bounded contexts
5. Build each bounded context in this order:

```text
entity -> response -> assembler -> api-endpoint -> api -> store -> routes -> views
```

## Recommended Bounded Context Strategy

Keep the project simple during the exam:

- `shared`: common UI and base infrastructure
- `masters`: master data, catalogs, reference entities
- `operations`: transactions, forms, actions, process data

If the case study changes, you can rename `masters` and `operations`, but keep the same layered structure.

## Project Structure

```text
src/
  app/
    shared/
      infrastructure/
      presentation/
    masters/
      domain/
      application/
      infrastructure/
      presentation/
    operations/
      domain/
      application/
      infrastructure/
      presentation/
  environments/
server/
  db.json
```

## What To Replace In A New Exam

### 1. Environment

Update:

- `apiBaseUrl`
- endpoint paths
- branding / logo values if needed

File:

- `src/environments/environment.ts`

### 2. Entities

For each collection in the fake backend:

- create one entity class
- copy the fields from the JSON object
- keep naming in English
- keep file naming as `x.entity.ts`

### 3. Responses

For each collection:

- create `XResource`
- create `XsResponse`

Pattern:

```ts
export interface XsResponse extends BaseResponse {
  xs: XResource[];
}

export interface XResource extends BaseResource {
  id: number;
}
```

### 4. Assemblers

Every assembler repeats the same three methods:

- `toEntityFromResource`
- `toResourceFromEntity`
- `toEntitiesFromResponse`

### 5. API Endpoints

Every endpoint repeats the same pattern:

- extend `BaseApiEndpoint`
- inject `HttpClient`
- compose the URL from `environment`
- instantiate the related assembler

### 6. APIs

Each bounded context can expose one thin API class that wraps its endpoints.

Examples:

- `MastersApi`
- `OperationsApi`

### 7. Stores

Each store should usually contain:

- one or more signals with data
- `loading`
- `error`
- public actions like `add`, `update`, `delete`
- a private `load...()` called from the constructor

### 8. Routes

Keep routing simple:

- `app.routes.ts` for root navigation
- one `*.routes.ts` file per bounded context when needed

## Minimal Exam Checklist

Before adding polish, make sure you have:

- app builds successfully
- root redirect works
- page-not-found works
- toolbar and navigation render
- fake backend is running
- Home view renders data
- main form view submits data

## Fake Backend

Run the backend with:

```bash
npx json-server --watch server/db.json --port 3000
```

## Frontend

Run Angular with:

```bash
npm start
```

Then open:

```text
http://localhost:4200/home
```

## Notes For Future You

- Do not redesign everything in the exam.
- Copy the pattern and rename carefully.
- Keep entities, responses, assemblers and endpoints mechanical.
- Spend your energy on routes, views, form logic and calculations.
