import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelesPopularesComponent } from './hoteles-populares.component';

describe('HotelesPopularesComponent', () => {
  let component: HotelesPopularesComponent;
  let fixture: ComponentFixture<HotelesPopularesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelesPopularesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelesPopularesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
