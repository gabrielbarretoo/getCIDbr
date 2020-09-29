import mongoose, { Schema, Document } from 'mongoose';

interface SubCategory {
  code: string;
  description: string;
}

export interface ICID extends Document {
  code: string;
  description: string;
  subcategories?: Array<SubCategory>;
}

const CIDSchema: Schema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  subcategories: [
    {
      code: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],
});

export default mongoose.model<ICID>('CID', CIDSchema);
