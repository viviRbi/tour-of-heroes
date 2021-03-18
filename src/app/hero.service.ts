import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Hero} from './hero';
import {HEROES} from './mock-heroes';
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class HeroService {

  private heroesUrl = 'api/heroes';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
    ) { }

    // Mock-heroes way
  /*getHeroes(): Observable<Hero[]>{
    const heroes = of (HEROES);
    this.messageService.add('HeroService: fetched heroes');
    return heroes;
  }*/

  // Http way
  getHeroes(): Observable<Hero[]>{
    return this.http.get<Hero[]> (this.heroesUrl)
    .pipe(
      catchError(this.handleError<Hero[]>('getHeroes',[]))
    )
  }

  /*getHero(id: number): Observable<Hero>{
    this.messageService.add(`HeroService: fetched hero id=${id}`)
    const hero = of(HEROES.find(hero => hero.id === id))
    return hero
  }*/

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    )
  }

  private log(message: string){
    this.messageService.add(`HeroService: ${message}`)
  }

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.log(error)
      this.log(`${operation} failed: ${error.message}`)
      return of(result as T);
    }
  }

}
