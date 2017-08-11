import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { AngularFireDatabase,FirebaseObjectObservable  } from 'angularfire2/database';
/**
 * Generated class for the DetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */



@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  jugadorJSON: any;
  jugador:FirebaseObjectObservable<any>;
  key:string;
  chartOptions: any;
  botonPres:boolean = false; 
  ultimodatoVelocidad:number=0;
  ultimodatoRitmo:number=0;
  constructor(public navCtrl: NavController, public navParams: NavParams,db: AngularFireDatabase,public alertController: AlertController) {
    this.chartOptions = {
            chart: {
                type: 'spline'
            },
            title: {
                text: 'Jugador datos'
            },
            // xAxis: {
            //     categories: ['velocidad', 'Pulso Cardiaco']
            // },
            // yAxis: {
            //     title: {
            //         text: 'Fruit eaten'
            //     }
            // },
            series: []
            // series: [{
            //     name: 'velocidad',
            //     data: [1, 0, 4]
            // }, {
            //     name: 'Pulso Cardiaco',
            //     data: [5, 7, 3]
            // }]
        }
    this.key = navParams.get("key");
      this.jugador = db.object('/jugadores/'+this.key);
      this.jugador.subscribe(
        (data)=>{
          this.jugadorJSON = data;
          this.mostrarEstadisticas();
          if(this.ultimodatoRitmo > 140){
            this.showAlert();
          }
        }
      );
  }

  showAlert() {
    let alert = this.alertController.create({
      title: 'New Friend!',
      subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
      buttons: ['OK']
    });
    alert.present();
  }


  listaFirebaseAarray(lista: any[]){
    // return lista.map(
    //   (item)=>{
    //     return item.valor;
    //   }
    // );
    // console.log(lista);
    let resp = [];
    for(let item in lista){
      // console.log(lista[item].valor);
      resp.push(lista[item].valor);
    }
    
    let size = resp.length;
    if(size > 6){
      resp = resp.slice(size-6,size);
    }
    return resp;
  }

  mostrarEstadisticas(){
    this.botonPres=true;
    let series = this.chartOptions.series;

    let velocidad = {
      name:"velocidad",
      data: this.listaFirebaseAarray(this.jugadorJSON.estado.velocidad)
    }
    let ritmo = {
      name:"ritmo",
      data: this.listaFirebaseAarray(this.jugadorJSON.estado.ritmo)
    }
    console.log(velocidad);
    series.push(velocidad);
    series.push(ritmo);
    this.ultimodatoRitmo = ritmo.data[ritmo.data.length-1];
    this.ultimodatoVelocidad = velocidad.data[velocidad.data.length-1];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }
}
