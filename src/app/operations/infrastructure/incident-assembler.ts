import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Incident } from '../domain/model/incident.entity';
import { IncidentResource, IncidentsResponse } from './incident-response';

export class IncidentAssembler implements BaseAssembler<
  Incident,
  IncidentResource,
  IncidentsResponse
> {
  toEntityFromResource(resource: IncidentResource): Incident {
    return new Incident({
      id: resource.id,
      vehicleId: resource.vehicleId,
      rentalId: resource.rentalId,
      incidentType: resource.incidentType,
      registeredAt: resource.registeredAt,
      estimatedRepairCost: resource.estimatedRepairCost,
      priority: resource.priority,
    });
  }

  toResourceFromEntity(entity: Incident): IncidentResource {
    return {
      id: entity.id,
      vehicleId: entity.vehicleId,
      rentalId: entity.rentalId,
      incidentType: entity.incidentType,
      registeredAt: entity.registeredAt,
      estimatedRepairCost: entity.estimatedRepairCost,
      priority: entity.priority,
    };
  }

  toEntitiesFromResponse(response: IncidentsResponse): Incident[] {
    return response.incidents.map((resource) => this.toEntityFromResource(resource));
  }
}
