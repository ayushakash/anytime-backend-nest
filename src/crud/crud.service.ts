import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { data, DataDocument } from './data.schema';
import { CreateDataDto } from './dto/create-data.dto';
import { UpdateDataDto } from './dto/update-data.dto';
import { OrderDto } from './dto/order.dto';
import { order, OrderDocument } from './order.schema';
import { interval, map } from 'rxjs';
const axios = require('axios');


@Injectable()
export class CrudService {


    constructor(@InjectModel("data") private readonly dataModel: Model<DataDocument>,
    @InjectModel("order") private readonly orderModel: Model<OrderDocument>) {}
    // (@InjectModel("order") private orderModel: Model<OrderDocument>){} 

    async create(createDataDto: CreateDataDto) {
      console.log({createDataDto});
      console.log('reached database')
      const createdData = new this.dataModel(createDataDto);
      return createdData.save();
    }
  
    async findAll(): Promise<data[]> {
      let data = await this.dataModel.find()

      return data;
    }

    async findOne(id: string): Promise<data> {
      
      let data= await this.dataModel.findById(id).exec();
      console.log('data received', data);
      return data;
    }

    async delete(id: string): Promise<data> {
      
        let data= await this.dataModel.findByIdAndDelete(id).exec();
        console.log('data deleted', data);
        return data;
      }

      async update(id: string, updateDataDto: data): Promise<data> {
        

        await this.dataModel.findByIdAndUpdate(id, updateDataDto).exec();
        
        return updateDataDto;
      }
    

      async notification(data: string){
        

        return '{data: "Hello"} {data: "world!"}';
        
        // let clients = [];
        // let facts = [];
        // function eventsHandler(request, response, next) {
        //   const headers = {
        //     'Content-Type': 'text/event-stream',
        //     'Connection': 'keep-alive',
        //     'Cache-Control': 'no-cache'
        //   };
        //   response.writeHead(200, headers);
        
        //   const data = `data: ${JSON.stringify(facts)}\n\n`;
        
        //   response.write(data);
        
        //   const clientId = Date.now();
        
        //   const newClient = {
        //     id: clientId,
        //     response
        //   };
        
        //   console.log(newClient);
        //   clients.push(newClient);
        
        //   request.on('close', () => {
        //     console.log(`${clientId} Connection closed`);
        //     clients = clients.filter(client => client.id !== clientId);        
        //   });
        // }
      
        

      }



    async order(orderDto: OrderDto) {
      
      console.log('reached order database')
      const orderData = new this.orderModel(orderDto);
      orderData.save().then(() => {

        console.log('going to notification')
        // this.notification(orderDto);


        return orderData;                                     // 

        console.log('data saved successfully')}).catch(() => {

          console.log('data not saved')
        
      })
    }


    async findAllOrder(): Promise<order[]> {
      let data = await this.orderModel.find()

      return data;
    }
      
}




