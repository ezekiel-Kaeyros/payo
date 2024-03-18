// @ts-nocheck
import { User } from '../models';
import role_amount from '../models/role_amount';
import { IUser } from '../models/user';
import { sendEmail } from '../utils/email';
import { getRoleById } from './role';


export const getUserByEmail = async (email: string) => {
  const user = await User.findOne({ email })
    .populate({
      path: 'role',
      populate: [{ path: 'role_amount_id' }, { path: 'status_name_id' }],
    })
  .populate('office_id')
  .populate('department_id')
  .populate('companyId')
  
  return user;
};

export const getUserById = async (id: string) => {
  const query = { _id: id };

  const user = await User.findOne(query)
    .select('-password')
    .populate({
      path: 'role',
      populate: [{ path: 'role_amount_id' }, { path: 'status_name_id' }],
    })
    .populate('companyId')
    .populate('office_id')
    .populate('department_id')

  return user;
};

export const getUsersByDepartment = async (department_id: string) => {
  console.log(department_id);
  
  const users = await 
     User.find({ department_id })
      .populate({
        path: 'role',
        populate: [{ path: 'status_name_id' }]
      })
      .populate('office_id')
      .populate('department_id')
      .populate('companyId')
  return users;
};

export const getUsersByOffice = async (office_id: string) => {
  console.log(office_id);
  
  const users = await 
     User.find({ office_id })
      .populate('office_id')
      .populate('department_id')
      .populate('companyId')
      .populate({
        path: 'role',
        populate: [{ path: 'role_amount_id' }, { path: 'status_name_id' }],
      })
  return users;
};

export const getUserByUsername = async (username: string) => {
  const user = await User.findOne({ username })
  .select('-password')
  .populate({
    path: 'role',
    populate: [{ path: 'role_amount_id' }, { path: 'status_name_id' }],
  })
  .populate('department_id')
  .populate('companyId')
  return user;
};

export const updateUserResetPasswordToken = async (userId: string, token: string) => {
  const user = await User.findOneAndUpdate({ _id: userId }, { resetPasswordToken: token });
  return user;
};

export const createUser = async (
  email: string,
  password: string,
  first_name:string,
  last_name:string,
  department_id: string,
  office_id: string,
  role: string,
  companyId: string,
) => {
  let roles= await getRoleById(role);
  let amount_exists= roles['role_amount_id'][0].amount

  if (roles && roles.level == 1) {
    let flag= false
    const exist_user = await User.find({ role: role, office_id: office_id})
    .select('-password')
    .populate('department_id')
    .populate('office_id')
    .populate({
      path: 'role',
      populate: [{ path: 'role_amount_id' }, { path: 'status_name_id' }],
    })
    if (exist_user.length) {
      exist_user.forEach(user => {
        console.log(user);
        if (user?.role[0].role_amount_id[0].amount = amount_exists) {
         flag= true
        }  
      })
    } 
    if (flag) {
      return false
    }
  }

  if (roles && roles.level == 2) {
    const exist_user = await User.find({ role: role, office_id: office_id, department_id: department_id});
    if (exist_user.length) {
      return false
    }
  }

  if (roles && roles.level == 3) {
    const exist_user = await User.find({ role: role, office_id: office_id});
    if (exist_user.length) {
      return false
    }
  }
  const user = await User.create({
    email,
    password,
    first_name, 
    last_name,
    department_id,
    office_id,
    role,
    companyId
  });
 
  sendEmail(email, 'Welcome to our platform', `Hello ${first_name} ${last_name} votre compte a été cree avec succes sur la plateforme cashapp`)
  return user;
};

export const getUsers = async (
  
) => {
 
  
  let users: any[] = User.find({})
  .select('-password')
  .populate('department_id')
  .populate('office_id')
  .populate({
    path: 'role',
    populate: [{ path: 'role_amount_id' }, { path: 'status_name_id' }],
  })
  .sort({ createdAt: 'desc' });

  return users;
};

export const countUsers = async () => {
  const total = await User.countDocuments({});
  const verified = await User.countDocuments({ emailVerified: true });
  return { total, verified };
};

export const updateUser = async (id: string, fieldsToUpdate: IUser) => {
  
  // let us= await User.find({})
  // .select('-password')
  // .populate('department_id')
  // .populate('office_id')
  // .populate({
  //   path: 'role',
  //   populate: [{ path: 'role_amount_id' }, { path: 'status_name_id' }],
  // })
  
  
  const user = await User.findOneAndUpdate({ _id: id }, { ...fieldsToUpdate }, )
  return user;
};

export const deleteUser = async (id: string) => {
  // const user = await User.findOneAndUpdate(  );
 const user = await User.findByIdAndDelete(id, { new: true });
  return user;
};
