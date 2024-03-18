// @ts-nocheck
import {DisbursementType} from '../models';
import { IDisbursementType } from '../models/disbursement_type';


export const getDisbursementTypeById = async (id: string): Promise<IDisbursementType> => {
  const query = { _id: id };
  const dType = await DisbursementType.findOne(query)
  return dType;
};

export const getDisbursementTypes = async (): Promise<IDisbursementType[]> => {
      const dTypes = DisbursementType.find({})
      return dTypes;
    };

export const addDisbursementType = async (
  name: string
) => {
  const dtype= await DisbursementType.create({
    name
  });
  return dtype;
};

export const updateDisbursementType = async (id: string, body: IDisbursementType): Promise<IDisbursementType> => {
  const dType = await DisbursementType.findOneAndUpdate({ _id: id }, {...body}, { new: true })
  return dType;
};

export const deleteDisbursementType = async (id: string): Promise<any> => {
  const dType = await DisbursementType.findByIdAndDelete(id);
  return dType;
};
