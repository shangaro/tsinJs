import axios from "axios";
export class Car{
   
    constructor(public model:string) {
        

    }
    public printEngine(){
        let str=`This car ${this.model} has v8 engine version 1.2`;
        console.log(str);
        return str;
    }
    public getItem(){
        let data=[];
        let instance=axios.create({baseURL:'http://localhost:3000'});
        instance.get('/orders/123').then(({data})=>{
            
            console.log(`data is`,data);
        }).catch(err=>console.error(err));
        
        
        
    }
}