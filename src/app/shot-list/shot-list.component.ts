import { Component, OnInit } from '@angular/core';
import { RoundService} from '../model/round.service'

@Component({
  selector: 'app-shot-list',
  templateUrl: './shot-list.component.html',
  styleUrls: ['./shot-list.component.css']
})
export class ShotListComponent implements OnInit {
  rndSrv:RoundService
  
  constructor(r:RoundService) {
    this.rndSrv = r
   }

   getShots(){
     return this.rndSrv.rnd.shots;
   }

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
