import { Request, Response} from 'express';
import { getOfficeById, getOffices,updateRole, addOffices, deleteOffice, updateOffice} from '../db';

const OfficeController = {
  office: async (req: Request, res: Response)=> {
    const { id } = req.params;
    const office = await getOfficeById(id);
    return res.send(office);
  },
  getOffices: async (req: Request, res: Response)=> {
    const offices = await getOffices();
    return res.send(offices);
  },

  createOffice: async (req: Request, res: Response)=> {
    const { name } = req.body;
    const office = await addOffices(req.body);
    return res.send(office);
  },

  updateOffice: async (req: Request, res: Response)=> {
    const fieldsToUpdate= req.body
    const office = await updateOffice(req.params.id, fieldsToUpdate);
    return res.send(office);
  },

  deleteOffice: async (req: Request, res: Response) => {
    const officeId= req.params.id
    const office = await deleteOffice(officeId);
    return res.send(office);
  },

 
};

export default OfficeController;
