import { Component, OnInit } from '@angular/core';

// Custom Components
import { HeroeService } from '../heroe.service';
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

  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  // }
}
