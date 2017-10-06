import {GolfShot} from './golf-shot'
import {GeoCalcs} from "./geo-calcs"

export class Round{
    public shots:GolfShot [];
    date : Date;
    constructor (){
      this.shots = [];
      this.date = new Date();
    }
    
    getTotal():number{
      return this.shots.length;
    }

    doInitialProcess(){
        // Set shot number and calculate distance to next    
        for(let n=0; n < this.shots.length;n++){
            this.shots[n].num = n+1;
            if(n < this.shots.length-1){
                this.shots[n].calcDist(this.shots[n+1]);
            }
        }
    }

    /*addOne() {
        this.shots.push(new GolfShot(0))
    }*/
    
    parseFileName(t: string){
        this.date.setFullYear(parseInt(t.substr(4,2))+2000);
        this.date.setUTCDate(parseInt(t.substr(0,2)));
        this.date.setUTCMonth(parseInt(t.substr(2,2))-1);  //Really -1?
        this.date.setUTCHours(parseInt(t.substr(7,2)));
        this.date.setUTCMinutes(parseInt(t.substr(9,2)));
        this.date.setUTCSeconds(0)
        console.log(this.date.toLocaleString());
    }
      
}
