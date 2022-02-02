import { Component, Input } from '@angular/core';
import { Article } from '../../interfaces/index';

import { ActionSheetButton, Platform } from '@ionic/angular';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';


import { ActionSheetController } from '@ionic/angular';

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
    private platform: Platform,
    private actionSheetCtrl: ActionSheetController,
    private socialSharing: SocialSharing
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


  async onOpenMenu(){

    const actionSheetButtons: ActionSheetButton[] = [
      {
        text: 'Favorito',
        icon: 'heart-outline',
        handler: ()=> this.onToggleFavorite()
      },
      {
        text: 'Cancelar',
        icon: 'close-outline',
        role: 'cancel'
      }
    ];
    const shareButton: ActionSheetButton = {
      text: 'Compartir',
      icon: 'share-outline',
      handler: () => this.onShareArticle()
    }

    if( this.platform.is('capacitor') ){
      actionSheetButtons.unshift( shareButton );
    }

    
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      buttons: actionSheetButtons
    });

    await actionSheet.present();

  }



  onShareArticle(){
    const  { title, source, url } = this.article;
    
    this.socialSharing.share(
      title,
      source.name,
      null, 
      url
    );
    
  }

  onToggleFavorite(){
    console.log('Toggle favorite');
    
  }





}
