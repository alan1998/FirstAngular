import { Component, OnInit } from '@angular/core';
import { RoundService} from '../model/round.service'
import {AccordionModule} from 'primeng/primeng';
import {SharedModule} from 'primeng/primeng';

@Component({
  selector: 'app-shot-list',
  templateUrl: './shot-list.component.html',
  styleUrls: ['./shot-list.component.css']
})
export class ShotListComponent implements OnInit {
  rndSrv:RoundService;
  index:number = 0;
  
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

   displayShots(sHint:string){
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
 

  ngOnInit() {
  }


}
