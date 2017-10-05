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

    addOne() {
        this.shots.push(new GolfShot(0))
    }
    
    /*parseFileName(t: string){
      this.date.setDate(t.substr(0,2));
      this.date.setMonth(t.substr(2,2));
      this.date.setYear(t.substr(4,2)+2000);
      this.date.setUTCHours(t.substr(7,2));
      this.date.setUTCMinutes(t.substr(9,2));
      this.date.setUTCSeconds(0)
      console.log(this.date.toLocaleString());
    }*/
      
}
