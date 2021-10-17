/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { MD5, enc, TripleDES, mode, pad } from 'crypto-js';

@Injectable({
    providedIn: 'root',
})
export class FunctionsService {

    loading: HTMLIonLoadingElement;

    constructor(
        private alertController: AlertController,
        private loadingController: LoadingController
    ) { }

    encrypt(serialized_json: string, key: string) {
        const toEncryptedArray = enc.Utf8.parse(serialized_json);
        const keyHash = this.getKeyHash(key);
        const payload = TripleDES.encrypt(toEncryptedArray, keyHash, { mode: mode.ECB, padding: pad.Pkcs7 });

        return payload.ciphertext.toString(enc.Base64);
    };

    decrypt(payload: string, key: string) {
        const toEncryptedArray = enc.Base64.parse(payload);
        const keyHash = this.getKeyHash(key);
        const serialized_json = TripleDES.decrypt(payload, keyHash, { mode: mode.ECB, padding: pad.Pkcs7 });

        return serialized_json.toString(enc.Utf8);
    }

    getKeyHash(key: string) {
        let securityKeyArray = MD5(key).toString();
        securityKeyArray += securityKeyArray.substring(0, 16);

        return enc.Hex.parse(securityKeyArray);
    }

    async messageAlert(message: string) {
        const alert = await this.alertController.create({
            header: 'Error',
            message,
            buttons: ['VOLVER']
        });

        await alert.present();

        const { role } = await alert.onDidDismiss();
        console.log('onDidDismiss resolved with role', role);
    }

    async loadingAlert(message: string) {
        this.loading = await this.loadingController.create({
            message,
            spinner: 'circles',
        });
        await this.loading.present();
    }
}
