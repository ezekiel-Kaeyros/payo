import mongoose, { Document } from 'mongoose';

const Schema = mongoose.Schema;

const StatusNameSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      // unique: true,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    flag: {
      type: Number,
      // unique: true,
      required: true,
      default: 0,
    },
    companyId: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Company',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export interface IStatusName extends Document {
  name: string;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
  _id?: string;
  flag: number;
  companyId: string;
}

export default mongoose.model<IStatusName>('Statusname', StatusNameSchema);
