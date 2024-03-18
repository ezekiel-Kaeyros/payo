import { Request, Response } from 'express';
import { getDisbursementTypeById, getDisbursementTypes,updateDisbursementType, addDisbursementType, deleteDisbursementType} from '../db';

const DisbursementTypeController = {
  disbursementType: async (req: Request, res: Response) => {
    const { id } = req.params;
    const dType = await getDisbursementTypeById(id);
    return res.send(dType);
  },
  getDisbursementTypes: async (req: Request, res: Response) => {
    const dTypes = await getDisbursementTypes();
    return res.send(dTypes);
  },

  createDisbursementType: async (req: Request, res: Response) => {
    const {name} = req.body;
    const dType = await addDisbursementType(name);
    return res.send(dType);
  },

  updateDisbursementType: async (req: Request, res: Response) => {
    const fieldsToUpdate= req.body
    const dType = await updateDisbursementType(req.params.id, fieldsToUpdate);
    return res.send(dType);
  },

  deleteDisbursementType: async (req: Request, res: Response) => {
    const dTypeId= req.params.id
    const dType = await deleteDisbursementType(dTypeId);
    return res.send(dType);
  },

 
};

export default DisbursementTypeController;
