// @ts-nocheck
import {Company} from '../models';
import { ICompany } from '../models/company';



export const getCompanyById = async (id: string): Promise<ICompany> => {
  const query = { _id: id };

  const company = await Company.findOne(query)
  return company;
};

export const getAllCompanies = async (): Promise<ICompany[]> => {
      const companies = Company.find({})
      return companies;
    };

export const addCompany = async (
  body
) => {
  const company = await Company.create(body);
  return company;
};

export const updateCompany = async (id: string, body: ICompany): Promise<ICompany> => {
  const company = await Company.findOneAndUpdate({ _id: id }, {...body}, { new: true })
  return company;
};

export const deleteCompany = async (id: string): Promise<any> => {
  const company = await Company.findByIdAndDelete(id);
  return company;
};
