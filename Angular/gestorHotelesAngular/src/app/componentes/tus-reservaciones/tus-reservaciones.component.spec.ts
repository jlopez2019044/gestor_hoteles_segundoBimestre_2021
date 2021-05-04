import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TusReservacionesComponent } from './tus-reservaciones.component';

describe('TusReservacionesComponent', () => {
  let component: TusReservacionesComponent;
  let fixture: ComponentFixture<TusReservacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TusReservacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TusReservacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
