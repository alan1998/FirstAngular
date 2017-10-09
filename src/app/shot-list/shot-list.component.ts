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
     this.rndSrv.rnd.deleteShot(num)
   }

   getTotal():number {
     return this.rndSrv.rnd.getTotal()
   }

  ngOnInit() {
  }


}
