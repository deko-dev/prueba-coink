/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentsType, Genders } from 'src/utils/constants';
import { SignUpData } from '../../sign-up.models';
import { FunctionsService } from '../../../../../utils/functions';

interface SelectType {
  id: number;
  name: string;
}

@Component({
  selector: 'app-account-data',
  templateUrl: './account-data.component.html',
  styleUrls: ['./account-data.component.scss'],
})
export class AccountDataComponent implements OnInit {

  @Input() userData: SignUpData;
  @Output() accountData = new EventEmitter<any>();

  formAccountData: FormGroup;

  public genders = Genders;
  public documentsTypes = DocumentsType;

  attemptsCC = 0;
  minBirthDate: string;

  constructor(
    private fb: FormBuilder,
    private _functionsService: FunctionsService
  ) { }

  ngOnInit() {
    this.initForm();
    const date = new Date();
    this.minBirthDate = `${date.getFullYear() - 18}-${date.getMonth()+1}-31`;
  }


  initForm(){
    this.formAccountData = this.fb.group({
      document_type: [null, Validators.required],
      document_number: [null, Validators.required],
      expedition_date: [null, Validators.required],
      names: [null, Validators.required],
      last_names: [null, Validators.required],
      birth_date: [null, Validators.required],
      gender_id: [null, Validators.required],
    });
  }

  async sendAccountData(event: Event) {
    this._functionsService.loadingAlert('Verificando documento');
    this.attemptsCC++;
    event.stopPropagation();
    event.preventDefault();
    const { document_number } = this.formAccountData.value;
    setTimeout(() => {
      this._functionsService.loading.dismiss();
      // if(this.attemptsCC < 2){
      //   const message = `El numero de documento <span class="font-bold">${document_number}</span> ya está asociado a otro usuario.`;
      //   this._functionsService.messageAlert(message);
      // } else {
      // }
      this.accountData.emit(this.formAccountData.value);
    }, 3000);
  }
}
