import mongoose, { Document } from 'mongoose';
;

const Schema = mongoose.Schema;

const DisbursementSchema = new Schema(
  {
    
    name: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export interface IDisbursementType extends Document {
  name: string;
  createdAt?: string;
  updatedAt?: string;
  _id?: string;
}

export default mongoose.model<IDisbursementType>('DisbursementType', DisbursementSchema);