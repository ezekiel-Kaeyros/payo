// @ts-nocheck
import {Disbursementstatustimestamp} from '../models';
import { IDisbursementStatusTimestamp} from '../models/disbursement_status_timestamp';


export const getDisbursementStatusTimestampById = async (id: string): Promise<IDisbursementStatusTimestamp> => {
  const query = { _id: id };
  const dStatus = await Disbursementstatustimestamp.findOne(query)
  .populate('user_id')
  .populate('status_name_id')
  return dStatus;
};

export const getDisbursementStatusTimestamp = async (): Promise<IDisbursementStatusTimestamp[]> => {
      const dStatuss = Disbursementstatustimestamp.find({})
      .populate('user_id')
      .populate('status_name_id')
      return dStatuss;
    };

export const addDisbursementStatusTimestamp = async (
  body: IDisbursementStatusTimestamp
) => {
  const dStatus= await Disbursementstatustimestamp.create({
    ...body
  });
  return dStatus;
};

export const updateDisbursementStatusTimestamp = async (id: string, body: IDisbursementStatusTimestamp): Promise<IDisbursementStatusTimestamp> => {
  const dStatus = await Disbursementstatustimestamp.findOneAndUpdate({ _id: id }, {...body}, { new: true })
  return dStatus;
};

export const deleteDisbursementStatusTimestamp = async (id: string): Promise<any> => {
  const dStatus = await Disbursementstatustimestamp.findByIdAndDelete(id);
  return dStatus;
};
