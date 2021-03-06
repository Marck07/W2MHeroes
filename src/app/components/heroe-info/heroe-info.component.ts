import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

// custom components
import { Hero } from '../../models/hero';
import { HeroeService } from '../../services/hero-service/heroe.service';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-heroe-info',
  templateUrl: './heroe-info.component.html',
  styleUrls: ['./heroe-info.component.css']
})
export class HeroeInfoComponent implements OnInit {
  @Input() hero?: Hero;

  universes: string[] = ['Marvel', 'DC'];
  nameError = false;
  identityError = false;
  universeError = false;
  public loading = false;
  heroControl: FormGroup;
  constructor(private route: ActivatedRoute,
              private heroeService: HeroeService,
              private location: Location, public dialog: MatDialog, public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getHero();

  }

  // Obtiene la informacion de un Heroe, Consulta por Id
  getHero(): void {
    this.loading = true;
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroeService.getHero(id)
      .subscribe(hero => {
        this.hero = hero
        this.heroControl = this.formBuilder.group({
          name: [this.hero.name],
          identity: [this.hero.identity],
          city: [this.hero.city],
          age: [this.hero.age],
          universe: [this.hero.universe],
          id: [this.hero.id]
        });
        this.loading = false;
      });
  }

  // Envia la informacion actualizada de un heroe
  save(): void {
    this.hero = this.heroControl.value;
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
    if (this.hero) {
      const dialogRef = this.dialog.open(DialogConfirmComponent, {
          data: {procedencia: 'Editar'}
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result === true) {
          // Edita un heroe enviando un objeto con la informacion actualizada
          this.heroeService.updateHero(this.hero)
          .subscribe(() => this.goBack());
        }
      });

    }
  }

  // Elimina un Heroe enviando el id
  delete(id): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: {procedencia: 'Eliminar'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === true) {
        this.heroeService.deleteHero(id).subscribe();
        this.goBack();
      }
    });
  }

  // Retrocede a la pagina anterior
  goBack(): void {
    this.location.back();
  }

}
