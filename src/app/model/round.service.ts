import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Round } from './round';



@Injectable()
export class RoundService {
  rnd: Round
  private _triggerNewSubj = new Subject();
  triggerNewRnd$ = this._triggerNewSubj.asObservable();

  constructor() {
    this.rnd = new Round();
  }

  loadNewRound(){
    //This should do the round load
    // not the round
    this._triggerNewSubj.next("new");
  }

  updateRound(){
    this._triggerNewSubj.next("update");
  }

  deleteShot(numberT:number){
    this.rnd.deleteShot(numberT);
    this.updateRound();
  }

  getHoleList():number[]{
    //May be will be a course latter that has 9/18
    let holes = [1,2,3,4,5,6,8,9,10,11,12,13,14,15,16,17,18]
    return holes
  }
  //getTotal():number{
  //  return this.rnd.getTotal()
  //}


}


