import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarHotelComponent } from './agregar-hotel.component';

describe('AgregarHotelComponent', () => {
  let component: AgregarHotelComponent;
  let fixture: ComponentFixture<AgregarHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarHotelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
