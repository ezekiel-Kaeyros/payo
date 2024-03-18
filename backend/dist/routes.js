"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("./controllers");
const router = (0, express_1.Router)();
const utils_1 = require("./utils");
router.get('/', (req, res) => res.send('echo'));
router.get('/qrcode', controllers_1.QrcodeController.createQrcode);
router.get('/template', controllers_1.QrcodeController.getComfirmationTemplate);
router.post('/template', controllers_1.QrcodeController.cashierConfirmation);
/**
 * Auth
 */
router.post('/login', controllers_1.AuthController.login);
router.post('/logout', controllers_1.AuthController.logout);
/**
 * Roles
 */
router.get('/roles/:id', utils_1.isAuthenticate, controllers_1.RoleController.role);
router.get('/roles', utils_1.isAuthenticate, controllers_1.RoleController.getRoles);
router.post('/roles', utils_1.isAuthenticate, controllers_1.RoleController.createRole);
router.put('/roles/:id', utils_1.isAuthenticate, controllers_1.RoleController.updateRole);
router.delete('/roles/:id', utils_1.isAuthenticate, controllers_1.RoleController.deleteRole);
/**
 * Role Amount
 */
router.get('/rolesamount/:id', utils_1.isAuthenticate, controllers_1.RoleAmountController.roleAmount);
router.get('/rolesamount', utils_1.isAuthenticate, controllers_1.RoleAmountController.getRolesAmount);
router.post('/rolesamount', utils_1.isAuthenticate, controllers_1.RoleAmountController.createRoleAmount);
router.put('/rolesamount/:id', utils_1.isAuthenticate, controllers_1.RoleAmountController.updateRoleAmount);
router.delete('/rolesamount/:id', utils_1.isAuthenticate, controllers_1.RoleAmountController.deleteRoleAmount);
/**
 * Users
 */
router.get('/users', utils_1.isAuthenticate, controllers_1.UserController.getUsers);
router.get('/users/:id', utils_1.isAuthenticate, controllers_1.UserController.user);
router.get('/users/departement/:department_id', utils_1.isAuthenticate, controllers_1.UserController.getUsersByDepartment);
router.post('/users', utils_1.isAuthenticate, controllers_1.UserController.createUser);
router.put('/users/:id', utils_1.isAuthenticate, controllers_1.UserController.updateUser);
router.delete('/users/:id', utils_1.isAuthenticate, controllers_1.UserController.deleteUser);
/**
 * Offices
 */
router.get('/offices/:id', utils_1.isAuthenticate, controllers_1.OfficeController.office);
router.get('/offices', utils_1.isAuthenticate, controllers_1.OfficeController.getOffices);
router.post('/offices', utils_1.isAuthenticate, controllers_1.OfficeController.createOffice);
router.put('/offices/:id', utils_1.isAuthenticate, controllers_1.OfficeController.updateOffice);
router.delete('/offices/:id', utils_1.isAuthenticate, controllers_1.OfficeController.deleteOffice);
/**
 * Disbursement
 */
router.get('/disbursement/:id', utils_1.isAuthenticate, controllers_1.DisbursementController.getOneDisbursement);
router.get('/disbursement', utils_1.isAuthenticate, controllers_1.DisbursementController.getAllDisbursement);
router.post('/disbursement', utils_1.isAuthenticate, controllers_1.DisbursementController.createDisbursement);
router.put('/disbursement/:id', utils_1.isAuthenticate, controllers_1.DisbursementController.updateDisbursement);
router.delete('/disbursement/:id', utils_1.isAuthenticate, controllers_1.DisbursementController.deleteDisbursement);
/**
 * Disbursement Type
 */
router.get('/disbursement_type/:id', utils_1.isAuthenticate, controllers_1.DisbursementTypeController.disbursementType);
router.get('/disbursement_type', utils_1.isAuthenticate, controllers_1.DisbursementTypeController.getDisbursementTypes);
router.post('/disbursement_type', utils_1.isAuthenticate, controllers_1.DisbursementTypeController.createDisbursementType);
router.put('/disbursement_type/:id', utils_1.isAuthenticate, controllers_1.DisbursementTypeController.updateDisbursementType);
router.delete('/disbursement_type/:id', utils_1.isAuthenticate, controllers_1.DisbursementTypeController.deleteDisbursementType);
/**
 * Disbursement Status
 */
router.get('/disbursement_Status/:id', utils_1.isAuthenticate, controllers_1.DisbursementStatusController.disbursementStatus);
router.get('/disbursement_Status', utils_1.isAuthenticate, controllers_1.DisbursementStatusController.getDisbursementStatuss);
router.post('/disbursement_Status', utils_1.isAuthenticate, controllers_1.DisbursementStatusController.createDisbursementStatus);
router.put('/disbursement_Status/:id', utils_1.isAuthenticate, controllers_1.DisbursementStatusController.updateDisbursementStatus);
router.delete('/disbursement_Status/:id', utils_1.isAuthenticate, controllers_1.DisbursementStatusController.deleteDisbursementStatus);
/**
 * Disbursement Status TimeStamp
 */
