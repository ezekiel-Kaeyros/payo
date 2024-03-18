import { Request, Response} from 'express';
import { getStatusNameById, getStatusNames,updateStatusName, addStatusName, deleteStatusName} from '../db';

const StatusNameController = {
    getStatusNameById: async (req: Request, res: Response)=> {
    const { id } = req.params;
    const statusname = await getStatusNameById(id);
    return res.send(statusname);
  },
  getStatusNames: async (req: Request, res: Response)=> {
    const statusnames = await getStatusNames();
    return res.send(statusnames);
  },

  createStatusName: async (req: Request, res: Response)=> {
    // const { name } = req.body;
    const statusname = await addStatusName(req.body);
    return res.send(statusname);
  },

  updateStatusName: async (req: Request, res: Response)=> {
    const fieldsToUpdate= req.body
    const statusname = await updateStatusName(req.params.id, fieldsToUpdate);
    return res.send(statusname);
  },

  deleteStatusName: async (req: Request, res: Response) => {
    const Id= req.params.id
    const statusname = await deleteStatusName(Id);
    return res.send(statusname);
  },

 
};

export default StatusNameController;
