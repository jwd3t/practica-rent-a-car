
copiar todo shared

copiar app.config.ts

copiar app.ts

app.html

orden de creacion de bc
entity->assembler->api-endpoint->BC-api->store->BCroutes->app.routes

# Enterprise Fleet Manager

Enterprise Fleet Manager is a web application built with Angular and Angular Material for managing fleet information in the Enterprise Rent-A-Car case study. The application provides fleet analytics, urgent incident tracking, and rental registration features using a fake backend powered by `json-server`.

## Author

- Author: `Your Full Name Here`

## Description

This project was developed as a frontend solution for a vehicle rental management scenario. It consumes data from a fake REST API and presents operational and analytical information about:

- Vehicles
- Rentals
- Incidents

The application follows a domain-driven and layered structure, organizing the code into bounded contexts such as `shared`, `masters`, and `operations`.

## Main Features

- Responsive user interface built with Angular Material
- Toolbar with branding, navigation, and language switching
- Home view with fleet utilization analytics
- Next urgent incident summary
- New rental registration form
- Automatic incident creation for cleaning after rental creation
- Route handling with page-not-found view
- Internationalization with English and Spanish support
- State management with Angular Signals

## Technology Stack

- Angular
- TypeScript
- Angular Material
- Angular Router
- Angular Signals
- `@ngx-translate/core`
- `json-server`

## Project Structure

```text
src/
  app/
    shared/
    masters/
    operations/
  environments/
server/
  db.json
```

## Fake Backend

This project uses `json-server` as a fake backend.

Place the provided database file inside the `server` folder as:

```text
server/db.json
```

Run the backend with:

```bash
cd server
json-server --watch db.json
```

The fake API will be available at:

```text
http://localhost:3000
```

## Development Server

To start the Angular application, run:

```bash
ng serve
```

Then open:

```text
http://localhost:4200
```

## Build

To generate a production build:

```bash
ng build
```

## Running Tests

To run unit tests:

```bash
ng test
```

## Notes

- The default language is English.
- The project uses standalone components.
- URLs and endpoint paths should be configured through environment files to avoid hard-coded values.
- Before packaging the project for submission, remove the `node_modules` folder.
