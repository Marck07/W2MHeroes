import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {MatDialog} from '@angular/material/dialog';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

// Custom Components
import { HeroeService } from '../../services/hero-service/heroe.service';
import { Hero } from '../../models/hero';
import { HEROES } from '../../models/mock-heroes';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';

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
  nameError = false;
  identityError = false;
  universeError = false;
  constructor(private heroeService: HeroeService, private location: Location, public dialog: MatDialog, private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.getHeroes();
  }

  // Obtiene lista de Heroes
  getHeroes(): void {
  this.heroeService.getHeroes().subscribe(heroes => {
      this.heroes = heroes
    });
  }

  // Agrega un nuevo Heroe
  add(): void {
    // Valida Nombre, identidad y universo obligatorios.
    if(!this.hero.name){
      this.nameError = true;
      return;
    } else if(!this.hero.identity) {
      this.identityError = true;
      return;
    } else if(!this.hero.universe) {
      this.universeError = true;
      return;
    }
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: {procedencia: 'Nuevo'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === true) {
        // Envia un objeto Heroe para crear uno nuevo.
        this.heroeService.addHero(this.hero as Hero)
          .subscribe(hero => {
            this.heroes.push(hero);
          });
          this.goBack();
      }
    });

  }

  // Regresa a la pagina de inicio
  goBack() {
    this.router.navigate(['/home/']);
  }

  // Elimina un heroe enviando el ID
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroeService.deleteHero(hero.id).subscribe();
  }

}
