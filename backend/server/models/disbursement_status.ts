import mongoose, { Document } from 'mongoose';
import { IUser } from './user';
;

const Schema = mongoose.Schema;

const DisbursementStatusSchema = new Schema(
  {
    user_id: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
    status_name_id: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Statusname',
    },
  ],
  reason: {
    type: String,
  },
  date_disbursement_status: {
    type: Date,
    default: Date.now(),
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

export interface IDisbursementStatus extends Document {
  name: string;
  active: boolean;
  user_id: IUser[];
  createdAt?: string;
  updatedAt?: string;
  status_name_id: string;
  date_disbursement_status: Date;
  reason: string;
  disbursement_id?: string;
  _id?: string;
}

export default mongoose.model<IDisbursementStatus>('Disbursementstatus', DisbursementStatusSchema);
