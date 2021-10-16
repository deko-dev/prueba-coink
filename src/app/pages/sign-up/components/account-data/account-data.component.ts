/* eslint-disable @typescript-eslint/naming-convention */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentsType, Genders } from 'src/utils/constants';
import { SignUpData } from '../../sign-up.models';

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

  minBirthDate: string;

  constructor(
    private fb: FormBuilder,
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
    event.stopPropagation();
    event.preventDefault();
    this.accountData.emit(this.formAccountData.value);
  }

  findSelect(idFind: number, arrToFind: SelectType[]): string{
    return arrToFind.find( (select) => select.id === idFind).name;
  }
}
