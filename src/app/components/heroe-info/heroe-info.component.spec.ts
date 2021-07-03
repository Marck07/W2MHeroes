import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroeInfoComponent } from './components/heroe-info.component';

describe('HeroeInfoComponent', () => {
  let component: HeroeInfoComponent;
  let fixture: ComponentFixture<HeroeInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroeInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
