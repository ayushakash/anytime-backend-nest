import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


export type OrderDocument = Document & order;

@Schema()
export class order {

    @Prop()
    name: String;
    @Prop()
    address: String;
    @Prop()
    email: String;
    @Prop()
    phone: String;
    @Prop()
    store: String;
    @Prop()
    mop: String;
    @Prop()
    products: [Object];

}

export const orderSchema = SchemaFactory.createForClass(order);