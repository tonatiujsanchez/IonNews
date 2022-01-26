import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { NewsResponse, Article } from '../interfaces/index';

import { map } from 'rxjs/operators';

const apiKey = environment.apiKey;


@Injectable({
  providedIn: 'root'
})
export class NewsService {

  

  constructor( private http: HttpClient ) { 
    
  }


  getTopHeadlines(): Observable<Article[]>{

    return this.http.get<NewsResponse>( `https://newsapi.org/v2/top-headlines?country=us&category=business`,{
      params: { apiKey: apiKey }
    })
    .pipe(
      map( resp => resp.articles )
    )
  }


}
