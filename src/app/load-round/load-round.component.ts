import { Component, OnInit } from '@angular/core';
import { RoundService} from '../model/round.service'

@Component({
  selector: 'app-load-round',
  templateUrl: './load-round.component.html',
  styleUrls: ['./load-round.component.css']
})
export class LoadRoundComponent implements OnInit {
  rnd : RoundService
  constructor(rnd:RoundService ) {
    this.rnd = rnd
   }
  LoadFile(){
    console.log("Load event")
    this.rnd.AddOne();
  }

  ngOnInit() {
  }

}
