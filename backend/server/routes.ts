import { Request, Response, Router } from 'express';
import {
  UserController, AuthController, RoleController,RoleAmountController, OfficeController,
  DisbursementTypeController,DisbursementStatusController, DepartmentController, DisbursementController, BeneficiaryController, 
  UserRoleTimestampController, PaymentMethodController, StatusNameController, DisbursementStatusTimestampController,
  QrcodeController,
  CompanyController
} from './controllers';
const router = Router();
import { isAuthenticate} from './utils';
import { Departement } from './models';

router.get('/', (req: Request, res: Response) => res.send('echo'));
router.get('/qrcode', QrcodeController.createQrcode);
router.get('/template', QrcodeController.getComfirmationTemplate)
router.post('/template', QrcodeController.cashierConfirmation)

/**
 * Auth
 */
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);

/**
 * Roles
 */
router.get('/roles/:id',isAuthenticate, RoleController.role);
router.get('/roles',isAuthenticate, RoleController.getRoles);
router.post('/roles', isAuthenticate, RoleController.createRole);
router.put('/roles/:id',isAuthenticate, RoleController.updateRole);
router.delete('/roles/:id', isAuthenticate, RoleController.deleteRole);

/**
 * Role Amount
 */
router.get('/rolesamount/:id',isAuthenticate, RoleAmountController.roleAmount);
router.get('/rolesamount',isAuthenticate, RoleAmountController.getRolesAmount);
router.post('/rolesamount', isAuthenticate, RoleAmountController.createRoleAmount);
router.put('/rolesamount/:id',isAuthenticate, RoleAmountController.updateRoleAmount);
router.delete('/rolesamount/:id', isAuthenticate, RoleAmountController.deleteRoleAmount);


/**
 * Users
 */

router.get('/users',isAuthenticate, UserController.getUsers);
router.get('/users/:id',isAuthenticate, UserController.user);
router.get('/users/departement/:department_id',isAuthenticate, UserController.getUsersByDepartment);
router.post('/users',isAuthenticate, UserController.createUser);
router.put('/users/:id',isAuthenticate, UserController.updateUser);
router.delete('/users/:id',isAuthenticate, UserController.deleteUser);

/**
 * Offices
 */
router.get('/offices/:id',isAuthenticate, OfficeController.office);
router.get('/offices',isAuthenticate, OfficeController.getOffices);
router.post('/offices', isAuthenticate, OfficeController.createOffice);
router.put('/offices/:id',isAuthenticate, OfficeController.updateOffice);
router.delete('/offices/:id', isAuthenticate, OfficeController.deleteOffice);


/**
 * Disbursement
 */

router.get('/disbursement/:id',isAuthenticate, DisbursementController.getOneDisbursement);
router.get('/disbursement',isAuthenticate, DisbursementController.getAllDisbursement);
router.post('/disbursement', isAuthenticate, DisbursementController.createDisbursement);
router.put('/disbursement/:id',isAuthenticate, DisbursementController.updateDisbursement);
router.delete('/disbursement/:id', isAuthenticate, DisbursementController.deleteDisbursement);


/**
 * Disbursement Type
 */

router.get('/disbursement_type/:id',isAuthenticate, DisbursementTypeController.disbursementType);
router.get('/disbursement_type',isAuthenticate, DisbursementTypeController.getDisbursementTypes);
router.post('/disbursement_type', isAuthenticate, DisbursementTypeController.createDisbursementType);
router.put('/disbursement_type/:id',isAuthenticate, DisbursementTypeController.updateDisbursementType);
router.delete('/disbursement_type/:id', isAuthenticate, DisbursementTypeController.deleteDisbursementType);


/**
 * Disbursement Status
 */

router.get('/disbursement_Status/:id',isAuthenticate, DisbursementStatusController.disbursementStatus);
router.get('/disbursement_Status',isAuthenticate, DisbursementStatusController.getDisbursementStatuss);
router.post('/disbursement_Status', isAuthenticate, DisbursementStatusController.createDisbursementStatus);
router.put('/disbursement_Status/:id',isAuthenticate, DisbursementStatusController.updateDisbursementStatus);
router.delete('/disbursement_Status/:id', isAuthenticate, DisbursementStatusController.deleteDisbursementStatus);


