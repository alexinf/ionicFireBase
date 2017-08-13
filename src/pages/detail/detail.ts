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
  contador: number = 0;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    db: AngularFireDatabase,public alertController: AlertController) {
    this.chartOptions = this.getChart();
    this.key = navParams.get("key");
    
    this.jugador = db.object('/jugadores/'+this.key);
    this.jugador.subscribe( (data)=>{
      this.jugadorJSON = data;
      // this.mostrarEstadisticas();
      this.controls();
      this.contador++;
      this.updateStates();
    });

  }

  controls(){
    if(this.ultimodatoRitmo > 140){
      //this.showAlert();
    }
    if(this.contador>=3 || this.contador == 0){
      this.mostrarEstadisticas();
      this.contador = 0;
    }
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
    let maxSize = 8;
    let resp = [];
    for(let item in lista){
      resp.push(lista[item].valor);
    }
    
    let size = resp.length;
    if(size > maxSize){
      resp = resp.slice(size-maxSize,size);
    }
    return resp;
  }

  mostrarEstadisticas(){
    this.botonPres=true;
    this.chartOptions = this.getChart();
    let series = this.chartOptions.series;
    let velocidad = this.getVelocidad();
    let ritmo = this.getRitmo();
    series.push(velocidad);
    series.push(ritmo);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

  getVelocidad(): any{
    return {
      name:"velocidad",
      data: this.listaFirebaseAarray(this.jugadorJSON.estado.velocidad)
    };
  }

  getRitmo():any{
    return {
      name:"ritmo",
      data: this.listaFirebaseAarray(this.jugadorJSON.estado.ritmo)
    };
  }

  getRitmo2():any{
    return {
      name:"ritmo",
      data: [100,100,100,100,100,100,120]
    };
  }

  updateStates(){
    let velocidad = this.getVelocidad();
    let ritmo = this.getRitmo2();
    this.ultimodatoRitmo = ritmo.data[ritmo.data.length-1];
    this.ultimodatoVelocidad = velocidad.data[velocidad.data.length-1];
  }

  getChart(){
    return {
            chart: {
                type: 'spline'
            },
            title: {
                text: 'datos del Jugador'
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
  }
}
