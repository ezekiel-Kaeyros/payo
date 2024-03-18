"use client"; 
// import { authService } from "../../services";
import AuthService from "@/services/authService";
import SettingsService from "@/services/settingsService";
import { getAllValidatorsFunction } from "@/utils/getAllValidators";
import Cookies from "js-cookie";
import { setValidatorState } from "../store/slices/decaissementSlice";
import { useAppDispatch } from "../store";
import { useRouter } from "next/navigation";
// import { User } from "../../types/user";

type LoggedInUserType = {
    _id: string,
    role: [
        {
            user: [],
            _id: string,
            role_amount_id: [
                {
                    _id: string,
                    amount: 0,
                    createdAt: string,
                    updatedAt: string,
                }
            ],
            name: string,
            active: true,
            createdAt: string,
            updatedAt: string,
            level: number,
            status_name_id: [
                {
                    _id: string,
                    name: string,
                    active: boolean,
                    createdAt: string,
                    updatedAt: string,
                },
            ]
        }
    ],
    department_id: [
        {
            _id: string,
            office_id: Array<"">,
            user: [],
            name: string,
            active: boolean,
            createdAt: string,
            updatedAt: string,
        }
    ],
    email: string,
    first_name: string,
    last_name: string,
    active: true,
    createdAt: string,
    updatedAt: string,
  }

export const useLogin = () => {
    const router = useRouter(); 
    const login = async (username: string, password: string) => {
    const authService = new AuthService ();
    const credentials = { username, password }
    const user = await authService.login(credentials);
    // const dispatch = useAppDispatch(); 
    if (user) {
        Cookies.set("currentUser", JSON.stringify(user)); 
        localStorage.setItem("token", user.data.token)
        localStorage.setItem("user", JSON.stringify(user?.data?.user)); 

        // INSTANTIATING THE SERVICE CLASS TO GET ACCES TO ITS METHODS
        const settingsService = new SettingsService (); 

        // GET OFFICE OF THE LOGGIN USER
        const getOfficeInfo = await settingsService.getOneOffice(user?.data?.user?.department_id[0]?.office_id[0]); 
        localStorage.setItem("userOffice", JSON.stringify(getOfficeInfo.data)); 

        // FUNCTION TO GET ALL VALIDATORS
        const newTranformedValidators = await getAllValidatorsFunction (); 

        // STORING THEM IN LOCAL STORAGE
        localStorage.setItem("validators", JSON.stringify(newTranformedValidators));

        // STORING THEM IN GLOBAL REDUX STATE
        // dispatch(setValidatorState(newTranformedValidators)); 
        
        // NAVIGATE TO PROTECTED PAGES AND ROUTES
        router.push("/")
    }
    return user as LoggedInUserType;
  };

  return { login };
};