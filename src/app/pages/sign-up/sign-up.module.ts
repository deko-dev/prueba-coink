import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignUpPageRoutingModule } from './sign-up-routing.module';

import { SignUpPage } from './sign-up.page';
import { StepPhoneNumberComponent } from './components/step-phone-number/step-phone-number.component';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignUpPageRoutingModule,
    ComponentsModule
  ],
  declarations: [
    SignUpPage,
    StepPhoneNumberComponent,
  ]
})
export class SignUpPageModule {}
