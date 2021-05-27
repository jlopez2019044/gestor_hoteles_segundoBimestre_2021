import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TusHotelesComponent } from './tus-hoteles.component';

describe('TusHotelesComponent', () => {
  let component: TusHotelesComponent;
  let fixture: ComponentFixture<TusHotelesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TusHotelesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TusHotelesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
