import { Rental } from '../domain/model/rental.entity';
import { RentalResource, RentalsResponse } from './rental-response';
import { BaseAssembler } from '../../shared/infrastructure/base-assembler';


export class RentalAssembler implements BaseAssembler<Rental ,RentalResource,RentalsResponse > {
  toEntityFromResource(resource: RentalResource): Rental {
    return new Rental({
      id: resource.id,
      vehicleId: resource.vehicleId,
      clientId: resource.clientId,
      startDate: resource.startDate,
      endDate: resource.endDate,
      durationDays: resource.durationDays,
      totalCost: resource.totalCost,
      status: resource.status,
    });
  }

  toResourceFromEntity(entity: Rental): RentalResource {
    return {
      id: entity.id,
      vehicleId: entity.vehicleId,
      clientId: entity.clientId,
      startDate: entity.startDate,
      endDate: entity.endDate,
      durationDays: entity.durationDays,
      totalCost: entity.totalCost,
      status: entity.status,
    };
  }

  toEntitiesFromResponse(response: RentalsResponse): Rental[] {
    return response.rentals.map((resource) => this.toEntityFromResource(resource));
  }
}
