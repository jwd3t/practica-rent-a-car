import { BaseEntity } from '../../../shared/infrastructure/base-entity';

// Template note:
// This entity is the direct "internal app model" version of one object from the backend.
// To adapt it to a new case, copy the JSON fields from db.json and rename the class / file.
export class Vehicle implements BaseEntity {
  private _id: number;
  private _make: string;
  private _model: string;
  private _mileageKm: number;
  private _dailyRate: number;
  private _vehicleType: string;
  private _status: string;

  constructor(vehicle: {
    id: number;
    make: string;
    model: string;
    mileageKm: number;
    dailyRate: number;
    vehicleType: string;
    status: string;
  }) {
    this._id = vehicle.id;
    this._make = vehicle.make;
    this._model = vehicle.model;
    this._mileageKm = vehicle.mileageKm;
    this._dailyRate = vehicle.dailyRate;
    this._vehicleType = vehicle.vehicleType;
    this._status = vehicle.status;
  }

  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }
  get make(): string {
    return this._make;
  }

  set make(value: string) {
    this._make = value;
  }
  get model(): string {
    return this._model;
  }

  set model(value: string) {
    this._model = value;
  }
  get mileageKm(): number {
    return this._mileageKm;
  }

  set mileageKm(value: number) {
    this._mileageKm = value;
  }
  get dailyRate(): number {
    return this._dailyRate;
  }

  set dailyRate(value: number) {
    this._dailyRate = value;
  }
  get vehicleType(): string {
    return this._vehicleType;
  }

  set vehicleType(value: string) {
    this._vehicleType = value;
  }
  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
  }
}
