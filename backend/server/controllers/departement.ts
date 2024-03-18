import { Request, Response } from 'express';
import { getDepartementById, getDepartements,updateDepartement, addDepartement, deleteDepartement} from '../db';

const DepartmentController = {
  department: async (req: Request, res: Response) => {
    const { id } = req.params;
    const dep = await getDepartementById(id);
    return res.send(dep);
  },
  getDepartements: async (req: Request, res: Response) => {
    const deps = await getDepartements();
    return res.send(deps);
  },

  createDepartement: async (req: Request, res: Response) => {
    const { name, office_id} = req.body;
    const dep = await addDepartement(name, office_id);
    return res.send(dep);
  },

  updateDepartment: async (req: Request, res: Response) => {
    const fieldsToUpdate= req.body
    const dep = await updateDepartement(req.params.id, fieldsToUpdate);
    return res.send(dep);
  },

  deleteDepartment: async (req: Request, res: Response) => {
    const depId= req.params.id
    const dep = await deleteDepartement(depId);
    return res.send(dep);
  },

 
};

export default DepartmentController;
