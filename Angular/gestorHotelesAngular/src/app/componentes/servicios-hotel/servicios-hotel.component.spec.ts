import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosHotelComponent } from './servicios-hotel.component';

describe('ServiciosHotelComponent', () => {
  let component: ServiciosHotelComponent;
  let fixture: ComponentFixture<ServiciosHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiciosHotelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
