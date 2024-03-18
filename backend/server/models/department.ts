import mongoose, { Document } from 'mongoose';
import { IOffice } from './office';
import { IUser } from './user';

const Schema = mongoose.Schema;

const DepartmentSchema = new Schema(
  {
    office_id: 
      {
        type: Schema.Types.ObjectId,
        ref: 'Office',
      },

    user: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    name: {
      type: String,
      trim: true,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
  
  
);

export interface IDepartment extends Document {
  name: string;
  office_id: IOffice[];
  user?: IUser[];
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
  // _id?: string;
}



export default mongoose.model<IDepartment>('Department', DepartmentSchema);
