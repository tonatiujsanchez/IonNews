import { Component, ViewChild } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { Article } from '../../interfaces/index';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page  {
  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;

  public articles: Article[] = [];
  public category = 'general';

  constructor( private newsSvc: NewsService ) {}

  ngOnInit(): void {

    this.newsSvc.getTopHeadlinesByCategory( this.category ).subscribe(
      articles => this.articles = articles
    );
    
  }

  loadData(){
  
    this.newsSvc.getTopHeadlinesByCategory( this.category, true )
      .subscribe( articles => {
        
        if( articles.length === this.articles.length ){
          this.infiniteScroll.disabled = true;
          return;
        }
      
        this.articles = articles;
        this.infiniteScroll.complete();
      
      })
  }



}
