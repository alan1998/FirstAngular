import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Round } from './round';
import { GolfShot} from './golf-shot'

@Injectable()
export class RoundService {
  rnd: Round
  private _triggerNewSubj = new Subject();
  triggerNewRnd$ = this._triggerNewSubj.asObservable();
  bDispShotAtHole:boolean;  // i.e. display shot number per hole not round

  constructor() {
    this.rnd = new Round();
    this.bDispShotAtHole = true;
  }

  loadNewRound(){
    //This should do the round load
    // not the round
    this._triggerNewSubj.next("new");
  }

  updateRound(){
    this._triggerNewSubj.next("update");
  }

  getDisplayNumber(numShot:number):string{
    let idx = numShot-1;
    if(idx <0 || idx > this.rnd.shots.length)
      return '';
    if(this.bDispShotAtHole){
      // if hole number not set then use numShot
      // else count backwards until hole number changes
      let hole = this.rnd.shots[idx].hole;
      let n=1;
      if( hole >0){  
        let ptr = idx;
        while(ptr>0){
          if(this.rnd.shots[ptr-1].hole != hole){
            break;
          }
          n++;
          ptr--;
        }
        return n.toString();
      }
      else
        return numShot.toString();
    }
    else
      return numShot.toString();

  }

  debugLogRnd(){
    for(let n=0; n < this.rnd.shots.length; n++){
      console.log(n + ' ' + this.rnd.shots[n].hole)
    }
  }

  setHole(numShot:number,numHole:number){
    this.rnd.setHole(numShot,numHole);
    //this.debugLogRnd();
    this.updateRound();
  }
  deleteShot(numberT:number){
    this.rnd.deleteShot(numberT);
    this.updateRound();
  }

  movedShot(n:number){
    // Recalulate distance (+whatever else) for this and preceeding shot ( if not manually set)
    if(n < this.rnd.getTotal()){
      //Not the last shot so calculate distance
      let shot = this.getShot(n);
      if(!shot.bDistManSet)
        shot.calcDist(this.getShot(n+1));
    }
    if( n > 1){
      let shot = this.getShot(n-1);
      if(!shot.bDistManSet)
        shot.calcDist(this.getShot(n));  
    }
  }

  getShot(n:number):GolfShot{
    let shot:GolfShot;
    if(n>=1 && n <= this.rnd.shots.length )
      shot = this.rnd.shots[n-1];
    return shot;
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


