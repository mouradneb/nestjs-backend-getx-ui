import {v4 as uuidv4} from 'uuid';

export class Product {

    id:String;
    name:String;
    description:String;
    price:number;
    images:String[];


    constructor({name,description,price,images}:{name?:String,description?:String,price?:number,images?:String[]}) {
        this.id=uuidv4();
        this.name=name;
        this.description=description;
        this.price=price;
        images?this.images=images:null;
    }


}
