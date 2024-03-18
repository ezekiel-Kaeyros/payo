import mongoose, { Document } from 'mongoose';
import { IRoleAmount } from './role_amount';
import { IUser } from './user';
import { IStatusName } from './status_name';

const Schema = mongoose.Schema;

const RoleSchema = new Schema(
  {
    role_amount_id: [
      {
        type: Schema.Types.ObjectId,
        ref: 'RoleAmount',
      },
    ],
    status_name_id: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Statusname',
      },
    ],
    user: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    name: {
      type: String,
      trim: true,
      // unique: true,
      required: true,
    },
    level: {
      type: Number,
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

export interface IRole extends Document {
  name: string;
  role_amount_id: IRoleAmount[];
  status_name_id: IStatusName[];
  user?: IUser[];
  active: boolean;
  level: number;
}

// 1= validateur financier, 2= validateur administratif, 3= caisse, 4= initiator

export default mongoose.model<IRole>('Role', RoleSchema);
