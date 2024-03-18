import mongoose, { Document } from 'mongoose';
import { IDisbursementType } from './disbursement_type';

const Schema = mongoose.Schema;

const BeneficiarySchema = new Schema(
  {
    disbursement_type_id: [
      {
        type: Schema.Types.ObjectId,
        ref: 'DisbursementType',
        required: true,
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

export interface IBeneficiary extends Document {
  name: string;
  disbursement_type_id: IDisbursementType[];
  active: boolean;
  _id: string
}



export default mongoose.model<IBeneficiary>('Beneficiary', BeneficiarySchema);
