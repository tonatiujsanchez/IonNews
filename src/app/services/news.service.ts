import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { NewsResponse, Article, ArticlesByCategoryAndPage } from '../interfaces/index';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { storedArticlesByCategory } from '../data/mock-news';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class NewsService {

  country = 'us';

  private ArticlesByCategoryAndPage: ArticlesByCategoryAndPage = storedArticlesByCategory;
  // private ArticlesByCategoryAndPage: ArticlesByCategoryAndPage = {}

  

  constructor( private http: HttpClient ) { 
    
  }


  getTopHeadlines(): Observable<Article[]>{

    return this.getArticlesByCategory('general');

    // return this.executeQuery<NewsResponse>(`/top-headlines?category=general`)
    // .pipe(
    //   map( resp => resp.articles )
    // )
  }



  getTopHeadlinesByCategory( category: string, loadMore: boolean = false ):Observable<Article[]> {
    
    // Retonarnamos Data local por las limintaciones de API
    return of( this.ArticlesByCategoryAndPage[ category ].articles );

    if( loadMore ){
      return this.getArticlesByCategory( category );
    }

    if( Object.keys( this.ArticlesByCategoryAndPage ).includes( category ) ){
      return of( this.ArticlesByCategoryAndPage[ category ].articles );
    }

    return this.getArticlesByCategory( category );
  }


  // Cargar más
  private getArticlesByCategory( category: string ): Observable<Article[]> {

    if( Object.keys( this.ArticlesByCategoryAndPage ).includes( category ) ){
      // Si existe

    }else{
      // No exite
      this.ArticlesByCategoryAndPage[category] = {
        page: 0,
        articles: []
      }
    }
    
    const page = this.ArticlesByCategoryAndPage[category].page + 1;

    return this.executeQuery<NewsResponse>( `/top-headlines?category=${ category }&page=${ page }` )
      .pipe(
        map( ({ articles }: NewsResponse) => {


          if( articles.length === 0 ) {
            return this.ArticlesByCategoryAndPage[ category ].articles;
          }

          this.ArticlesByCategoryAndPage[ category ] = {
            page: page,
            articles: [  ...this.ArticlesByCategoryAndPage[ category ].articles, ...articles ]
          }
          return this.ArticlesByCategoryAndPage[ category ].articles;
        })
      )
  }






  private executeQuery<T>( endpoint: string ){

    return this.http.get<T>( `${ apiUrl }${ endpoint }`, {
      params: {
        country: this.country,
        apiKey: apiKey
      }
    });
  }

}
