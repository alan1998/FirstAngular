import {GolfShot} from './golf-shot'

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
