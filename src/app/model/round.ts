import {GolfShot} from './golf-shot'
import {GeoCalcs} from "./geo-calcs"

export class Round{
    shots:GolfShot [];
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
            else
                this.shots[n].dist = 0;
        }
    }

    deleteShot(numToDel:number){
        //Remove from the array
        let newS :GolfShot[] ;
        console.log("Delete shot" + numToDel)
        newS = [];
        for(let n=0; n < this.shots.length; n++){
            if(n+1 != numToDel){
                //console.log("copy idx " +n)
                newS.push(this.shots[n])
            }
            if(n+1 > numToDel){
                //console.log("renumber")
                this.shots[n].num = n;
            }
         }
         //Recalculate distance of shot before deleted (if not manually set)
         
         
         this.shots = newS;
         for(let n=0; n < this.shots.length; n++){
             console.log(n + " " + this.shots[n].num + " , " + this.shots[n].dist)
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
