import { Request, Response} from 'express';
import { getCompanyById, getAllCompanies,updateCompany, addCompany, deleteCompany} from '../db';

const CompanyController = {
    getCompanyById: async (req: Request, res: Response)=> {
    const { id } = req.params;
    const company = await getCompanyById(id);
    return res.send(company);
  },
  getAllCompanies: async (req: Request, res: Response)=> {
    const companies = await getAllCompanies();
    return res.send(companies);
  },

  createCompany: async (req: Request, res: Response)=> {
    // const { name } = req.body;
    const company = await addCompany(req.body);
    return res.send(company);
  },

  updateCompany: async (req: Request, res: Response)=> {
    const fieldsToUpdate= req.body
    const company = await updateCompany(req.params.id, fieldsToUpdate);
    return res.send(company);
  },

  deleteCompany: async (req: Request, res: Response) => {
    const Id= req.params.id
    const company = await deleteCompany(Id);
    return res.send(company);
  },

 
};

export default CompanyController;
