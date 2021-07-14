import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";
import {MatDialogModule} from '@angular/material/dialog';
import { of } from 'rxjs';

import { HomeComponent } from './home.component';
import { Hero } from '../../models/hero';
import { HEROES } from '../../models/mock-heroes';
import { HeroeService } from '../../services/hero-service/heroe.service';
import { HeroeSearchComponent } from '../heroe-search/heroe-search.component'

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let heroService;
  let getHeroes;

  beforeEach(async () => {
    heroService = jasmine.createSpyObj('HeroService', ['getHeroes']);
    getHeroes = heroService.getHeroes.and.returnValue( of(HEROES) );
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule,
                RouterTestingModule, MatDialogModule, RouterTestingModule.withRoutes([])],
      declarations: [ HomeComponent, HeroeSearchComponent ],
      providers: [
        { provide: HeroeService, useValue: heroService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Bienvenido a la busqueda de Heroes!" as headline', () => {
    expect(fixture.nativeElement.querySelector('h2').textContent).toEqual('Bienvenido a la busqueda de Heroes!');
  });

  it('should call heroService', async(() => {
    expect(getHeroes.calls.any()).toBe(true);
    }));

  it('should display table', async(() => {
    expect(fixture.nativeElement.querySelectorAll('table').length).toEqual(1);
  }));

  it('should display loading', async(() => {
    expect(fixture.nativeElement.querySelectorAll('ngx-loading').length).toEqual(1);
  }));

});
