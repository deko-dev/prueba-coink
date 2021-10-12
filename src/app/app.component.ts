import { Component } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { AlertController, NavController, Platform } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private alertController: AlertController,
    private navController: NavController
  ) {
    this.initializateApp();
    this.backButtonEvent();
  }


  initializateApp() {
    this.platform.ready().then( () => {
      SplashScreen.hide();
      // this.navController.navigateForward('splash', { replaceUrl:true });
    });
  }

  backButtonEvent() {
    this.platform.backButton.subscribeWithPriority(0, () => {
      this.presentAlertConfirm();
    });
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      // header: 'Confirm!',
      message: 'Seguro que desea salir de la App?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {}
        },
        {
          text: 'Salir',
          handler: () => {
            // eslint-disable-next-line @typescript-eslint/dot-notation
            navigator['app'].exitApp();
          }
        }
      ]
    });

    await alert.present();
  }


}
