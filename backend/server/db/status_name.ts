// @ts-nocheck
import {StatusName} from '../models';
import { IStatusName } from '../models/status_name';



export const getStatusNameById = async (id: string): Promise<IStatusName> => {
  const query = { _id: id };

  const statusname = await StatusName.findOne(query)
  .populate('companyId')
  return statusname;
};

export const getStatusNames = async (): Promise<IRole[]> => {
      const statusnames = StatusName.find({})
      .populate('companyId')
      return statusnames;
    };

export const addStatusName = async (
 body
) => {
  const statusname = await StatusName.create(body)
  .populate('companyId')
  return statusname;
};

export const updateStatusName = async (id: string, body: IStatusName): Promise<IStatusName> => {
  const statusname = await StatusName.findOneAndUpdate({ _id: id }, {...body}, { new: true })
  .populate('companyId')
  return statusname;
};

export const deleteStatusName = async (id: string): Promise<any> => {
  const statusname = await StatusName.findByIdAndDelete(id);
  return statusname;
};
