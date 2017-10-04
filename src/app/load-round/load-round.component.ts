import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-load-round',
  templateUrl: './load-round.component.html',
  styleUrls: ['./load-round.component.css']
})
export class LoadRoundComponent implements OnInit {
  rnd : RoundService
  constructor(RoundService rnd) { }
  LoadFile(){
    console.log("Load event")
  }

  ngOnInit() {
  }

}
