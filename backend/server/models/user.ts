import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcrypt';
import { UserRole } from '../constants/types';
import { IRole } from './role';
import { IDepartment } from './department';
import office, { IOffice } from './office';
import { ICompany } from './company';

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    role: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Role',
      },
    ],
    companyId: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Company',
      },
    ],
    department_id: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Department',
      },
    ],
    office_id: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Office',
      },
    ],
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    first_name: {
      type: String,
      trim: true,
    },
    last_name: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    current_role: {
      type: String,
      trim: true,
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

export interface IUser extends Document {
  role: IRole[];
  department_id: IDepartment[];
  office_id: IOffice[];
  companyId: ICompany[];
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  active: boolean;
  current_role: string;
  createdAt?: string;
  updatedAt?: string;
  _id?: string;
  isValidPassword: (password: string) => Promise<boolean>;
}

UserSchema.pre<IUser>('save', async function (next) {
  if (this.password) {
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
  }
  next();
});

UserSchema.methods.isValidPassword = async function (password: string) {
  const user = this as IUser;
  
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

export default mongoose.model<IUser>('User', UserSchema);
