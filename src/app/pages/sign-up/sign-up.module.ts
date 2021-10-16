import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignUpPageRoutingModule } from './sign-up-routing.module';

import { SignUpPage } from './sign-up.page';
import { StepPhoneNumberComponent } from './components/step-phone-number/step-phone-number.component';
import { ComponentsModule } from '../../components/components.module';
import { AccountDataComponent } from './components/account-data/account-data.component';
import { SecurityDataComponent } from './components/security-data/security-data.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignUpPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [
    SignUpPage,
    StepPhoneNumberComponent,
    AccountDataComponent,
    SecurityDataComponent
  ]
})
export class SignUpPageModule {}
