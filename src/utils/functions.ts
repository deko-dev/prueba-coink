/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { MD5, enc, TripleDES, mode, pad } from 'crypto-js';

@Injectable({
    providedIn: 'root',
})
export class FunctionsService {

    constructor(){}

    encrypt(serialized_json: string, key: string){
        const toEncryptedArray = enc.Utf8.parse(serialized_json);
        const keyHash = this.getKeyHash(key);
        const payload = TripleDES.encrypt(toEncryptedArray, keyHash, { mode: mode.ECB, padding: pad.Pkcs7 });

        return payload.ciphertext.toString(enc.Base64);
    };

    decrypt(payload: string, key: string) {
        const toEncryptedArray = enc.Base64.parse(payload);
        const keyHash = this.getKeyHash(key);
        const serialized_json = TripleDES.decrypt(payload, keyHash ,{ mode: mode.ECB, padding: pad.Pkcs7 });

        return serialized_json.toString(enc.Utf8);
    }

    getKeyHash(key: string){
        let securityKeyArray = MD5(key).toString();
        securityKeyArray += securityKeyArray.substring(0, 16);

        return enc.Hex.parse(securityKeyArray);
    }
}
