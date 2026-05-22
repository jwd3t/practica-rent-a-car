import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export class Incident implements BaseEntity {
  private _id: number;
  private _vehicleId: number;
  private _rentalId: number | null;
  private _incidentType: string;
  private _registeredAt: string;
  private _estimatedRepairCost: number;
  private _priority: string;

  constructor(incident: {
    id: number;
    vehicleId: number;
    rentalId: number | null;
    incidentType: string;
    registeredAt: string;
    estimatedRepairCost: number;
    priority: string;
  }) {
    this._id = incident.id;
    this._incidentType = incident.incidentType;
    this._rentalId = incident.rentalId;
    this._priority = incident.priority;
    this._registeredAt = incident.registeredAt;
    this._estimatedRepairCost = incident.estimatedRepairCost;
    this._vehicleId = incident.vehicleId;
  }

  get priority(): string {
    return this._priority;
  }

  set priority(value: string) {
    this._priority = value;
  }
  get estimatedRepairCost(): number {
    return this._estimatedRepairCost;
  }

  set estimatedRepairCost(value: number) {
    this._estimatedRepairCost = value;
  }
  get registeredAt(): string {
    return this._registeredAt;
  }

  set registeredAt(value: string) {
    this._registeredAt = value;
  }
  get incidentType(): string {
    return this._incidentType;
  }

  set incidentType(value: string) {
    this._incidentType = value;
  }
  get rentalId(): number | null {
    return this._rentalId;
  }

  set rentalId(value: number | null) {
    this._rentalId = value;
  }
  get vehicleId(): number {
    return this._vehicleId;
  }

  set vehicleId(value: number) {
    this._vehicleId = value;
  }
  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }
}
