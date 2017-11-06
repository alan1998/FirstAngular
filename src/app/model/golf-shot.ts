import {GeoCalcs} from "./geo-calcs"

export class GolfShot {
    lat : number;
    lon : number;
    dist: number;
    time : Date;
    club :string;
    private hole : number;
    numOnHole : number;
    numInRound : number;
    bHoleManSet:boolean;
    bDistManSet:boolean;
    shiftDist:number = 0.00001;
    
    constructor(n:number){
      this.numInRound = n+1;
      this.numOnHole = n;//Ignore input marks as unset
      this.hole = -1;
      this.bHoleManSet = false;
      this.bDistManSet = false;
    }

    calcDist(s2:GolfShot):number{
      //Calc distance to start of next shot
      if(s2 != null){
        this.dist = GeoCalcs.dist(this.lon,this.lat,s2.lon,s2.lat);        
      }
      else
        this.dist = 0;
      return this.dist;
    }

    displayYrdsDist():string{
      let d = GeoCalcs.m2yrd( this.dist);
      return d.toFixed(1);
    }

    setHole(numHole:number,bManSet:boolean){
      this.hole = numHole;
      this.bHoleManSet = bManSet;
    }

    getHole(){
      return this.hole;
    }
    
    hasSameLocation(lon:number,lat:number):boolean{
      let bRet = false;
      let tol =0.00001;
      if((Math.abs(lat - this.lat) < tol) && (Math.abs(lon-this.lon)< tol))
        bRet = true;
      else{
        console.log(this.lon +' '+ this.lat)
      }
      return bRet;
    }

    shift(ang:number){
      let y = this.shiftDist * Math.cos(Math.PI*ang/180);
      let x = this.shiftDist * Math.sin(Math.PI*ang/180);
      this.lon = this.lon + x;
      this.lat = this.lat +y;
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
