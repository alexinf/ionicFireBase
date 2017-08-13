import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the NewGamerComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'new-gamer',
  templateUrl: 'new-gamer.html'
})
export class NewGamerComponent {

  text: string;

  constructor(public alertCtrl: AlertController) {
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Nuevo Jugador',
      subTitle: `un nuevo jugador se creara en la siguiente version y se llamara: 
      ${this.text}`,
      buttons: ['OK']
    });
    alert.present();
  }

  save():void{
    this.showAlert();
  }

}
