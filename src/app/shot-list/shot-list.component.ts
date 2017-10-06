import { Component, OnInit } from '@angular/core';
import { RoundService} from '../model/round.service'

@Component({
  selector: 'app-shot-list',
  templateUrl: './shot-list.component.html',
  styleUrls: ['./shot-list.component.css']
})
export class ShotListComponent implements OnInit {
  rndSrv:RoundService
  shotlist:Object[];
  constructor(r:RoundService) {
    this.rndSrv = r
    this.shotlist = this.rndSrv.rnd.shots;
   }

   getTotal():number {
     return this.rndSrv.rnd.getTotal()
   }

  ngOnInit() {
  }

}
