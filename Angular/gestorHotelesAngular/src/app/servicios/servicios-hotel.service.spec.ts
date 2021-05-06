import { TestBed } from '@angular/core/testing';

import { ServiciosHotelService } from './servicios-hotel.service';

describe('ServiciosHotelService', () => {
  let service: ServiciosHotelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciosHotelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
