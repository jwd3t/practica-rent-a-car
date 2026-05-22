import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Incident } from '../domain/model/incident.entity';
import { IncidentResource, IncidentsResponse } from './incident-response';
import { IncidentAssembler } from './incident-assembler';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export class IncidentApiEndpoint extends BaseApiEndpoint<Incident, IncidentResource, IncidentsResponse, IncidentAssembler>{
  constructor(http:HttpClient) {
    super(http,
      `${environment.apiBaseUrl}${environment.incidentsEndpointPath}`,
      new IncidentAssembler()
    );
  }
}
