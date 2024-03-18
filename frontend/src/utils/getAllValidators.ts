import UsersService from "@/services/allUserService";
import { UserInArrayType, filterAllValidatorsMap, newTranformedValidatorArray } from "./tranformArrays";


export const getAllValidatorsFunction = async () => {

    const userServices = new UsersService (); 
    
    // GETTING ALL USERS TO FILTER THE VALIDATORS ONLY
    const allUsers = await userServices.getAllUsers (); 

    // FILTERING THE USER TO GET ONLY THOSE WITH AMOUNT GREATER THAN 0
    const allValidatorsMap: UserInArrayType = filterAllValidatorsMap (allUsers.data)

    // FORMATING THE IN A USABLE FORMAT FOR THE DECAISSEMENT FORM
    const newTranformedValidators: UserInArrayType = newTranformedValidatorArray (allValidatorsMap)

    return newTranformedValidators; 
}