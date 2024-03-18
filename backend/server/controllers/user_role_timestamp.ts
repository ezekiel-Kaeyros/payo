import { Request, Response} from 'express';
import { getUserRoleTimestamp, getAllUserRoleTimestamp,updateUserRoleTimestamp,
     addUserRoleTimestamp, deleteUserRoleTimestamp} from '../db';
import UserController from './user';

const   UserRoleTimestampController = {
  getUserRoleTimestamp: async (req: Request, res: Response)=> {
    const { id } = req.params;
    const user_role_timestamp = await getUserRoleTimestamp(id);
    return res.send(user_role_timestamp);
  },
  getAllUserRoleTimestamp: async (req: Request, res: Response)=> {
    const users_roles_timestamp = await getAllUserRoleTimestamp();
    return res.send(users_roles_timestamp);
  },

  createUserRoleTimestamp: async (req: Request, res: Response)=> {

    const user_role_timestamp = await addUserRoleTimestamp({...req.body});
    return res.send(user_role_timestamp);
  },

  updateUserRoleTimestamp: async (req: Request, res: Response)=> {
    const fieldsToUpdate= req.body
    const user_role_timestamp = await updateUserRoleTimestamp(req.params.id, fieldsToUpdate);
    return res.send(user_role_timestamp);
  },

  deleteUserRoleTimestamp: async (req: Request, res: Response) => {
    const id= req.params.id
    const user_role_timestamp = await deleteUserRoleTimestamp(id);
    return res.send(user_role_timestamp);
  },

 
};

export default UserRoleTimestampController;
