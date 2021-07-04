import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

// Custom Components
import { Hero } from '../../models/hero';
import { HeroeService } from '../../services/hero-service/heroe.service';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'identity', 'age', 'city', 'universe'];
  public dataSource: MatTableDataSource<Hero>;

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
    this.heroeService.getHeroes().subscribe(heroes => {
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
