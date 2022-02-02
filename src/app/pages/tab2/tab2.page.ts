import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Article } from '../../interfaces/index';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;

  public categories: string[] = [ 'health', 'business', 'entertainment', 'science', 'sports', 'technology' ];
  public SelectedCategory: string = this.categories[0];
  public articles: Article[] = [];

  public categoriesInfiniteScroll ={

  }

  constructor( private newsSvc: NewsService ) {}

  ngOnInit(): void {

    this.infiniteScrollCheck();
    this.getTopHeadlinesByCategory();    
  }

  
  segmentChanged( category ){
    this.SelectedCategory = category.detail.value;
    
    this.infiniteScrollCheck();
    this.getTopHeadlinesByCategory();        
  }


  getTopHeadlinesByCategory(){

    this.newsSvc.getTopHeadlinesByCategory( this.SelectedCategory )
      .subscribe( articles => {

        this.articles = [...articles]
        
      })
  }


  loadData(){
  
    this.newsSvc.getTopHeadlinesByCategory( this.SelectedCategory, true )
      .subscribe( articles => {
     
        
        if( articles.length === this.articles.length ){
          this.categoriesInfiniteScroll[this.SelectedCategory].infiniteScrollDisabled = true;
          this.infiniteScrollCheck();
          return;
        }
      
        this.articles = articles;
        this.infiniteScroll.complete();
      
      })
  }


  infiniteScrollCheck(){
    if( !(Object.keys( this.categoriesInfiniteScroll ).includes( this.SelectedCategory ) ) ){
      this.categoriesInfiniteScroll[this.SelectedCategory] = {
        infiniteScrollDisabled: false,
      };
    }
    
    this.infiniteScroll.disabled = this.categoriesInfiniteScroll[this.SelectedCategory].infiniteScrollDisabled;
    
  }

/*
loadData( event ){

  this.newsSvc.getTopHeadlinesByCategory( this.SelectedCategory, true )
    .subscribe( articles => {
      event.target.disabled = false;
      
      console.log( 'articles',articles.length );
      console.log( 'this.articles ',this.articles.length );
      
      
      if( articles.length === this.articles.length ){
        event.target.disabled = true;
        return;
      }
    
      this.articles = articles;
      event.target.complete();  
    
    })
}
*/
}


