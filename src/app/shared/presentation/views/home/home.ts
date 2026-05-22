import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

import { MastersStore } from '../../../../masters/application/masters-store';
import { OperationsStore } from '../../../../operations/application/operations-store';

@Component({
  selector: 'app-home',
  imports: [MatCardModule, CurrencyPipe, DatePipe, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  readonly mastersStore = inject(MastersStore);
  readonly operationsStore = inject(OperationsStore);

  readonly loading = computed(
    () => this.mastersStore.loading() || this.operationsStore.loading(),
  );

  readonly error = computed(
    () => this.mastersStore.error() || this.operationsStore.error(),
  );

  readonly fleetStats = computed(() => {
    const vehicles = this.mastersStore.vehicles();
    const incidents = this.operationsStore.incidents();
    const types = [...new Set(vehicles.map((vehicle) => vehicle.vehicleType))];

    return types.map((vehicleType) => {
      const vehiclesByType = vehicles.filter((vehicle) => vehicle.vehicleType === vehicleType);
      const rentedVehicles = vehiclesByType.filter((vehicle) => vehicle.status === 'RENTED');
      const relatedVehicleIds = new Set(vehiclesByType.map((vehicle) => vehicle.id));

      const estimatedIncidentCost = incidents
        .filter((incident) => relatedVehicleIds.has(incident.vehicleId))
        .reduce((total, incident) => {
          const factor = incident.priority === 'HIGH' ? 2 : 1;
          return total + incident.estimatedRepairCost * factor;
        }, 0);

      return {
        vehicleType,
        dailyRevenuePotential: rentedVehicles.reduce(
          (total, vehicle) => total + vehicle.dailyRate,
          0,
        ),
        estimatedIncidentCost: Number(estimatedIncidentCost.toFixed(2)),
        vehiclesRented: rentedVehicles.length,
      };
    });
  });

  readonly nextUrgentIncident = computed(() => {
    const incident = [...this.operationsStore.incidents()]
      .filter((item) => item.priority === 'NORMAL')
      .sort(
        (left, right) =>
          new Date(right.registeredAt).getTime() - new Date(left.registeredAt).getTime(),
      )[0];

    if (!incident) {
      return null;
    }

    const vehicle = this.mastersStore
      .vehicles()
      .find((item) => item.id === incident.vehicleId);

    return { incident, vehicle };
  });
}
