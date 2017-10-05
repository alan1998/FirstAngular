import { Injectable } from '@angular/core';
import { Round } from './round';



@Injectable()
export class RoundService {
  rnd: Round
  constructor() {
    this.rnd = new Round();
  }

  //getTotal():number{
  //  return this.rnd.getTotal()
  //}

 /* AddOne(){
  //  this.shots.push(new Shot());
    console.log(this.rnd.getTotal())
    this.rnd.addOne()
  }*/

}


