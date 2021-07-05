import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

// Custom Components
import { Hero } from '../../models/hero';
import { HeroeService } from '../../services/hero-service/heroe.service';


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
              private router: Router) {
    this.dataSource = new MatTableDataSource<Hero>([]);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.getHeroes();
  }

  applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getHeroes(): void {
    this.loading = true;
    this.heroeService.getHeroes().subscribe(heroes => {
      this.loading = false;
      this.heroes = heroes;
      console.log(this.heroes)
      this.dataSource = new MatTableDataSource<Hero>(this.heroes);
      this.dataSource.paginator = this.paginator;

      console.log(this.dataSource)
      // dataSource = new MatTableDataSource<Hero>(ELEMENT_DATA);

    });
  }

  goToHero(id) {
    console.log(id);
    this.router.navigate(['/info/' + id]);
  }
}


/** Builds and returns a new User. */
// function createNewUser(id: number): UserData {
//   const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';
//
//   return {
//     id: id.toString(),
//     name: name,
//     progress: Math.round(Math.random() * 100).toString(),
//     fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))]
//   };
// }
