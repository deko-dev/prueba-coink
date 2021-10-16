import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  pointsSlides: Array<any> = new Array(10);

  constructor() {}

  /**
   * Method for register in app
   */
  public register(): void{
    console.log('Register...');
  }

  /**
   * Method for login in app
   */
  public login(): void{
    console.log('Login...');
  }

}
