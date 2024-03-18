// @ts-nocheck
import {Beneficiary} from '../models';
import { IBeneficiary } from '../models/beneficiary';



export const getBeneficiaryById = async (id: string): Promise<IBeneficiary> => {
  const query = { _id: id };
  const beneficiary = await Beneficiary.findOne(query)
  .populate('disbursement_type_id')
  return beneficiary;
};

export const getAllBeneficiaries = async (): Promise<IRole[]> => {
      const beneficiarys = Beneficiary.find({})
      .populate('disbursement_type_id')
      return beneficiarys;
    };

export const addBeneficiary = async (
  data: IBeneficiary
) => {
  const beneficiary = await Beneficiary.create({
   ...data
  });
  return beneficiary;
};

export const updateBeneficiary = async (id: string, body: IBeneficiary): Promise<IBeneficiary> => {
  const beneficiary = await Beneficiary.findOneAndUpdate({ _id: id }, {...body}, { new: true })
  return beneficiary;
};

export const deleteBeneficiary = async (id: string): Promise<any> => {
  const beneficiary = await Beneficiary.findByIdAndDelete(id);
  return beneficiary;
};
