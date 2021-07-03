import { Component, OnInit } from '@angular/core';

// Custom Components
import { HeroeService } from '../services/hero-service/heroe.service';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {

  heroes: Hero[] = [];
  selectedHero?: Hero;

  constructor(private heroeService: HeroeService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
  this.heroeService.getHeroes().subscribe(heroes => {
      this.heroes = heroes
    });
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroeService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroeService.deleteHero(hero.id).subscribe();
  }
  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  // }
}
