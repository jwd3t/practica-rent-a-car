import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatError } from '@angular/material/form-field';
import { CurrencyPipe } from '@angular/common';

import { MastersStore } from '../../../../masters/application/masters-store';
import { OperationsStore } from '../../../application/operations-store';
import { Rental } from '../../../domain/model/rental.entity';
import { Incident } from '../../../domain/model/incident.entity';

@Component({
  selector: 'app-new-rental',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatError,
    CurrencyPipe,
  ],
  templateUrl: './new-rental.html',
  styleUrl: './new-rental.css',
})
export class NewRental {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  readonly mastersStore = inject(MastersStore);
  readonly operationsStore = inject(OperationsStore);

  readonly localError = signal<string | null>(null);

  // Template note:
  // Replace the form fields below with the minimum input fields required by
  // the current case study. Keep the same reactive forms pattern.
  readonly form = this.fb.nonNullable.group({
    vehicleId: [0, [Validators.required, Validators.min(1)]],
    clientId: [0, [Validators.required, Validators.min(1)]],
    durationDays: [1, [Validators.required, Validators.min(1)]],
  });

  // Template note:
  // This computed property currently filters "selectable vehicles".
  // Replace it with the selection rule required by your own master data.
  readonly selectableVehicles = computed(() =>
    this.mastersStore.vehicles().filter((vehicle) => vehicle.status !== 'MAINTENANCE'),
  );

  cancel(): void {
    this.router.navigate(['/home']).then();
  }

  submit(): void {
    this.localError.set(null);

    if (this.form.invalid) {
      this.localError.set('Please complete the form before creating a rental.');
      return;
    }

    // Template note:
    // Everything below is case-specific business logic.
    // Replace validation rules, derived fields, related record creation and
    // redirect behavior based on the exam requirements.
    const { vehicleId, clientId, durationDays } = this.form.getRawValue();
    const vehicle = this.mastersStore.vehicles().find((item) => item.id === vehicleId);

    if (!vehicle) {
      this.localError.set('The selected vehicle could not be found.');
      return;
    }

    const hasActiveRental = this.operationsStore
      .rentals()
      .some((rental) => rental.vehicleId === vehicleId && rental.status === 'ACTIVE');

    if (hasActiveRental) {
      this.localError.set('This vehicle already has an active rental.');
      return;
    }

    const now = new Date();
    const endDate = new Date(now);
    endDate.setDate(endDate.getDate() + durationDays);

    const rental = new Rental({
      id: 0,
      vehicleId,
      clientId,
      startDate: now.toISOString(),
      endDate: endDate.toISOString(),
      durationDays,
      totalCost: durationDays * vehicle.dailyRate,
      status: 'ACTIVE',
    });

    const cleaningIncident = new Incident({
      id: 0,
      vehicleId,
      rentalId: null,
      incidentType: 'CLEANING',
      registeredAt: now.toISOString(),
      estimatedRepairCost: 50,
      priority: 'NORMAL',
    });

    this.operationsStore.createRentalContract(rental, cleaningIncident);
    this.router.navigate(['/home']).then();
  }
}
