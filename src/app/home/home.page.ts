import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  pointsSlides = [1,2,3,4,5,6,7,8];

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
