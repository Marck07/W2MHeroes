import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

// Custom Components
import { HeroeService } from '../../services/hero-service/heroe.service';
import { Hero } from '../../models/hero';
import { HEROES } from '../../models/mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {

  heroes: Hero[] = [];
  selectedHero?: Hero;
  universes: string[] = ['Marvel', 'DC'];
  hero = {name:'', identity: '', age: 0, city: '', universe: ''};
  constructor(private heroeService: HeroeService, private location: Location) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
  this.heroeService.getHeroes().subscribe(heroes => {
      this.heroes = heroes
    });
  }

  add(): void {
    this.heroeService.addHero(this.hero as Hero)
      .subscribe(hero => {
        console.log('respuesta', hero)
        this.heroes.push(hero);
      });
      this.goBack();
  }

  goBack() {
    this.location.back();

  }
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroeService.deleteHero(hero.id).subscribe();
  }
  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  // }
}
