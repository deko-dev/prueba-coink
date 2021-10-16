/* eslint-disable id-blacklist */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SignUpData } from '../../sign-up.models';

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

  constructor() { }

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
  }

  /**
   * Method for added number touched to data of user
   */
  addNumberTouched(numberTouch: number): void{
    if(this.userData.phone_number.length === 10){
      return;
    }
    this.userData.phone_number += numberTouch.toString();
    this.textNumber();
  }

  /**
   * Method for delete last number
   */
  deleteLastNumber(){
    const phone = this.userData.phone_number;
    this.userData.phone_number = phone.substr(0, phone.length-1);
    this.textNumber();
  }

}
