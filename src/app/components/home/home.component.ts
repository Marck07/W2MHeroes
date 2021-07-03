import { Component, OnInit } from '@angular/core';
import { Hero } from '../../models/hero';
import { HeroeService } from '../../services/hero-service/heroe.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroeService: HeroeService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroeService.getHeroes().subscribe(heroes => {
      this.heroes = heroes.slice(1, 5)
    });
  }
}