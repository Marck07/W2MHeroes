import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";
import {MatDialogModule} from '@angular/material/dialog';

import { HeroeInfoComponent } from './heroe-info.component';

describe('HeroeInfoComponent', () => {
  let component: HeroeInfoComponent;
  let fixture: ComponentFixture<HeroeInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule,
                RouterTestingModule, MatDialogModule],
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
