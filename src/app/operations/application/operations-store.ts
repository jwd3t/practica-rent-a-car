import { Injectable, computed, signal } from '@angular/core';
import { retry } from 'rxjs';

import { Rental } from '../domain/model/rental.entity';
import { Incident } from '../domain/model/incident.entity';
import { OperationsApi } from '../infrastructure/operators-api';

@Injectable({
  providedIn: 'root',
})
export class OperationsStore {
  private readonly rentalsSignal = signal<Rental[]>([]);
  private readonly incidentsSignal = signal<Incident[]>([]);

  readonly rentals = this.rentalsSignal.asReadonly();
  readonly incidents = this.incidentsSignal.asReadonly();

  private readonly loadingSignal = signal<boolean>(false);
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);
  readonly error = this.errorSignal.asReadonly();

  readonly rentalCount = computed(() => this.rentals().length);
  readonly incidentCount = computed(() => this.incidents().length);

  constructor(private operationsApi: OperationsApi) {
    this.loadRentals();
    this.loadIncidents();
  }

  addRental(rental: Rental): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.operationsApi
      .createRental(rental)
      .pipe(retry(2))
      .subscribe({
        next: (createdRental) => {
          this.rentalsSignal.update((rentals) => [...rentals, createdRental]);
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to create rental'));
          this.loadingSignal.set(false);
        },
      });
  }

  updateRental(updatedRental: Rental): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.operationsApi
      .updateRental(updatedRental)
      .pipe(retry(2))
      .subscribe({
        next: (rental) => {
          this.rentalsSignal.update((rentals) =>
            rentals.map((r) => (r.id === rental.id ? rental : r)),
          );
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to update rental'));
          this.loadingSignal.set(false);
        },
      });
  }

  deleteRental(id: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.operationsApi
      .deleteRental(id)
      .pipe(retry(2))
      .subscribe({
        next: () => {
          this.rentalsSignal.update((rentals) => rentals.filter((r) => r.id !== id));
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to delete rental'));
          this.loadingSignal.set(false);
        },
      });
  }

  addIncident(incident: Incident): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.operationsApi
      .createIncident(incident)
      .pipe(retry(2))
      .subscribe({
        next: (createdIncident) => {
          this.incidentsSignal.update((incidents) => [...incidents, createdIncident]);
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to create incident'));
          this.loadingSignal.set(false);
        },
      });
  }

  updateIncident(updatedIncident: Incident): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.operationsApi
      .updateIncident(updatedIncident)
      .pipe(retry(2))
      .subscribe({
        next: (incident) => {
          this.incidentsSignal.update((incidents) =>
            incidents.map((i) => (i.id === incident.id ? incident : i)),
          );
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to update incident'));
          this.loadingSignal.set(false);
        },
      });
  }

  deleteIncident(id: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.operationsApi
      .deleteIncident(id)
      .pipe(retry(2))
      .subscribe({
        next: () => {
          this.incidentsSignal.update((incidents) => incidents.filter((i) => i.id !== id));
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to delete incident'));
          this.loadingSignal.set(false);
        },
      });
  }

  private loadRentals(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.operationsApi
      .getRentals()
      .pipe(retry(2))
      .subscribe({
        next: (rentals) => {
          this.rentalsSignal.set(rentals);
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to load rentals'));
          this.loadingSignal.set(false);
        },
      });
  }

  private loadIncidents(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.operationsApi
      .getIncidents()
      .pipe(retry(2))
      .subscribe({
        next: (incidents) => {
          this.incidentsSignal.set(incidents);
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to load incidents'));
          this.loadingSignal.set(false);
        },
      });
  }

  private formatError(error: unknown, fallback: string): string {
    if (error instanceof Error) {
      return error.message;
    }
    return fallback;
  }
}
