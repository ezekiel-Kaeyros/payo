import mongoose, { Document } from 'mongoose';

const Schema = mongoose.Schema;

const PaymentMethodSchema = new Schema(
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
  },
  {
    timestamps: true,
  }
);

export interface IPaymentMethod extends Document {
  name: string;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
  _id?: string;
}

export default mongoose.model<IPaymentMethod>('Paymentmethod', PaymentMethodSchema);
