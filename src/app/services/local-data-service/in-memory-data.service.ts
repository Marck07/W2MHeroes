import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from '../../hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 1, name: 'Spiderman' },
      { id: 2, name: 'Iron Man' },
      { id: 3, name: 'Batman' },
      { id: 4, name: 'Wolwerine' },
      { id: 5, name: 'Wonderwoman' },
      { id: 6, name: 'Arrow' },
      { id: 7, name: 'Flash' },
      { id: 8, name: 'Killer Frost' },
      { id: 9, name: 'Superman' },
      { id: 10, name: 'Hawkeye' }
    ];
    return {heroes};
  }

  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
