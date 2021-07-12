import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';

@Module({
  imports: [MulterModule.register({
    dest: './files',
  })],
  controllers: [AppController, ProductController],
  providers: [AppService, ProductService],
})
export class AppModule {}
