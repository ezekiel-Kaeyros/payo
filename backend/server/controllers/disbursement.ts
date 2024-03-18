import { Request, Response} from 'express';
import { getDisbursementById, getAllDisbursement,updateDisbursement,
    addDisbursement, deleteDisbursement} from '../db';

const DisbursementController = {
  getOneDisbursement: async (req: Request, res: Response)=> {
    const { id } = req.params;
    const disbursement = await getDisbursementById(id);
    return res.send(disbursement);
  },
  getAllDisbursement: async (req: any, res: Response)=> {
    const disbursements = await getAllDisbursement(req.user);

    console.log('all', disbursements.length);
    return res.send(disbursements);
  },

  createDisbursement: async (req: any, res: Response)=> {
    const disbursement = await addDisbursement(req.body, req.user);
  
   
    return res.send(disbursement);
  },

  updateDisbursement: async (req: Request, res: Response)=> {
    const fieldsToUpdate= req.body
    const disbursement = await updateDisbursement(req.params.id, fieldsToUpdate);
    return res.send(disbursement);
  },

  deleteDisbursement: async (req: Request, res: Response) => {
    
    const disbursement = await deleteDisbursement(req.params.id);
    return res.send(disbursement);
  },

 
};

export default DisbursementController;
