import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

// Template note:
// XResource = one object from the API.
// XsResponse = a response that contains many XResource objects.
export interface VehiclesResponse extends BaseResponse{
  vehicles: VehicleResource[];
}

export interface VehicleResource extends BaseResource {
  id: number;
  make: string;
  model: string;
  mileageKm: number;
  dailyRate: number;
  vehicleType: string;
  status: string;
}
