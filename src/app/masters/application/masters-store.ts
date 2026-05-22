import { Injectable, computed, signal } from '@angular/core';
import { Vehicle } from '../domain/model/vehicle.entity';
import { MastersApi } from '../infrastructure/masters-api';
import { retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MastersStore {
  private readonly vehiclesSignal = signal<Vehicle[]>([]);
  readonly vehicles = this.vehiclesSignal.asReadonly();

  private readonly loadingSignal = signal<boolean>(false);
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);
  readonly error = this.errorSignal.asReadonly();

  readonly vehicleCount = computed(() => this.vehicles().length);

  constructor(private mastersApi: MastersApi) {
    this.loadVehicles();
  }

  addVehicle(vehicle: Vehicle): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.mastersApi
      .createVehicle(vehicle)
      .pipe(retry(2))
      .subscribe({
        next: (createdVehicle) => {
          this.vehiclesSignal.update((vehicles) => [...vehicles, createdVehicle]);
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to create vehicle'));
          this.loadingSignal.set(false);
        },
      });
  }

  updateVehicle(updatedVehicle: Vehicle): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.mastersApi
      .updateVehicle(updatedVehicle)
      .pipe(retry(2))
      .subscribe({
        next: (vehicle) => {
          this.vehiclesSignal.update((vehicles) =>
            vehicles.map((v) => (v.id === vehicle.id ? vehicle : v)),
          );
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to update vehicle'));
          this.loadingSignal.set(false);
        },
      });
  }

  deleteVehicle(id: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.mastersApi
      .deleteVehicle(id)
      .pipe(retry(2))
      .subscribe({
        next: () => {
          this.vehiclesSignal.update((vehicles) => vehicles.filter((v) => v.id !== id));
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to delete vehicle'));
          this.loadingSignal.set(false);
        },
      });
  }

  private loadVehicles(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.mastersApi
      .getVehicles()
      .pipe(retry(2))
      .subscribe({
        next: (vehicles) => {
          this.vehiclesSignal.set(vehicles);
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to load vehicles'));
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
