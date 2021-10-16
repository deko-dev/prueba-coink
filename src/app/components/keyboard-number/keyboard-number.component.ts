import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-keyboard-number',
  templateUrl: './keyboard-number.component.html',
  styleUrls: ['./keyboard-number.component.scss'],
})
export class KeyboardNumberComponent implements OnInit {

  @Output() numberTouched: EventEmitter<number> = new EventEmitter();
  @Output() deleteNumber: EventEmitter<any> = new EventEmitter();
  @Output() sendPhone: EventEmitter<any> = new EventEmitter();
  @Input() disabledCheck: boolean;
  numbers: Array<any> = new Array(9);
  opts: Array<any> = new Array(3);


  constructor() { }

  ngOnInit() {}

  sendPhoneNumber(){
    this.sendPhone.emit();
  }

  /**
   * Method for emit the number touched
   */
  emitNumberTouch(numberTouch: number) {
    this.numberTouched.emit(numberTouch);
  }

  /**
   * Delete last number
   */
  deleteLastNumber(){
    this.deleteNumber.emit();
  }
}
