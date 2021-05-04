import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarAdminHotelComponent } from './registrar-admin-hotel.component';

describe('RegistrarAdminHotelComponent', () => {
  let component: RegistrarAdminHotelComponent;
  let fixture: ComponentFixture<RegistrarAdminHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarAdminHotelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarAdminHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
