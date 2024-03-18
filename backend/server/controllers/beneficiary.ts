import { Request, Response} from 'express';
import { getBeneficiaryById, getAllBeneficiaries,updateBeneficiary, addBeneficiary, deleteBeneficiary} from '../db';

const BeneficiaryController = {
  oneBeneficiary: async (req: Request, res: Response)=> {
    const { id } = req.params;
    const beneficiary = await getBeneficiaryById(id);
    return res.send(beneficiary);
  },
  getAllBeneficiaries: async (req: Request, res: Response)=> {
    const beneficiarys = await getAllBeneficiaries();
    return res.send(beneficiarys);
  },

  createBeneficiary: async (req: Request, res: Response)=> {
   
    const beneficiary = await addBeneficiary({...req.body});
    return res.send(beneficiary);
  },

  updateBeneficiary: async (req: Request, res: Response)=> {
    const fieldsToUpdate= req.body
    const beneficiary = await updateBeneficiary(req.params.id, fieldsToUpdate);
    return res.send(beneficiary);
  },

  deleteBeneficiary: async (req: Request, res: Response) => {
    const beneficiaryId= req.params.id
    const beneficiary = await deleteBeneficiary(beneficiaryId);
    return res.send(beneficiary);
  },

 
};

export default BeneficiaryController;
