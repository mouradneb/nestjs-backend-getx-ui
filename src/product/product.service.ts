import { Injectable } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductService {

    products:Product[]=[
        new Product({name:"Product 01",description:"Description 01",price:10,images:["mourad.jpg"]}),
        new Product({name:"Product 02",description:"Description 02",price:20}),
        new Product({name:"Product 03",description:"Description 03",price:20}),
    ];

    findAll():Product[] {
        return this.products;
    }

    findById(id:String):Product {
        return this.products.find(e=>e.id===id);
    }

    create(product:Product):Product {
        let p=new Product({name:product.name,description:product.description,price:product.price});
        this.products.push(p);
        return p;
    }

    update(product:Product):Product {
        let idx=this.products.findIndex(e=>e.id===product.id);
        if (idx<0) return null;

        let p=this.products[idx];
        p.name=product.name;
        p.description=product.description;
        p.images=product.images;
        p.price=product.price;

        this.products.splice(idx,1);
        this.products.push(p);
        return p;       
    }

    patch(product:Product):Product {
        let idx=this.products.findIndex(e=>e.id===product.id);
        if (idx<0) return null;

        let p=this.products[idx];
        if (product.name) p.name=product.name;
        if (product.description) p.description=product.description;
        if (product.images) p.images=product.images;
        if (product.price) p.price=product.price;

        this.products.splice(idx,1);
        this.products.push(p);
        return p;       
    }

    deleteById(id:String):Product{
        let idx=this.products.findIndex(e=>e.id===id);
        if (idx<0) return null;

        let p=this.products[idx];
        this.products.splice(idx,1);
        return p;
    }
}