router.get('/disbursement_Status_timestamp/:id', utils_1.isAuthenticate, controllers_1.DisbursementStatusTimestampController.disbursementStatusTimeStamp);
router.get('/disbursement_Status_timestamp', utils_1.isAuthenticate, controllers_1.DisbursementStatusTimestampController.getDisbursementStatusTimeStamp);
router.post('/disbursement_Status_timestamp', utils_1.isAuthenticate, controllers_1.DisbursementStatusTimestampController.createDisbursementStatusTimeStamp);
router.put('/disbursement_Status_timestamp/:id', utils_1.isAuthenticate, controllers_1.DisbursementStatusTimestampController.updateDisbursementStatusTimeStamp);
router.delete('/disbursement_Status_timestamp/:id', utils_1.isAuthenticate, controllers_1.DisbursementStatusTimestampController.deleteDisbursementStatusTimeStamp);
/**
 * Department
 */
router.get('/departments/:id', utils_1.isAuthenticate, controllers_1.DepartmentController.department);
router.get('/departments', utils_1.isAuthenticate, controllers_1.DepartmentController.getDepartements);
router.post('/departments', utils_1.isAuthenticate, controllers_1.DepartmentController.createDepartement);
router.put('/departments/:id', utils_1.isAuthenticate, controllers_1.DepartmentController.updateDepartment);
router.delete('/departments/:id', utils_1.isAuthenticate, controllers_1.DepartmentController.deleteDepartment);
/**
 * Beneficiary
 */
router.get('/beneficiary/:id', utils_1.isAuthenticate, controllers_1.BeneficiaryController.oneBeneficiary);
router.get('/beneficiary', utils_1.isAuthenticate, controllers_1.BeneficiaryController.getAllBeneficiaries);
router.post('/beneficiary', utils_1.isAuthenticate, controllers_1.BeneficiaryController.createBeneficiary);
router.put('/beneficiary/:id', utils_1.isAuthenticate, controllers_1.BeneficiaryController.updateBeneficiary);
router.delete('/beneficiary/:id', utils_1.isAuthenticate, controllers_1.BeneficiaryController.deleteBeneficiary);
/**
 * User Role Timestamp
 */
router.get('/user_role_timestamp/:id', utils_1.isAuthenticate, controllers_1.UserRoleTimestampController.getUserRoleTimestamp);
router.get('/user_role_timestamp', utils_1.isAuthenticate, controllers_1.UserRoleTimestampController.getAllUserRoleTimestamp);
router.post('/user_role_timestamp', utils_1.isAuthenticate, controllers_1.UserRoleTimestampController.createUserRoleTimestamp);
router.put('/user_role_timestamp/:id', utils_1.isAuthenticate, controllers_1.UserRoleTimestampController.updateUserRoleTimestamp);
router.delete('/user_role_timestamp/:id', utils_1.isAuthenticate, controllers_1.UserRoleTimestampController.deleteUserRoleTimestamp);
/**
 * Payment Method
 */
router.get('/payment_method/:id', utils_1.isAuthenticate, controllers_1.PaymentMethodController.getPaymentMethodById);
router.get('/payment_method', utils_1.isAuthenticate, controllers_1.PaymentMethodController.getPaymentsMethod);
router.post('/payment_method', utils_1.isAuthenticate, controllers_1.PaymentMethodController.createMethodPayment);
router.put('/payment_method/:id', utils_1.isAuthenticate, controllers_1.PaymentMethodController.updatePaymentMethod);
router.delete('/payment_method/:id', utils_1.isAuthenticate, controllers_1.PaymentMethodController.deletePaymentMethod);
/**
 * Status Name
 */
router.get('/status_name/:id', utils_1.isAuthenticate, controllers_1.StatusNameController.getStatusNameById);
router.get('/status_name', utils_1.isAuthenticate, controllers_1.StatusNameController.getStatusNames);
router.post('/status_name', utils_1.isAuthenticate, controllers_1.StatusNameController.createStatusName);
router.put('/status_name/:id', utils_1.isAuthenticate, controllers_1.StatusNameController.updateStatusName);
router.delete('/status_name/:id', utils_1.isAuthenticate, controllers_1.StatusNameController.deleteStatusName);
/**
 * Company
 */
router.get('/company/:id', utils_1.isAuthenticate, controllers_1.CompanyController.getCompanyById);
router.get('/company', utils_1.isAuthenticate, controllers_1.CompanyController.getAllCompanies);
router.post('/company', utils_1.isAuthenticate, controllers_1.CompanyController.createCompany);
router.put('/company/:id', utils_1.isAuthenticate, controllers_1.CompanyController.updateCompany);
router.delete('/company/:id', utils_1.isAuthenticate, controllers_1.CompanyController.deleteCompany);
exports.default = router;
