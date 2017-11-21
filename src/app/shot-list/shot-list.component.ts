import { Component, OnInit } from '@angular/core';
import { RoundService} from '../model/round.service'
import {AccordionModule} from 'primeng/primeng';
import {DataTableModule,SharedModule} from 'primeng/primeng';
import {GolfShot} from '../model/golf-shot'

class thing{
  v1:string  = "s";
}

@Component({
  selector: 'app-shot-list',
  templateUrl: './shot-list.component.html',
  styleUrls: ['./shot-list.component.css']
})
export class ShotListComponent implements OnInit {
  rndSrv:RoundService;
  index:number = 0;
  things: thing[];
  localshots:GolfShot[];
  
  constructor(r:RoundService) {
    this.rndSrv = r
    this.rndSrv.triggerNewRnd$.subscribe(
      aVal => {
        console.log(aVal);
        this.displayShots(aVal.toString());
      });
    this.rndSrv.triggerShotSel$.subscribe(
      aVal => {
        console.log("Shot sel " +aVal);
        let n:any= aVal;
        this.index = n-1;
        //this.displayShots(aVal.toString());
      });
  
   }
   ngOnInit() {
    // this.localshots = this.rndSrv.rnd.shots;//[new GolfShot(1)];
     this.things = [{v1:"1"},{v1:"2"},{v1:"3"}];
  }

   displayShots(sHint:string){
    let a = new GolfShot(2);
    //this.localshots  = [...this.localshots,a];
    this.localshots = this.rndSrv.rnd.shots;
     console.log("Shot list "+ sHint);
   }

   getShots(){
     return this.rndSrv.rnd.shots;
   }

   //getShotNumOnHole(shotRoundNum:number){
   //  return this.rndSrv.getDisplayNumber(shotRoundNum)
   //}

   deleteShot(num:number){
     //Delete the shot from the round
     this.rndSrv.deleteShot(num)
   }

   setHole(numShot:number,numHole:number){
     this.rndSrv.setHole(numShot,numHole)
  }

   getTotal():number {
     return this.rndSrv.rnd.getTotal()
   }
   getHoleList():number[]{
    return this.rndSrv.getHoleList()
  }
 
}