/**
 * Disbursement Status TimeStamp
 */

router.get('/disbursement_Status_timestamp/:id',isAuthenticate, DisbursementStatusTimestampController.disbursementStatusTimeStamp);
router.get('/disbursement_Status_timestamp',isAuthenticate, DisbursementStatusTimestampController.getDisbursementStatusTimeStamp);
router.post('/disbursement_Status_timestamp', isAuthenticate, DisbursementStatusTimestampController.createDisbursementStatusTimeStamp);
router.put('/disbursement_Status_timestamp/:id',isAuthenticate, DisbursementStatusTimestampController.updateDisbursementStatusTimeStamp);
router.delete('/disbursement_Status_timestamp/:id', isAuthenticate, DisbursementStatusTimestampController.deleteDisbursementStatusTimeStamp);


/**
 * Department
 */

router.get('/departments/:id',isAuthenticate, DepartmentController.department);
router.get('/departments',isAuthenticate, DepartmentController.getDepartements);
router.post('/departments', isAuthenticate, DepartmentController.createDepartement);
router.put('/departments/:id',isAuthenticate, DepartmentController.updateDepartment);
router.delete('/departments/:id', isAuthenticate, DepartmentController.deleteDepartment);

/**
 * Beneficiary
 */

router.get('/beneficiary/:id',isAuthenticate, BeneficiaryController.oneBeneficiary);
router.get('/beneficiary',isAuthenticate, BeneficiaryController.getAllBeneficiaries);
router.post('/beneficiary', isAuthenticate, BeneficiaryController.createBeneficiary);
router.put('/beneficiary/:id',isAuthenticate, BeneficiaryController.updateBeneficiary);
router.delete('/beneficiary/:id', isAuthenticate, BeneficiaryController.deleteBeneficiary);



/**
 * User Role Timestamp
 */

router.get('/user_role_timestamp/:id',isAuthenticate, UserRoleTimestampController.getUserRoleTimestamp);
router.get('/user_role_timestamp',isAuthenticate, UserRoleTimestampController.getAllUserRoleTimestamp);
router.post('/user_role_timestamp', isAuthenticate, UserRoleTimestampController.createUserRoleTimestamp);
router.put('/user_role_timestamp/:id',isAuthenticate, UserRoleTimestampController.updateUserRoleTimestamp);
router.delete('/user_role_timestamp/:id', isAuthenticate, UserRoleTimestampController.deleteUserRoleTimestamp);


/**
 * Payment Method
 */

router.get('/payment_method/:id',isAuthenticate, PaymentMethodController.getPaymentMethodById);
router.get('/payment_method',isAuthenticate, PaymentMethodController.getPaymentsMethod);
router.post('/payment_method', isAuthenticate, PaymentMethodController.createMethodPayment);
router.put('/payment_method/:id',isAuthenticate, PaymentMethodController.updatePaymentMethod);
router.delete('/payment_method/:id', isAuthenticate, PaymentMethodController.deletePaymentMethod);



/**
 * Status Name
 */

router.get('/status_name/:id',isAuthenticate, StatusNameController.getStatusNameById);
router.get('/status_name',isAuthenticate, StatusNameController.getStatusNames);
router.post('/status_name', isAuthenticate, StatusNameController.createStatusName);
router.put('/status_name/:id',isAuthenticate, StatusNameController.updateStatusName);
router.delete('/status_name/:id', isAuthenticate, StatusNameController.deleteStatusName);


/**
 * Company
 */

router.get('/company/:id',isAuthenticate, CompanyController.getCompanyById);
router.get('/company',isAuthenticate, CompanyController.getAllCompanies);
router.post('/company', isAuthenticate, CompanyController.createCompany);
router.put('/company/:id',isAuthenticate, CompanyController.updateCompany);
router.delete('/company/:id', isAuthenticate, CompanyController.deleteCompany);


export default router;
