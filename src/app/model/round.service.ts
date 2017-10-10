import { Injectable } from '@angular/core';
import { Round } from './round';



@Injectable()
export class RoundService {
  rnd: Round
  constructor() {
    this.rnd = new Round();
  }

  getHoleList():number[]{
    //May be will be a course latter that has 9/18
    let holes = [1,2,3,4,5,6,8,9,10,11,12,13,14,15,16,17,18]
    return holes
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


