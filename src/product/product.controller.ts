import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { Product } from './product.model';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {

    constructor(private productService:ProductService) {}

    @Get('')
    findAll():Observable<Product[]>{
        return of(this.productService.findAll());
    }

    @Get('/:id')
    findById(@Param('id') id:String):Observable<Product>{
        return of(this.productService.findById(id));
    }

    @Post()
    create(@Body() product:Product):Observable<Product> {
        return of(this.productService.create(product));
    }

    @Put()
    update(@Body() product:Product):Observable<Product> {
        return of(this.productService.update(product));
    }

    @Patch()
    patch(@Body() product:Product):Observable<Product> {
        return of(this.productService.patch(product));       
    }

    @Delete('/:id')
    deleteById(@Param('id') id:String):Observable<Product>{
        return of(this.productService.deleteById(id));
    }
}
