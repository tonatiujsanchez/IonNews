import { Component } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { Article } from '../../interfaces/index';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page  {

  public articles: Article[] = [];

  constructor( private newsSvc: NewsService ) {}

  ngOnInit(): void {
    
    this.newsSvc.getTopHeadlines().subscribe(
      articles => this.articles.push( ...articles )
    );
    
  }
}
