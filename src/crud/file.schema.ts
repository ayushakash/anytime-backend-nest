import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


export type FileDocument = Document & file;

@Schema()
export class file {

    @Prop()
    uuid: String;
    @Prop()
    fileName: String;
    @Prop()
    extension: String;
    @Prop()
    originlName: String;



}

export const fileSchema = SchemaFactory.createForClass(file);