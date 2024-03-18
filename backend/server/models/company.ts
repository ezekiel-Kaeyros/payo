import mongoose, { Document } from 'mongoose';

const Schema = mongoose.Schema;

const CompanySchema = new Schema(
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
    phone: {
        type: Number,
        trim: true,
      },
      email: {
        type: String,
        trim: true,
      },
  },
  {
    timestamps: true,
  }
);

export interface ICompany extends Document {
  name: string;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
  _id?: string;
  email?: string;
  phone?: number;
}

export default mongoose.model<ICompany>('Company', CompanySchema);
