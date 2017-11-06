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

  spreadShots(shots:number [] ){
    let inc = 360 / shots.length;
    for(let n=0; n < shots.length; n++){
      this.rnd.shots[shots[n]-1].shift(inc*n)
    }
    // 2nd pass calculate new distances after all moved
    // Moved shots not necessarily contiguous so have to do shot before for each
    for(let n=0; n < shots.length; n++){
      let idx = shots[n]-1;
      let shot = this.rnd.shots[idx];
      if(!shot.bDistManSet)
        shot.calcDist(this.rnd.shots[idx+1]);
      if(idx > 1){
        idx = idx -1;
        let shot = this.rnd.shots[idx];
        if(!shot.bDistManSet)
          shot.calcDist(this.rnd.shots[idx+1]);
  
      }  
    }
  }

//  getDisplayNumber(numShot:number):string{
/*    let idx = numShot-1;
    if(idx <0 || idx > this.rnd.shots.length)
      return '';
    let n = this.rnd.shots[idx].numOnHole;
    return  idx.toString();


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
        console.log("Get shot on hole number "+ numShot + " : "+ n)
        return n.toString();
      }
      else
        return numShot.toString();
    }
    else
      return numShot.toString();
*/
//  }

  debugLogRnd(){
//    for(let n=0; n < this.rnd.shots.length; n++){
//      console.log(n + ' ' + this.rnd.shots[n].hole)
//    }
  }

  updateShotNumbers(){
    //Could optimise this passing in index that has changed
    //Then do only releavant hole(s)
    //For now start at the begining
    let curHole = this.rnd.shots[0].getHole();
    let curShot = 1;
    for(let idx=0; idx < this.rnd.shots.length; idx++){
      let s = this.rnd.shots[idx];
      s.numInRound = idx + 1;
      if(s.getHole() == -1)
        s.numOnHole = idx+1;
      else if(s.getHole() != curHole){
        //Changed hole so
        curShot =1;
        curHole = s.getHole();
        s.numOnHole = curShot++;
      }
      else{
        s.numOnHole = curShot++;
      }
      console.log(idx + " : " + s.getHole() + " : " + s.numOnHole);
    }
  }

  setHole(numShot:number,numHole:number){
    this.rnd.setHole(numShot,numHole);
    this.updateShotNumbers();
    //this.debugLogRnd();
    this.updateRound();
  }

  deleteShot(shotNumber:number){
    this.rnd.deleteShot(shotNumber);
    this.updateShotNumbers();
    //If not first shot recalculate length of previous shot
   // if(shotNumber>1)
   //   this.rnd.calcDist(shotNumber);
    this.updateRound();
  }

  movedShot(n:number){
    // Recalulate distance (+whatever else) for this and preceeding shot ( if not manually set)
    let movedShot;
    if(n < this.rnd.getTotal()){
      //Not the last shot so calculate distance
      movedShot = this.getShot(n);
      let nextShot = this.getShot(n+1)
      if(!movedShot.bDistManSet && (movedShot.getHole() == nextShot.getHole() ))
        movedShot.calcDist(nextShot);
    }
    if( n > 1){
      let prevShot = this.getShot(n-1);
      if(!prevShot.bDistManSet && (movedShot.getHole() ==prevShot.getHole()))
        prevShot.calcDist(movedShot);  
    }
  }

  insertShot(n:number){
    console.log("Insert before " + n);
    this.rnd.insertShot(n);
    this.updateShotNumbers();
    this.updateRound();
  }

  getShot(n:number):GolfShot{
    let shot:GolfShot;
    if(n>=1 && n <= this.rnd.shots.length )
      shot = this.rnd.shots[n-1];
    return shot;
  }

  getHoleList():number[]{
    //May be will be a course latter that has 9/18
    let holes = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]
    return holes
  }
  //getTotal():number{
  //  return this.rnd.getTotal()
  //}


}


