/* eslint-disable @typescript-eslint/naming-convention */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignUpData } from '../../sign-up.models';

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
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.formSecurityData = this.fb.group({
      email: ['', Validators.required],
      email_confirm: ['', Validators.required],
      pin: ['', Validators.required],
      pin_confirm: ['', Validators.required],
    });
  }

  sendSecurityData(event: Event){
    event.stopPropagation();
    event.preventDefault();
    this.securityData.emit(this.formSecurityData.value);
  }

}
