/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { SignUpData, StepType } from './sign-up.models';
import { FunctionsService } from '../../../utils/functions';
import { SignUpService } from './sign-up.service';
import { environment } from '../../../environments/environment.prod';
import { AlertController, NavController, Platform } from '@ionic/angular';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  steps: StepType[] = [
    {
      id: 'phone_number',
      name: 'Número Celular',
    },
    {
      id: 'account_data',
      name: 'Datos de tu cuenta'
    },
    {
      id: 'security',
      name: 'Seguridad'
    },
    {
      id: 'data_authorization',
      name: 'Autorización de Datos'
    }
  ];

  stepActiveNumber = 0;
  stepActive: StepType;

  userData: SignUpData = {
    phone_number: '',
    names: '',
    last_names: '',
    document_id: 0,
    document_number: '',
    document_expiration_date: null,
    birth_date: null,
    gender_id: 0,
    state_id: '',
    city_id: '',
    address: '',
    pin: '',
    email: '',
    imei: '',
    push_registration_id: '',
    topic_registration_id: '',
    referrer_phonenumber: '',
    parent_info: '',
    query_id: '',
  };

  constructor(
    private _functionsService: FunctionsService,
    private _signUpService: SignUpService,
    private platform: Platform,
    private alertController: AlertController,
    private navController: NavController
  ) { }

  ngOnInit() {
    this.stepActive = this.steps[this.stepActiveNumber];
    this.getImei();
    this.backButtonEvent();
  }

  async getImei(){
    const response = await this._signUpService.getImei();
    if(!response){
      window.location.reload();
    }
    this.userData.imei = response;
  }

  async verifyPhoneNumber(){
    this.stepActiveNumber++;
    this.stepActive = this.steps[this.stepActiveNumber];
  }

  backButtonEvent() {
    this.platform.backButton.subscribeWithPriority(0, () => {
      this.presentAlertConfirm();
    });
  }

  async presentAlertConfirm() {
    console.log(this.stepActiveNumber);
    if(this.stepActiveNumber === 0){
      const alert = await this.alertController.create({
        header: '¿Estas seguro?',
        message: 'Si cancelas la verificación, tu progreso se perderá y tendrás que Volver a empezar',
        buttons: [
          {
            text: 'NO',
            role: 'cancel',
            cssClass: 'secondary font-bold',
            handler: (blah) => {}
          },
          {
            text: 'CANCELAR',
            cssClass: 'danger font-bold',
            handler: () => {
              this.navController.back();
            }
          }
        ]
      });
      await alert.present();
    } else {
      this.stepActiveNumber--;
      this.stepActive = this.steps[this.stepActiveNumber];
    }
  }

  saveUserData(event){
    Object.assign(this.userData, event);
    console.log(this.userData);
    this.stepActiveNumber++;
    this.stepActive = this.steps[this.stepActiveNumber];
  }

}
