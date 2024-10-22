import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Company extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  industry: string;

  @Prop({ required: true })
  domain: string;

  @Prop({ required: true })
  logo: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
