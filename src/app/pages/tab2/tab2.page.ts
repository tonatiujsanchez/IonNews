import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Article } from '../../interfaces/index';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  public categories: string[] = [ 'health', 'business', 'entertainment', 'science', 'sports', 'technology' ];
  public SelectedCategory: string = this.categories[0];
  public articles: Article[] = [];
  constructor( private NewsSvc: NewsService ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getTopHeadlinesByCategory();

    
  }

  segmentChanged( category ){
    this.SelectedCategory = category.detail.value;
    this.getTopHeadlinesByCategory();    
  }

  getTopHeadlinesByCategory(){
    this.NewsSvc.getTopHeadlinesByCategory( this.SelectedCategory )
      .subscribe( articles => {

        this.articles = [...articles]
        
      })
  }

  loadData( event ){
    console.log( event );

    this.NewsSvc.getTopHeadlinesByCategory( this.SelectedCategory, true )
      .subscribe( articles => {
      
        this.articles = articles;
        event.target.complete();  
      
      })
  }
}
