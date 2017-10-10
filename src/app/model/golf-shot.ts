import {GeoCalcs} from "./geo-calcs"

export class GolfShot {
    num : number;
    lat : number;
    lon : number;
    dist: number;
    time : Date;
    club :string;
    hole : number;
    bHoleManSet:boolean;
    
    constructor(n:number){
      this.num = -1;//Ignore input marks as unset
      this.hole = -1;
      this.bHoleManSet = false;
    }

    calcDist(s2:GolfShot):number{
      //Calc distance to start of next shot
      this.dist = GeoCalcs.dist(this.lon,this.lat,s2.lon,s2.lat);
      return this.dist;
    }

    displayYrdsDist():string{
      let d = GeoCalcs.m2yrd( this.dist);
      return d.toFixed(1);
    }

    setHole(num:number,bManSet:boolean){
      this.hole = num;
      this.bHoleManSet = bManSet;
    }
      
    parseInput(t:string) : boolean{
      var toks = t.split(",");
      if( toks.length < 11){
        return false;
      }
      this.lon = parseInt(toks[7].substr(0,3));
      this.lon += parseFloat(toks[7].slice(3))/60;
      if(toks[8] != "E")
        this.lon = -this.lon
      this.lat = parseInt(toks[5].substr(0,2));
      this.lat += parseFloat(toks[5].slice(2))/60;
      if(toks[6] != 'N')
        this.lat = -this.lat
      this.time = new Date();
      this.time.setUTCHours(parseInt(toks[1]));
      this.time.setUTCMinutes(parseInt(toks[2]));
      return true;
    }
}
