import { Injectable } from '@angular/core';

@Injectable()
export class RoundService {
  shots: Shot[]
  constructor() {
  }

  AddOne(){
    this.shots.push(new Shot());
  }

}


export class Shot{
  num:number
  constructor(){
    this.num = 0;
  }
}