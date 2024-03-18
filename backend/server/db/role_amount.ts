// @ts-nocheck
import {RoleAmount} from '../models';
import { IRoleAmount } from '../models/role_amount';


export const getRoleAmountById = async (id: string): Promise<IRoleAmount> => {
  const query = { _id: id };
  const roleAmount = await RoleAmount.findOne(query)
  return roleAmount;
};

export const getRolesAmount = async (): Promise<IRole[]> => {
      const rolesAmount = RoleAmount.find({})
      return rolesAmount;
    };

export const addRoleAmount = async (
  amount: number
) => {
  const rAmount = await RoleAmount.create({
    amount
  });
  return rAmount;
};

export const updateRoleAmount = async (id: string, body: IRoleAmount): Promise<IRoleAmount> => {
  const rAmount = await RoleAmount.findOneAndUpdate({ _id: id }, {...body}, { new: true })
  return rAmount;
};

export const deleteRoleAmount = async (id: string): Promise<any> => {
  const rAmount = await RoleAmount.findByIdAndDelete(id);
  return rAmount;
};
