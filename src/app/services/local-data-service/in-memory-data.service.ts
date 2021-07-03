import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from '../../models/hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 1, name: 'Spiderman', identity: 'Peter Parker', age: 17, city: 'Nueva York', universe: 'Marvel' },
      { id: 2, name: 'Iron Man', identity: 'Tony Stark', age: 41, city: 'Nueva York', universe: 'Marvel' },
      { id: 3, name: 'Batman', identity: 'Bruce Wayne', age: 25, city: 'Gotham', universe: 'DC' },
      { id: 4, name: 'Wolverine', identity: 'James Logan', age: 197, city: 'Alberta', universe: 'Marvel' },
      { id: 5, name: 'Wonderwoman', identity: 'Diana', age: 900, city: 'Themyscira', universe: 'DC' },
      { id: 6, name: 'Arrow', identity: 'Oliver Queen', age: 27, city: 'Starling', universe: 'DC' },
      { id: 7, name: 'Flash', identity: 'Barry Alen', age: 25, city: 'Central', universe: 'DC' },
      { id: 8, name: 'Killer Frost', identity: 'Cailtlin Snow', age: 27, city: 'Central', universe: 'DC' },
      { id: 9, name: 'Superman', identity: 'Clark Kent', age: 26, city: 'Metropolis', universe: 'DC' },
      { id: 10, name: 'Hawkeye', identity: 'Clint Barton', age: 31, city: 'Iowa', universe: 'Marvel' }
    ];
    return {heroes};
  }

  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
