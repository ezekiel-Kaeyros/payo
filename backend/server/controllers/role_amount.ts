import { Request, Response } from 'express';
import { getRoleAmountById, getRolesAmount,updateRoleAmount, addRoleAmount, deleteRoleAmount} from '../db';

const RoleAmountController = {
  roleAmount: async (req: Request, res: Response) => {
    const { id } = req.params;
    const rAmount = await getRoleAmountById(id);
    return res.send(rAmount);
  },
  getRolesAmount: async (req: Request, res: Response) => {
    const rAmount = await getRolesAmount();
    return res.send(rAmount);
  },

  createRoleAmount: async (req: Request, res: Response) => {
    const { amount} = req.body;
    const rAmount = await addRoleAmount(amount);
    return res.send(rAmount);
  },

  updateRoleAmount: async (req: Request, res: Response) => {
    const fieldsToUpdate= req.body
    const rAmount = await updateRoleAmount(req.params.id, fieldsToUpdate);
    return res.send(rAmount);
  },

  deleteRoleAmount: async (req: Request, res: Response) => {
    const roleId= req.params.id
    const rAmount = await deleteRoleAmount(roleId);
    return res.send(rAmount);
  },

 
};

export default RoleAmountController;
