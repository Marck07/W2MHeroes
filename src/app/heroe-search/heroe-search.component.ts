import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroeService } from '../services/hero-service/heroe.service';

@Component({
  selector: 'app-heroe-search',
  templateUrl: './heroe-search.component.html',
  styleUrls: ['./heroe-search.component.css']
})
export class HeroeSearchComponent implements OnInit {
  heroes$!: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroeService: HeroeService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      switchMap((term: string) => this.heroeService.searchHeroes(term)),
    );
  }
}
