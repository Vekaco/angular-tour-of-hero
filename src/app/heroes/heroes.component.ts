import { Component, OnInit } from '@angular/core';
// import { Hero } from '../hero';
// import { HEROES } from '../mock-heroes';
import { HeroService } from "../hero.service";
import { MessageService} from "../message.service";
import {Hero} from "../hero";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  // hero:Hero ={
  //   id:1,
  //   name: 'Windstorm'
  // };

  // selectedHero?: Hero;

  heroes:Hero[] = [];

  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  //   this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`)
  // }

  constructor(private messageService:MessageService,private heroService:HeroService) { }

  getHeroes():void {
    this.heroService.getHeroes().subscribe(heroes => {this.heroes = heroes});
  }

  add(name: string):void{
    name = name.trim();
    if (!name) {return;}
    this.heroService.addHero( {name} as Hero)
      .subscribe(hero=>{this.heroes.push(hero)})
  }

  delete(hero: Hero):void {
    this.heroes = this.heroes.filter(h=> h!==hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }

  ngOnInit(): void {
    this.getHeroes()
  }

}
