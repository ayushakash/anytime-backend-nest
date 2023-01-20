import { Controller, Post, Body, Get,Sse, UseInterceptors, UploadedFile, Req, Res, Param,Delete,Put, Request,MessageEvent} from '@nestjs/common';
import { CrudService } from './crud.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { editFileName } from 'utils/file-uploads';
import { v4 as uuidv4 } from 'uuid';
import { UpdateDataDto } from './dto/update-data.dto';
import { request } from 'http';
import { concat, from, interval, map, Observable, of, pipe } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';
// import { EventEmitterModule } from '@nestjs/event-emitter';





@Controller('files')
export class CrudController {
  count:number;
    array: string[]=[]; 
   
 observable: Observable<MessageEvent>;      //observable of type Messege event
  constructor(private readonly crudService: CrudService,private eventEmitter: EventEmitter2) {
    this.count=0;
    this.observable = new Observable<MessageEvent>((subscriber) => {
      // this.array.forEach((item) => subscriber.next({data:{ hello: item}}));    //simple sending data
      eventEmitter.on('new_Order',(event) =>        
      {
        this.array.forEach((item) => subscriber.next({data:{ hello: item}}));   //looping through data in array 
        this.array.length=0;
        setTimeout(() => {
         subscriber.next({data: { hello: 'complete'  }});
         // subscriber.complete();
       }, 2000);
    });
 });
      // subscriber.next({data: { hello: 'world' + this.count++ }});
      // subscriber.next({data: { hello: '1world' + this.count++ }});
      // subscriber.next({data: { hello: '2world' + this.count++ }});
    // return observable;
   }

  
  @Post()
  @UseInterceptors(FileInterceptor('file', {

    
    storage: diskStorage({
      destination: './uploads',
      filename: editFileName,
    })
  }))
  async createPost(@UploadedFile() file, @Body() body, @Req() req) {

    const uuid=uuidv4();

    let text = req.body.details;
    const myArray = text.split(",");
    // console.log(myArray[0]);  

    console.log(req.file);
    
    
    // console.log(body.file)
    let imageNameToStore = 'http://localhost:4000/files/' +req.file.filename;    
    // let imageNameToStore=uuid;
    let data = {
      uuid:uuid,
      title: myArray[0],
      price: myArray[1],
      images: imageNameToStore 
    }
    
    let fileData={

        _id:uuid,
        fileName:req.file.filename, 
        extension:req.file.mimetype,
        originlName:req.file.originalname
        
      }
      console.log(fileData);
      
      
      return await this.crudService.create(data);
    }
    
    @Get()
    async getData() {
      return await this.crudService.findAll();
      
    }
    
    
    @Get('order')
    async getOrderData() {
      return await this.crudService.findAllOrder();
      
    }
    
    
    @Post('order')
    async order(@Req() req,@Body() body,) {
      console.log(body);
      return await this.crudService.order(body);
    
  }

  @Post('trial')
  async trial(@Req() req,@Body() body) {

    
    this.array.push(body.message);
    this.eventEmitter.emit('new_Order');    //here we can add data direct to payload 

    return this.array;
  
}
        
    @Sse('sse')
    sse(): Observable<MessageEvent> {

    return this.observable;

}



  @Get('one/'+':id')
  async findOne(@Param('id') id: string) {
    return await this.crudService.findOne(id);
    
  }  
  


  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.crudService.delete(id);
    
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: editFileName,
    })
  }))
  async update(@UploadedFile() file,@Param('id') id: string, @Body() body ,@Req() req) {
    

      let text = req.body.details;
    
      const myArray = text.split(",");
      
      let imagePath='http://localhost:4000/data/'+req.file.filename;    //issue
    let data={
      uuid: body.uuid,
      title: myArray[0],
      price: myArray[1],
      images: imagePath               //issue
    }
    return await this.crudService.update(id, data);
  }
  


  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    console.log(image)
    
    return res.sendFile(image, { root: './uploads' });
  }
}

