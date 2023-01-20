import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import CrudModule from './crud/crud.module';
import { MongooseModule } from '@nestjs/mongoose';

import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from '../utils/file-uploads';
// import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';


@Module({
  imports: [EventEmitterModule.forRoot(),
    CrudModule,
    MongooseModule.forRoot('mongodb+srv://chardeevari:chardeevari%40mongo@cluster0.rfwfs.mongodb.net/?retryWrites=true&w=majority'),
    MulterModule.register({
      dest: './uploads',
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
