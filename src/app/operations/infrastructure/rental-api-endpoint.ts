import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Rental } from '../domain/model/rental.entity';
import { RentalResource, RentalsResponse } from './rental-response';
import { RentalAssembler } from './rental-assembler';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export class RentalApiEndpoint extends BaseApiEndpoint<Rental, RentalResource, RentalsResponse, RentalAssembler>{
  constructor(http:HttpClient) {
    super( http,
      `${environment.apiBaseUrl}${environment.rentalsEndpointPath}`,
      new RentalAssembler()
    );
  }

}
