import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {MatDialog} from '@angular/material/dialog';

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
  public loading = false;
  constructor(private route: ActivatedRoute,
              private heroeService: HeroeService,
              private location: Location, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    this.loading = true;
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroeService.getHero(id)
      .subscribe(hero => {
        this.hero = hero
        this.loading = false;
      });
  }

  save(): void {
    if (this.hero) {
      const dialogRef = this.dialog.open(DialogConfirmComponent, {
          data: {procedencia: 'Editar'}
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result === true) {
          this.heroeService.updateHero(this.hero)
          .subscribe(() => this.goBack());
        }
      });

    }
  }

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

  goBack(): void {
    this.location.back();
  }

}
