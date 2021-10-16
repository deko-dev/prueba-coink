import { Component } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { Uid } from '@ionic-native/uid/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private alertController: AlertController,
    private navController: NavController,
    private uid: Uid,
    private androidPermissions: AndroidPermissions
  ) {
    this.initializateApp();
    this.backButtonEvent();
  }


  initializateApp() {
    this.platform.ready().then( async () => {
      SplashScreen.hide();
      const response = await this.getImei();
      console.log(response);
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

  async getImei() {
    const { hasPermission } = await this.androidPermissions.checkPermission(
      this.androidPermissions.PERMISSION.READ_PHONE_STATE
    );

    if (!hasPermission) {
      const result = await this.androidPermissions.requestPermission(
        this.androidPermissions.PERMISSION.READ_PHONE_STATE
      );

      if (!result.hasPermission) {
        throw new Error('Permissions required');
      }

      // ok, a user gave us permission, we can get him identifiers after restart app
      return;
    }

    return this.uid.IMEI;
  }


}
