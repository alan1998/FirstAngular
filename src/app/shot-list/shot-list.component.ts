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

   getTotal():number {
     return this.rndSrv.rnd.getTotal()
   }

  ngOnInit() {
  }

}
