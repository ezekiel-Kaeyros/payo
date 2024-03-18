// @ts-nocheck
import {PaymentMethod} from '../models';
import { IPaymentMethod } from '../models/payment_method';



export const getPaymentMethodById = async (id: string): Promise<IPaymentMethod> => {
  const query = { _id: id };

  const paymentM = await PaymentMethod.findOne(query)
  return paymentM;
};

export const getPaymentsMethod = async (): Promise<IRole[]> => {
      const payments = PaymentMethod.find({})
      return payments;
    };

export const addPaymentMethod = async (
  name: string
) => {
  const payment = await PaymentMethod.create({
    name
  });
  return payment;
};

export const updatePaymentMethod = async (id: string, body: IPaymentMethod): Promise<IPaymentMethod> => {
  const payment = await PaymentMethod.findOneAndUpdate({ _id: id }, {...body}, { new: true })
  return payment;
};

export const deletePaymentMethod = async (id: string): Promise<any> => {
  const payment = await PaymentMethod.findByIdAndDelete(id);
  return payment;
};
