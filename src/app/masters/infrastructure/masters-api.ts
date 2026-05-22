import { Injectable } from '@angular/core';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { VehiclesApiEndpoint } from './vehicles-api-endpoint';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle } from '../domain/model/vehicle.entity';

@Injectable({
  providedIn: 'root',
})
export class MastersApi extends BaseApi {
  private readonly vehicleEndpoint: VehiclesApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this.vehicleEndpoint = new VehiclesApiEndpoint(http);
  }

  getVehicles(): Observable<Vehicle[]> {
    return this.vehicleEndpoint.getAll();
  }

  getVehicle(id: number): Observable<Vehicle> {
    return this.vehicleEndpoint.getById(id);
  }

  createVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.vehicleEndpoint.create(vehicle);
  }

  updateVehicle(vehicle: Vehicle): Observable<Vehicle>{
   return this.vehicleEndpoint.update(vehicle,vehicle.id)
  }

  deleteVehicle(id:number):Observable<void>{
    return this.vehicleEndpoint.delete(id);
  }
}
