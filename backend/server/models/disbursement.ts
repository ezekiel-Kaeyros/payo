import mongoose, { Document } from 'mongoose';
import { IDisbursementStatus } from './disbursement_status';
import { IBeneficiary } from './beneficiary';
import { IUser } from './user';
import { IDisbursementStatusTimestamp } from './disbursement_status_timestamp';
;

const Schema = mongoose.Schema;

const DisbursementSchema = new Schema(
  {
    disbursement_status_id: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Disbursementstatus',
        },
      ],

      payment_method_id: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Paymentmethod',
        },
      ],
      beneficiary_id: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Beneficiary',
        },
      ],
      initiator: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
      disbursement_current_status: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Disbursementstatustimestamp',
        },
      ],
    amount: {
      type: Number,
      required: true,
    },
    reject_note: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
    invoice_number: {
        type: String,
        trim: true,
      },
    reason: {
      type: String,
    },
    user_office: {
      type: String,
    },
    user_department: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

export interface IDisbursement extends Document {
  disbursement_status_id: any[];
  beneficiary_id?: IBeneficiary[];
  initiator?: IUser[];
  disbursement_current_status?: IDisbursementStatusTimestamp[];
  amount?: number;
  initiator_id?: String;
  user_office?: String;
  user_department?: String;
  reject_note?: String;
  reason?: string;
  active?: boolean;
  invoice_number: String;
  createdAt?: String;
  updatedAt?: String;
  _id?: String;
}

export default mongoose.model<IDisbursement>('Disbursement', DisbursementSchema);

