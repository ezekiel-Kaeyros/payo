import mongoose, { Document } from 'mongoose';
import { IUser } from './user';
import { IDisbursementStatus } from './disbursement_status';
import { IDisbursement } from './disbursement';
;

const Schema = mongoose.Schema;

const DisbursementStatusTimestampSchema = new Schema(
  {
    disbursement_status: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Disbursementstatus',
        },
      ],
      disbursement_id: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Disbursement',
        },
      ],
      update_user: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
  },
  {
    timestamps: true,
  }
);

export interface IDisbursementStatusTimestamp extends Document {
  disbursement_status: IDisbursementStatus[];
  disbursement_id: IDisbursement[];
  update_user: IUser[];
  createdAt?: string;
  updatedAt?: string;
  _id?: string;
}

export default mongoose.model<IDisbursementStatusTimestamp>('Disbursementstatustimestamp', DisbursementStatusTimestampSchema);
