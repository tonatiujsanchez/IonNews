import { Component, Input } from '@angular/core';
import { ActionSheetController, ActionSheetButton, Platform } from '@ionic/angular';

import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';


import { StorageService } from '../../services/storage.service';

import { Article } from '../../interfaces/index';

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
    private socialSharing: SocialSharing,
    private StorageSvc: StorageService
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

    const articleIsFavotite = this.StorageSvc.articleIsFavorite( this.article );

    const actionSheetButtons: ActionSheetButton[] = [
      {
        text: articleIsFavotite ? 'Remover favorito' :'Agregar favorito' ,
        icon: articleIsFavotite ? 'heart' :'heart-outline' ,
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

    if( this.platform.is('capacitor') || navigator.share ){
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

    if (this.platform.is('capacitor') || this.platform.is('cordova')) {
      
      this.socialSharing.share(
        title,
        source.name,
        null, 
        url
      );

    } else {

      if (navigator.share) {
        navigator.share({
          title: title,
          text: source.name,
          url: url,
        })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
      }

    }

    
  }

  onToggleFavorite(){
    this.StorageSvc.saveOrRemoveArticle( this.article );
  }





}
