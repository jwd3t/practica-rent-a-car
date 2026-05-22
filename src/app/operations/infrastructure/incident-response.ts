import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface IncidentsResponse extends BaseResponse{
  incidents: IncidentResource[]
}
export interface IncidentResource extends BaseResource {
  id: number;
  vehicleId: number;
  rentalId: number;
  incidentType: string;
  registeredAt: string;
  estimatedRepairCost: number;
  priority: string;
}
