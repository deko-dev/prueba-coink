import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeyboardNumberComponent } from './keyboard-number/keyboard-number.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    KeyboardNumberComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    KeyboardNumberComponent
  ]
})
export class ComponentsModule { }
