import { Component, OnInit, Input } from '@angular/core';

// custom components
import { Hero } from '../hero';

@Component({
  selector: 'app-heroe-info',
  templateUrl: './heroe-info.component.html',
  styleUrls: ['./heroe-info.component.css']
})
export class HeroeInfoComponent implements OnInit {
  @Input() hero?: Hero;
  constructor() { }

  ngOnInit(): void {
  }

}
