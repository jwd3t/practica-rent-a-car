import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApi } from '../../shared/infrastructure/base-api';

import { RentalApiEndpoint } from './rental-api-endpoint';
import { IncidentApiEndpoint } from './incident-api-endpoint';

import { Rental } from '../domain/model/rental.entity';
import { Incident } from '../domain/model/incident.entity';



@Injectable({
  providedIn: 'root',
})
export class OperationsApi extends BaseApi {
  private readonly rentalsEndpoint: RentalApiEndpoint;
  private readonly incidentsEndpoint: IncidentApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this.rentalsEndpoint = new RentalApiEndpoint(http);
    this.incidentsEndpoint = new IncidentApiEndpoint(http);
  }

  getRentals(): Observable<Rental[]> {
    return this.rentalsEndpoint.getAll();
  }

  getRental(id: number): Observable<Rental> {
    return this.rentalsEndpoint.getById(id);
  }

  createRental(rental: Rental): Observable<Rental> {
    return this.rentalsEndpoint.create(rental);
  }

  updateRental(rental: Rental): Observable<Rental> {
    return this.rentalsEndpoint.update(rental, rental.id);
  }

  deleteRental(id: number): Observable<void> {
    return this.rentalsEndpoint.delete(id);
  }

  getIncidents(): Observable<Incident[]> {
    return this.incidentsEndpoint.getAll();
  }

  getIncident(id: number): Observable<Incident> {
    return this.incidentsEndpoint.getById(id);
  }

  createIncident(incident: Incident): Observable<Incident> {
    return this.incidentsEndpoint.create(incident);
  }

  updateIncident(incident: Incident): Observable<Incident> {
    return this.incidentsEndpoint.update(incident, incident.id);
  }

  deleteIncident(id: number): Observable<void> {
    return this.incidentsEndpoint.delete(id);
  }
}
