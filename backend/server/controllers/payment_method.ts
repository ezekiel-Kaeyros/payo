import { Request, Response} from 'express';
import { getPaymentMethodById, getPaymentsMethod,updatePaymentMethod, addPaymentMethod, deletePaymentMethod} from '../db';

const PaymentMethodController = {
    getPaymentMethodById: async (req: Request, res: Response)=> {
    const { id } = req.params;
    const payment = await getPaymentMethodById(id);
    return res.send(payment);
  },
  getPaymentsMethod: async (req: Request, res: Response)=> {
    const payments = await getPaymentsMethod();
    return res.send(payments);
  },

  createMethodPayment: async (req: Request, res: Response)=> {
    const { name } = req.body;
    const payment = await addPaymentMethod(name);
    return res.send(payment);
  },

  updatePaymentMethod: async (req: Request, res: Response)=> {
    const fieldsToUpdate= req.body
    // console.log("88888888", fieldsToUpdate)
    const payment = await updatePaymentMethod(req.params.id, fieldsToUpdate);
    return res.send(payment);
  },

  deletePaymentMethod: async (req: Request, res: Response) => {
    const Id= req.params.id
    const payment = await deletePaymentMethod(Id);
    return res.send(payment);
  },

 
};

export default PaymentMethodController;
