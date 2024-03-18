import mongoose, { Document } from 'mongoose';
import { IRole } from './role';
import { IUser } from './user';
;

const Schema = mongoose.Schema;

const UserRoleTimestampSchema = new Schema(
  {
    user_id: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
    user_role: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Role',
        },
      ],
  },
  {
    timestamps: true,
  }
);

export interface IUserRoleTimestamp extends Document {
  user_role: IRole[];
  user_id: IUser[];
  createdAt?: string;
  updatedAt?: string;
  _id?: string;
}

export default mongoose.model<IUserRoleTimestamp>('DisbursementStatus', UserRoleTimestampSchema);
