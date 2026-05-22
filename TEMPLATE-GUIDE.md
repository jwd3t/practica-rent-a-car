# Template Guide

This file explains how to turn the current project into a new case study quickly.

## 1. Search And Replace Map

When adapting the template, replace names in controlled groups:

### Business names

- `Vehicle`
- `Rental`
- `Incident`

### Collection names

- `vehicles`
- `rentals`
- `incidents`

### File groups

- `vehicle.entity.ts`
- `vehicle-response.ts`
- `vehicle-assembler.ts`
- `vehicles-api-endpoint.ts`

Do one entity group at a time.

## 2. Bounded Context Decisions

Use this rule:

- put catalogs or reference data in `masters`
- put forms, transactions, incidents, reservations, orders, rentals, etc. in `operations`
- put common UI or base classes in `shared`

## 3. Fast Creation Order

### For one entity

1. entity
2. response
3. assembler
4. api-endpoint
5. api method
6. store method

### For one view

1. route
2. component
3. basic HTML
4. connect to store
5. add validation / calculations

## 4. Template Files You Should Read First

- `src/environments/environment.ts`
- `src/app/app.routes.ts`
- `src/app/masters/domain/model/vehicle.entity.ts`
- `src/app/masters/infrastructure/vehicle-response.ts`
- `src/app/masters/infrastructure/vehicle-assembler.ts`
- `src/app/masters/infrastructure/vehicles-api-endpoint.ts`
- `src/app/masters/infrastructure/masters-api.ts`
- `src/app/masters/application/masters-store.ts`

These files show the full pattern from JSON object to screen state.

## 5. What To Avoid During The Exam

- do not invent extra abstractions
- do not split too many bounded contexts
- do not over-model enums if `string` is enough
- do not spend too long styling before the flow works
- do not forget to start `json-server`
