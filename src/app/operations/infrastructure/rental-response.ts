import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface RentalsResponse extends BaseResponse{
  rentals: RentalResource[]
}
export interface RentalResource extends BaseResource {
  id: number;
  vehicleId: number;
  clientId: number;
  startDate: string;
  endDate: string;
  durationDays: number;
  totalCost: number;
  status: string;
}
