import { Component, Input } from '@angular/core';
import { Article } from '../../interfaces/index';

import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent  {

  @Input() article: Article;
  @Input() index: number = 0;

  constructor( 
    private iab: InAppBrowser,
    private platform: Platform 
  ) { }

  openArticle(){     
    
    if( this.platform.is('ios') || this.platform.is('android') ){
      // En el dispositivo
      const browser = this.iab.create(this.article.url);
            browser.show();
    }else{
      // En la web
      console.log('Estamos en la web');
      
      window.open( this.article.url, '_blank' );
    }

  }




}
