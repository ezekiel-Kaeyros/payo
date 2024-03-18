import { Request, Response } from 'express';
import { getDisbursementStatusById, getDisbursementStatuss,updateDisbursementStatus, addDisbursementStatus, deleteDisbursementStatus} from '../db';

const DisbursementStatusController = {
  disbursementStatus: async (req: Request, res: Response) => {
    const { id } = req.params;
    const dStatus = await getDisbursementStatusById(id);
    return res.send(dStatus);
  },
  getDisbursementStatuss: async (req: Request, res: Response) => {
    const dStatuss = await getDisbursementStatuss();
    return res.send(dStatuss);
  },

  createDisbursementStatus: async (req: Request, res: Response) => {
    const body = req.body;
    const dStatus = await addDisbursementStatus(body);
    return res.send(dStatus);
  },

  updateDisbursementStatus: async (req: Request, res: Response) => {
    const fieldsToUpdate= req.body
    const dStatus = await updateDisbursementStatus(req.params.id, fieldsToUpdate);
    return res.send(dStatus);
  },

  deleteDisbursementStatus: async (req: Request, res: Response) => {
    const dStatusId= req.params.id
    const dStatus = await deleteDisbursementStatus(dStatusId);
    return res.send(dStatus);
  },

 
};

export default DisbursementStatusController;
