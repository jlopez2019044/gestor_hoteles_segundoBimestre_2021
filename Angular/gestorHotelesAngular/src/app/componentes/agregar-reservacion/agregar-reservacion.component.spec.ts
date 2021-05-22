import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarReservacionComponent } from './agregar-reservacion.component';

describe('AgregarReservacionComponent', () => {
  let component: AgregarReservacionComponent;
  let fixture: ComponentFixture<AgregarReservacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarReservacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarReservacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
