import { Request, Response} from 'express';
import { getUserById, getUsers,getUsersByDepartment, updateUser, createUser, deleteUser} from '../db';

const UserController = {
  user: async (req: Request, res: Response)=> {
    const { id } = req.params;
    const user = await getUserById(id);
    return res.send(user);
  },
  getUsers: async (req: any, res: Response)=> {
   
    const users = await getUsers();
    // users.forEach((user: any)=>{
    //   let res = deleteUser(user._id)
    //   console.log(res);
      
    // })
    return res.send(users);
  },

  getUsersByDepartment: async (req: Request, res: Response)=> {
    const { department_id } = req.params;
    const users = await getUsersByDepartment(department_id);
    return res.send(users);
  },

  createUser: async (req: Request, res: Response)=> {

    const {email, password,first_name, last_name, department_id, office_id, role,companyId} = req.body;
    const user = await createUser(email, password,first_name, last_name, department_id, office_id, role,companyId);
    if (user) {
      return res.send(user);
    }else{
      return res.status(500).send('An error occurred while creating the user, user with this role exist');
    }
  
  },

  updateUser: async (req: Request, res: Response)=> {
    const fieldsToUpdate= req.body
    const user = await updateUser(req.params.id, fieldsToUpdate);
    return res.send(user);
  },

  deleteUser: async (req: Request, res: Response) => {
    const userId= req.params.id
    const user = await deleteUser(userId);
    return res.send(user);
  },

 
};

export default UserController;
