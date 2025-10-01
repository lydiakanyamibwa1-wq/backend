// src/models/contactMod.ts
import { Document, model, Schema } from 'mongoose';

export interface IContact extends Document {
  name: string;
  email: string;
  phone?: string; // optional
  message: string;
  createdAt? : Date;
  updatedAt? : Date;
}

const contactSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    message: { type: String, required: true },
  },
  { timestamps: true } // Corrected property
);

export const Contact = model<IContact>('Contact', contactSchema);
