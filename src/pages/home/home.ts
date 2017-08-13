import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { NewGamerComponent } from '../../components/new-gamer/new-gamer';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
   jugadores:FirebaseListObservable<any[]>;
   constructor(public navCtrl: NavController,db: AngularFireDatabase) {
     this.jugadores=db.list('jugadores');
  }
  public goTodetail(key:string){
    this.navCtrl.push(DetailPage,{key: key});
  }

  goToNew():void{
    this.navCtrl.push(NewGamerComponent);
  }
}
