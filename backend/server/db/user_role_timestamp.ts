// @ts-nocheck
import {UserRoleTimestamp} from '../models';
import { IUserRoleTimestamp } from '../models/user_role_timestamp';



export const getUserRoleTimestamp = async (id: string): Promise<IUserRoleTimestamp> => {
  const query = { _id: id };

  const user_role_timestamp = await UserRoleTimestamp.findOne(query)
  .populate('user_id')
  .populate('user_role')
  return user_role_timestamp;
};

export const getAllUserRoleTimestamp = async (): Promise<IRole[]> => {
      const users_role_timestamps = UserRoleTimestamp.find({})
      .populate('user_id')
      .populate('user_role')
      return users_role_timestamps;
    };

export const addUserRoleTimestamp = async (
  data: IUserRoleTimestamp
) => {
  const user_role_timestamp = await UserRoleTimestamp.create({
    ...data
  });
  return user_role_timestamp;
};

export const updateUserRoleTimestamp = async (id: string, body: IUserRoleTimestamp): Promise<IUserRoleTimestamp> => {
  const user_role_timestamp = await UserRoleTimestamp.findOneAndUpdate({ _id: id }, {...body}, { new: true })
  return user_role_timestamp;
};

export const deleteUserRoleTimestamp = async (id: string): Promise<any> => {
  const user_role_timestamp = await UserRoleTimestamp.findByIdAndDelete(id);
  return user_role_timestamp;
};
