import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Res,
  Param,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from './utils/file-uploading.utils';
import { AppService } from './app.service';
import { ProductService } from './product/product.service';
const fs = require('fs');

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,private readonly productService:ProductService) {}

  @Post('/products/:id/images')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        //destination: './files/',
        destination: (req, file, cb) =>{
          const dest = "./files/" + req.params['id'];
          fs.access(dest, function (error) {
            if (error) {
              console.log("Directory does not exist.");
              return fs.mkdir(dest, (error) => cb(error, dest));
            } else {
              console.log("Directory exists.");
              return cb(null, dest);
            }
          });
        },
        filename: editFileName,        
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(@UploadedFile() file,@Param('id') id:String) {
    const response = {
      originalname: file.originalname,
      //filename: file.filename,
      filename: file.originalname,
    };
    return response;
  }

  @Post('/products/:id/images/multiple')
  @UseInterceptors(
    FilesInterceptor('image', 20, {
      storage: diskStorage({
        destination: //'./files',
        (req, file, cb) =>{
          const dest = "./files/" + req.params['id'];
          fs.access(dest, function (error) {
            if (error) {
              console.log("Directory does not exist.");
              return fs.mkdir(dest, (error) => cb(error, dest));
            } else {
              console.log("Directory exists.");
              return cb(null, dest);
            }
          });
        },
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadMultipleFiles(@UploadedFiles() files) {
    const response = [];
    files.forEach(file => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename,
      };
      response.push(fileReponse);
    });
    return response;
  }

  @Get('/products/:id/images/:imgpath')
  seeUploadedFile(@Param('id') id:String,@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './files/'+id +'/'});
  }
}
