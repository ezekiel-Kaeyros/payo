import mongoose, { Document } from 'mongoose';
import { IDepartment } from './department';
import { ICompany } from './company';
;

const Schema = mongoose.Schema;

const OfficeSchema = new Schema(
  {
    companyId: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Company',
      },
    ],
    department: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Department',
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

export interface IOffice extends Document {
  name: string;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
  _id?: string;
  Department?: IDepartment[];
  companyId?: ICompany[];
}

export default mongoose.model<IOffice>('Office', OfficeSchema);
