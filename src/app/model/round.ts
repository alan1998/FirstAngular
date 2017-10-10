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
        if(this.shots != null)
            return this.shots.length;
        else
            return 0
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

    setHole(numShot:number,numHole:number){
        if(numShot > 0 && numShot <= this.shots.length && numHole >0 && numHole <=18)//Should check 9 hole course
        {
            this.shots[numShot-1].setHole(numHole,true)
            for(let n=numShot; n < this.shots.length;n++){
                if(this.shots[n].bHoleManSet)
                    break;
                this.shots[n].setHole(numHole,false)
            }
        } 
    }

    deleteShot(numberT:number){
        let newS :GolfShot[] ;
        console.log(numberT)
        this.shots.splice(numberT-1,1);
        // Renumber and calculate distance if not manually set
        for(let n=numberT-1; n < this.shots.length; n++){
            this.shots[n].num = n+1
        }
        let nRepIdx = numberT-2;
        console.log("cal shot index length "+nRepIdx)
        if((nRepIdx+1 < this.shots.length) && (nRepIdx >=0))
            this.shots[nRepIdx].calcDist(this.shots[nRepIdx+1]);//Only do if not manually set
        console.log(this.shots.length)
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
