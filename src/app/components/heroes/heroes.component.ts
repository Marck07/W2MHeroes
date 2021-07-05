import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {MatDialog} from '@angular/material/dialog';

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
  constructor(private heroeService: HeroeService, private location: Location, public dialog: MatDialog) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
  this.heroeService.getHeroes().subscribe(heroes => {
      this.heroes = heroes
    });
  }

  add(): void {
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
      console.log(`Dialog result: ${result}`);
      if(result === true) {
        this.heroeService.addHero(this.hero as Hero)
          .subscribe(hero => {
            console.log('respuesta', hero)
            this.heroes.push(hero);
          });
          this.goBack();
      }
    });

  }

  goBack() {
    this.location.back();

  }
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroeService.deleteHero(hero.id).subscribe();
  }

  // openDialog() {
  //   const dialogRef = this.dialog.open(DialogConfirmComponent);
  //
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }
  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  // }
}
