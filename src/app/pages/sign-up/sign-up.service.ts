import { Injectable } from '@angular/core';
import { Uid } from '@ionic-native/uid/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(
    private uid: Uid,
    private androidPermissions: AndroidPermissions,
    private http: HttpClient
  ) { }

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

  verifyDirectLogin(payload: string){
    return this.http.post(
      `${environment.host}/login/verifyDirectLogin?apiKey=${environment.apiKey}`,
      { payload }
    ).toPromise();
  }

  signUpCifi(payload: string){
    return this.http.post(
      `${environment.host}/signup/cifin?apiKey=${environment.apiKey}`,
      { payload }
    ).toPromise();
  }

}
