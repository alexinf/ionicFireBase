webpackJsonp([1],{

/***/ 139:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(107);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the DetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var DetailPage = (function () {
    function DetailPage(navCtrl, navParams, db, alertController) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertController = alertController;
        this.botonPres = false;
        this.ultimodatoVelocidad = 0;
        this.ultimodatoRitmo = 0;
        this.contador = 0;
        this.chartOptions = this.getChart();
        this.key = navParams.get("key");
        this.jugador = db.object('/jugadores/' + this.key);
        this.jugador.subscribe(function (data) {
            _this.jugadorJSON = data;
            // this.mostrarEstadisticas();
            _this.controls();
            _this.contador++;
            _this.updateStates();
        });
    }
    DetailPage.prototype.controls = function () {
        if (this.ultimodatoRitmo > 140) {
            //this.showAlert();
        }
        if (this.contador >= 3 || this.contador == 0) {
            this.mostrarEstadisticas();
            this.contador = 0;
        }
    };
    DetailPage.prototype.showAlert = function () {
        var alert = this.alertController.create({
            title: 'New Friend!',
            subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
            buttons: ['OK']
        });
        alert.present();
    };
    DetailPage.prototype.listaFirebaseAarray = function (lista) {
        var maxSize = 8;
        var resp = [];
        for (var item in lista) {
            resp.push(lista[item].valor);
        }
        var size = resp.length;
        if (size > maxSize) {
            resp = resp.slice(size - maxSize, size);
        }
        return resp;
    };
    DetailPage.prototype.mostrarEstadisticas = function () {
        this.botonPres = true;
        this.chartOptions = this.getChart();
        var series = this.chartOptions.series;
        var velocidad = this.getVelocidad();
        var ritmo = this.getRitmo();
        series.push(velocidad);
        series.push(ritmo);
    };
    DetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DetailPage');
    };
    DetailPage.prototype.getVelocidad = function () {
        return {
            name: "velocidad",
            data: this.listaFirebaseAarray(this.jugadorJSON.estado.velocidad)
        };
    };
    DetailPage.prototype.getRitmo = function () {
        return {
            name: "ritmo",
            data: this.listaFirebaseAarray(this.jugadorJSON.estado.ritmo)
        };
    };
    DetailPage.prototype.getRitmo2 = function () {
        return {
            name: "ritmo",
            data: [100, 100, 100, 100, 100, 100, 120]
        };
    };
    DetailPage.prototype.updateStates = function () {
        var velocidad = this.getVelocidad();
        var ritmo = this.getRitmo2();
        this.ultimodatoRitmo = ritmo.data[ritmo.data.length - 1];
        this.ultimodatoVelocidad = velocidad.data[velocidad.data.length - 1];
    };
    DetailPage.prototype.getChart = function () {
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
        };
    };
    return DetailPage;
}());
DetailPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-detail',template:/*ion-inline-start:"/Users/irvin/Documents/sites/ionicFireBase/src/pages/detail/detail.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>Datos Jugador</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content >\n    <ion-card>\n      <ion-card-header>\n        <h1>{{(jugador | async)?.nombre}} </h1>\n      </ion-card-header>\n\n   <img [src]="(jugador | async)?.imagen"/> \n      <ion-card-content>\n        <ion-card-title>\n          <h3><ion-icon class="iconBtn" name="heart"></ion-icon> Ritmo Cardiaco : {{ultimodatoRitmo}} </h3>\n          <h3><ion-icon class="iconBtn" name="walk"></ion-icon> Velocidad : {{ultimodatoVelocidad}} </h3>\n          <h3><ion-icon class="iconBtn" name="thermometer"></ion-icon> Temperatura : {{contador}} </h3>\n        </ion-card-title>\n    <button (click)="mostrarEstadisticas()" *ngIf="jugador!=null " ion-button color="dark" round>Ver</button> \n    <button (click)="simulatePromise(1,2)" *ngIf="jugador!=null " ion-button color="dark" round>Simulate</button>\n    \n    <button (click)="botonPres=!botonPres" *ngIf="jugador!=null"\n    ion-button color="secondary" large>\n    Ver estadisticas\n      <ion-icon class="iconBtn" name="walk"></ion-icon> \n    </button> \n      </ion-card-content>\n    </ion-card>\n\n    <div class="chart-container" style="position: relative;">\n      <chart id="chart" *ngIf="botonPres" [options]="chartOptions"  type="chart"></chart>\n    </div>\n    <!-- <p>{{jugador | async | json}}</p>   -->\n<!-- <button ion-button block color="dark" (click)="showAlert()">Show Basic Alert</button> -->\n</ion-content>\n'/*ion-inline-end:"/Users/irvin/Documents/sites/ionicFireBase/src/pages/detail/detail.html"*/,
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _d || Object])
], DetailPage);

var _a, _b, _c, _d;
//# sourceMappingURL=detail.js.map

/***/ }),

/***/ 147:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 147;

/***/ }),

