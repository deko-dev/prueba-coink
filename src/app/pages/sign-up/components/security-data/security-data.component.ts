/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignUpData } from '../../sign-up.models';
import { FunctionsService } from '../../../../../utils/functions';

@Component({
  selector: 'app-security-data',
  templateUrl: './security-data.component.html',
  styleUrls: ['./security-data.component.scss'],
})
export class SecurityDataComponent implements OnInit {

  @Input() userData: SignUpData;
  @Output() securityData = new EventEmitter<any>();

  formSecurityData: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _functionsServices: FunctionsService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.formSecurityData = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      email_confirm: ['', Validators.required, Validators.email],
      pin: ['',
        [ Validators.required, Validators.maxLength(4), Validators.minLength(4)]
      ],
      pin_confirm: ['',
        [ Validators.required, Validators.maxLength(4), Validators.minLength(4)]
      ]
    });
  }

  sendSecurityData(event: Event){
    this._functionsServices.loadingAlert('Verificando documento');
    event.stopPropagation();
    event.preventDefault();
    const { email } = this.formSecurityData.value;
    setTimeout(() => {
      this._functionsServices.loading.dismiss();
      // if(this.attemptsCC < 2){
      //   const message = `El numero de documento <span class="font-bold">${document_number}</span> ya está asociado a otro usuario.`;
      //   this._functionsService.messageAlert(message);
      // } else {
      // }
      this.securityData.emit(this.formSecurityData.value);
    }, 3000);
  }

}
