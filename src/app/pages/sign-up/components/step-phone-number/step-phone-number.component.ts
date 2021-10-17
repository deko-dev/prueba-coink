/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable id-blacklist */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SignUpData } from '../../sign-up.models';
import { FunctionsService } from '../../../../../utils/functions';
import { SignUpService } from '../../sign-up.service';
import { environment } from '../../../../../environments/environment.prod';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-step-phone-number',
  templateUrl: './step-phone-number.component.html',
  styleUrls: ['./step-phone-number.component.scss'],
})
export class StepPhoneNumberComponent implements OnInit {

  @Input() userData: SignUpData;
  @Output() eventName = new EventEmitter<SignUpData>();
  @Output() sendPhoneNumber: EventEmitter<any> = new EventEmitter();

  textPhoneNumber = '';
  textCodeNumber = 'XXXX';
  codeSend = false;
  buttonCheck = false;

  constructor(
    private _functionsService: FunctionsService,
    private _signUpService: SignUpService,
  ) { }

  ngOnInit() {
    this.textNumber();
  }

  textNumber(){
    this.textPhoneNumber = '';
    const arrPhoneNumber = this.userData.phone_number.split('');
    for (let index = 0; index < 10; index++) {
      this.textPhoneNumber += arrPhoneNumber[index] ? arrPhoneNumber[index] : 'X';
      if(index === 2){
        this.textPhoneNumber += ' - ';
      }
    }
    this.buttonCheck = this.userData.phone_number.length === 10;
  }

  textCode(number: number){
    const arrCode = this.textCodeNumber.split('');
    for (let index = 0; index < 4; index++) {
      if(arrCode[index] === 'X'){
        arrCode[index] = number.toString();
        break;
      }
    }
    this.buttonCheck = !arrCode.includes('X');
    this.textCodeNumber = arrCode.join('');
  }

  /**
   * Method for added number touched to data of user
   */
  addNumberTouched(numberTouch: number): void{
    if(this.codeSend){
      this.textCode(numberTouch);
    } else {
      if(this.userData.phone_number.length === 10){
        return;
      }
      this.userData.phone_number += numberTouch.toString();
      this.textNumber();
    }
  }

  /**
   * Method for delete last number
   */
  deleteLastNumber(){
    const phone = this.userData.phone_number;
    this.userData.phone_number = phone.substr(0, phone.length-1);
    this.textNumber();
  }

  sendCode(event: Event){
    if(this.codeSend){
      this._functionsService.loadingAlert('Verificando token OTP');
      setTimeout(() => {
        this.sendPhoneNumber.emit();
        this._functionsService.loading.dismiss();
      }, 3000);
    } else {
      this.verifyPhoneNumber();
    }
  }

  async verifyPhoneNumber(){
    this._functionsService.loadingAlert('Verificando número de telefono');
    const { phone_number, imei } = this.userData;
    const payload = {
      phone_number: Number(`57${phone_number}`),
      imei: Number(imei),
    };
    const payloadStr = this._functionsService.encrypt( JSON.stringify(payload), environment.keyHash );
    try {
      const response = await this._signUpService.verifyDirectLogin(payloadStr);
      await this._functionsService.loading.dismiss();
      this.buttonCheck = false;
    } catch (error) {
      this.codeSend = true;
      this.buttonCheck = false;
      await this._functionsService.loading.dismiss();
      // const message = `El número <span class="font-bold">${this.userData.phone_number}</span> ya está asociado a otro usuario.`;
      // this._functionsService.messageAlert(message);
    }
  }

}
