// @ts-nocheck
import {Office} from '../models';
import { IOffice } from '../models';



export const getOfficeById = async (id: string): Promise<IOffice> => {
  const query = { _id: id };
  // return
  try {
    const office = await Office.findOne(query)
    .populate('companyId')
    .populate('department')
    return office;
  } catch (error) {
    return error
  }
};

export const getOffices = async (): Promise<IRole[]> => {
      const offices = Office.find({})
      .populate('companyId')
      .populate('department')
      return offices;
    };

export const addOffices = async (
 body
) => {
  const office = await Office.create(body)
  .populate('companyId')
  return office;
};

export const updateOffice = async (id: string, body: IOffice): Promise<IOffice> => {
  const office = await Office.findOneAndUpdate({ _id: id }, {...body}, { new: true })
  return office;
};

export const deleteOffice = async (id: string): Promise<any> => {
  const office = await Office.findByIdAndDelete(id);
  return office;
};
