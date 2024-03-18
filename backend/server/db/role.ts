// @ts-nocheck
import { Role } from '../models';
import { IRole } from '../models/role';


export const getRoleById = async (id: string): Promise<IRole> => {
  const query = { _id: id };

  const role = await Role.findOne(query)
  .populate('role_amount_id')
  .populate('status_name_id')
  .populate('user');
  return role;
};

export const getRoles = async (): Promise<IRole[]> => {
      const roles = Role.find({})
      .populate('role_amount_id')
      .populate('status_name_id')
      .populate('user');
      return roles;
    };

export const addRoleUser = async (
 body
) => {
  const role = await Role.create({
    ...body
  });
  return role;
};

export const updateRole = async (id: string, body: IRole): Promise<IRole> => {
  await Role.findOneAndUpdate({ _id: id }, {...body }, { new: true })
  const query = { _id: id };
  const role = await Role.findOne(query)
  .populate('role_amount_id')
  .populate('status_name_id')
  .populate('user');
  return role;
};

export const deleteRole = async (id: string): Promise<any> => {
  const role = await Role.findByIdAndDelete(id);
  return role;
};
