import mongoose, { Document } from 'mongoose';
;

const Schema = mongoose.Schema;

const RoleAmountSchema = new Schema(
  {
    
    amount: {
      type: Number,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export interface IRoleAmount extends Document {
  name?: string;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
  _id?: string;
}

export default mongoose.model<IRoleAmount>('RoleAmount', RoleAmountSchema);