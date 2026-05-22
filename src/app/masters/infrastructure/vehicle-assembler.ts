import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Vehicle } from '../domain/model/vehicle.entity';
import { VehicleResource, VehiclesResponse } from './vehicle-response';

// Template note:
// Every assembler repeats the same three transformations:
// resource -> entity
// entity -> resource
// response -> entity[]
export class VehicleAssembler implements BaseAssembler<Vehicle, VehicleResource, VehiclesResponse> {
  toEntityFromResource(resource: VehicleResource): Vehicle {
    return new Vehicle({
      id: resource.id,
      make: resource.make,
      model: resource.model,
      mileageKm: resource.mileageKm,
      dailyRate: resource.dailyRate,
      vehicleType: resource.vehicleType,
      status: resource.status,
    });
  }

  toResourceFromEntity(entity: Vehicle): VehicleResource {
    return {
      id: entity.id,
      make: entity.make,
      model: entity.model,
      mileageKm: entity.mileageKm,
      dailyRate: entity.dailyRate,
      vehicleType: entity.vehicleType,
      status: entity.status,
    };
  }

  toEntitiesFromResponse(response: VehiclesResponse): Vehicle[] {
    return response.vehicles.map((resource) => this.toEntityFromResource(resource));
  }
}
