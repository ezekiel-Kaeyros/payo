// @ts-nocheck
import { Departement } from '../models';
import { IDepartment } from '../models/department';


export const getDepartementById = async (id: string) => {
  const query = { _id: id };

  const department = await Departement.findOne(query)
  .populate('office_id')
  .populate('user')

  return department;
};

export const getDepartements = async (): Promise<IDepartment[]> => {
    const departments = Departement.find({})
    .populate('office_id')
    .populate('user');
    return departments;
  };

  export const addDepartement = async (
    name: string,office_id: string
  ) => {
    try {
      const dep = await Departement.create({
        name, office_id
      });
      return dep;
    } catch (error) {
      console.log(error);
      
    }
  };
  
  export const updateDepartement = async (id: string, fieldsToUpdate: any): Promise<IDepartment> => {
    const dep = await Departement.findOneAndUpdate({ _id: id }, { ...fieldsToUpdate }, { new: true })
    return dep;
  };
  
  export const deleteDepartement = async (id: string): Promise<any> => {
    const dep = await Departement.findByIdAndDelete(id);
    return dep;
  };


  export const deleteAllDepartement = async (): Promise<any> => {
    // const dep = await Departement.findByIdAndDelete(id);
    const res= await Departement.deleteMany({});
    return res;
  };