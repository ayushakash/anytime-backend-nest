import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


export type DataDocument = Document & data;

@Schema()
export class data {

    @Prop()
    uuid: String;
    @Prop()
    title: String;
    @Prop()
    images: String;
    @Prop()
    price: String;



}

export const dataSchema = SchemaFactory.createForClass(data);
