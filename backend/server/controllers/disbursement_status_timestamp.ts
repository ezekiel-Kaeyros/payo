import { Request, Response } from 'express';
import { getDisbursementStatusTimestampById, getDisbursementStatusTimestamp,updateDisbursementStatusTimestamp, 
    addDisbursementStatusTimestamp, deleteDisbursementStatusTimestamp} from '../db';

const DisbursementStatusTimeStampController = {
  disbursementStatusTimeStamp: async (req: Request, res: Response) => {
    const { id } = req.params;
    const dStatus = await getDisbursementStatusTimestampById(id);
    return res.send(dStatus);
  },
  getDisbursementStatusTimeStamp: async (req: Request, res: Response) => {
    const dStatuss = await getDisbursementStatusTimestamp();
    return res.send(dStatuss);
  },

  createDisbursementStatusTimeStamp: async (req: Request, res: Response) => {
    const body = req.body;
    const dStatus = await addDisbursementStatusTimestamp(body);
    return res.send(dStatus);
  },

  updateDisbursementStatusTimeStamp: async (req: Request, res: Response) => {
    const fieldsToUpdate= req.body
    const dStatus = await updateDisbursementStatusTimestamp(req.params.id, fieldsToUpdate);
    return res.send(dStatus);
  },

  deleteDisbursementStatusTimeStamp: async (req: Request, res: Response) => {
    const dStatusId= req.params.id
    const dStatus = await deleteDisbursementStatusTimestamp(dStatusId);
    return res.send(dStatus);
  },

 
};

export default DisbursementStatusTimeStampController;
