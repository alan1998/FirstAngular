import { Component, OnInit } from '@angular/core';
import { RoundService} from '../model/round.service'

@Component({
  selector: 'app-load-round',
  templateUrl: './load-round.component.html',
  styleUrls: ['./load-round.component.css']
})
export class LoadRoundComponent implements OnInit {
  rndSrv : RoundService
  constructor(rnd:RoundService ) {
    this.rndSrv = rnd
   }
  LoadFile(ev){
    console.log(ev)
    var fileList = ev.target.files;
    if( fileList.length > 0)
    {
      var file = fileList[0];
    
      console.log(file.size);
      
      this.rndSrv.rnd.parseFileName(file.name);
      
      const reader = new FileReader();
      
      reader.onload = (event:ProgressEvent) => {
        const  file:FileReader = (event.target);
      console.log(event.target)    
      //const allLines = file.split(/\r\n|\n/);
          // Reading line by line
          var n:number = 0;
     //     allLines.map((line) => {
     //         console.log(line,n);
              //var v = new GolfShot(n++);
              //if (v.parseInput(line))
              //  this.rnd.shots.push(v);
     //     });
          //this.newRound.emit(this.rnd);
      };
      
      reader.onerror = (evt) => {
          console.log('error');
          //alert(evt.target.error.name);
      };
  
      reader.readAsText(file);
    }
  }

  ngOnInit() {
  }

}
