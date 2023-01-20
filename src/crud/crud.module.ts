import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CrudController } from './crud.controller';
import { CrudService } from './crud.service';
import { data, dataSchema } from './data.schema';
import { MulterModule } from '@nestjs/platform-express';
import { orderSchema } from './order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name:'data', schema: dataSchema }]),
    MongooseModule.forFeature([{ name:'order', schema: orderSchema }]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [CrudController],
  providers: [CrudService]
})
export default class CrudModule {}
