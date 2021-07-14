import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

// Custom Components
import { Hero } from '../../models/hero';
import { HeroeService } from '../../services/hero-service/heroe.service';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'identity', 'age', 'city', 'universe'];
  public dataSource: MatTableDataSource<Hero>;
  public loading = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  heroes: Hero[] = [];

  constructor(private heroeService: HeroeService, private route: ActivatedRoute,
              private router: Router, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Hero>([]);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.getHeroes();
  }

  applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Obtiene Heroes Almacenados
  getHeroes(): void {
    this.loading = true;
    this.heroeService.getHeroes().subscribe(heroes => {
      this.loading = false;
      this.heroes = heroes.reverse();
      this.dataSource = new MatTableDataSource<Hero>(this.heroes);
      this.dataSource.paginator = this.paginator;
    });
  }

  // Dirige a la pagina de conutla heroe enviando Id como parametro
  goToHero(id) {
    this.router.navigate(['/info/' + id]);
  }

  help() {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
        data: {procedencia: 'Help'}
    });
  }
}