/***/ 188:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/detail/detail.module": [
		415,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 188;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 268:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__detail_detail__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_new_gamer_new_gamer__ = __webpack_require__(269);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HomePage = (function () {
    function HomePage(navCtrl, db) {
        this.navCtrl = navCtrl;
        this.jugadores = db.list('jugadores');
    }
    HomePage.prototype.goTodetail = function (key) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__detail_detail__["a" /* DetailPage */], { key: key });
    };
    HomePage.prototype.goToNew = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__components_new_gamer_new_gamer__["a" /* NewGamerComponent */]);
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-home',template:/*ion-inline-start:"/Users/irvin/Documents/sites/ionicFireBase/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>\n      <ion-title>UMSS-APP</ion-title>\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <h1>jugadores</h1>\n  <ion-list>\n    <ion-item (click)="goTodetail(item.$key)" *ngFor="let item of jugadores | async">\n      <ion-avatar item-start>\n        <img [src]="item.imagen">\n      </ion-avatar>\n      <h2>{{item.nombre}}</h2>\n      <h3>aun por definir</h3>\n    </ion-item>\n  </ion-list>\n\n  <ion-list>\n    <ion-item (click)="goTodetail(item.$key)" *ngFor="let item of jugadores | async">\n      <ion-thumbnail item-start>\n        <img [src]="item.imagen">\n      </ion-thumbnail>\n      <ion-avatar item-start>\n      </ion-avatar>\n      <h2> {{item.nombre}} </h2>\n      <p>por definir</p>\n    </ion-item>\n  </ion-list>\n\n  <ion-fab right bottom>\n    <button (click)="goToNew()" ion-fab color="secondary"><ion-icon name="add"></ion-icon></button>\n  </ion-fab>\n\n</ion-content>\n'/*ion-inline-end:"/Users/irvin/Documents/sites/ionicFireBase/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 269:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewGamerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the NewGamerComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
var NewGamerComponent = (function () {
    function NewGamerComponent(alertCtrl) {
        this.alertCtrl = alertCtrl;
    }
    NewGamerComponent.prototype.showAlert = function () {
        var alert = this.alertCtrl.create({
            title: 'Nuevo Jugador',
            subTitle: "un nuevo jugador se creara en la siguiente version y se llamara: \n      " + this.text,
            buttons: ['OK']
        });
        alert.present();
    };
    NewGamerComponent.prototype.save = function () {
        this.showAlert();
    };
    return NewGamerComponent;
}());
NewGamerComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'new-gamer',template:/*ion-inline-start:"/Users/irvin/Documents/sites/ionicFireBase/src/components/new-gamer/new-gamer.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>Crear nuevo Jugador</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content >\n  <br>\n  <br>\n  <ion-list>\n    <ion-item>\n      <ion-label floating>Nombre</ion-label>\n      <ion-input [(ngModel)]="text"  type="text"></ion-input>\n    </ion-item>\n    <br>\n    <ion-fab right>\n      <button (click)="save()" ion-fab color="secondary"><ion-icon name="checkmark"></ion-icon></button>\n    </ion-fab>\n</ion-list>\n   \n</ion-content>'/*ion-inline-end:"/Users/irvin/Documents/sites/ionicFireBase/src/components/new-gamer/new-gamer.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], NewGamerComponent);

//# sourceMappingURL=new-gamer.js.map

/***/ }),

/***/ 277:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(294);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 294:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export environment */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(264);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_detail_detail__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_new_gamer_new_gamer__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angularfire2__ = __webpack_require__(404);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angularfire2_database__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_angularfire2_auth__ = __webpack_require__(405);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_angular2_highcharts__ = __webpack_require__(407);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_angular2_highcharts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_angular2_highcharts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_Highcharts__ = __webpack_require__(414);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_Highcharts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_Highcharts__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









//angular firebase components





var environment = {
    production: false,
    firebase: {
        apiKey: "AIzaSyAJK2EJ5cx8nAj65MCmHjsXzeMC5gLJWJY",
        authDomain: "arduino-conexion.firebaseapp.com",
        databaseURL: "https://arduino-conexion.firebaseio.com",
        projectId: "arduino-conexion",
        storageBucket: "arduino-conexion.appspot.com",
        messagingSenderId: "806921796627"
    }
};
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_detail_detail__["a" /* DetailPage */],
            __WEBPACK_IMPORTED_MODULE_8__components_new_gamer_new_gamer__["a" /* NewGamerComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/detail/detail.module#DetailPageModule', name: 'DetailPage', segment: 'detail', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_9_angularfire2__["a" /* AngularFireModule */].initializeApp(environment.firebase),
            __WEBPACK_IMPORTED_MODULE_10_angularfire2_database__["b" /* AngularFireDatabaseModule */],
            __WEBPACK_IMPORTED_MODULE_11_angularfire2_auth__["a" /* AngularFireAuthModule */],
            __WEBPACK_IMPORTED_MODULE_12_angular2_highcharts__["ChartModule"].forRoot(__WEBPACK_IMPORTED_MODULE_13_Highcharts__)
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_detail_detail__["a" /* DetailPage */],
            __WEBPACK_IMPORTED_MODULE_8__components_new_gamer_new_gamer__["a" /* NewGamerComponent */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 403:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(264);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(268);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    return MyApp;
}());
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/irvin/Documents/sites/ionicFireBase/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/irvin/Documents/sites/ionicFireBase/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ })

},[277]);
//# sourceMappingURL=main.js.map