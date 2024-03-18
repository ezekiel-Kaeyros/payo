import React, { useEffect, useState } from 'react'
import ButtonV2 from '../../../button/ButtonV2'
import SelectField from '../../select-field/SelectField'
import InputField from '../../text-field/InputField'
import { FieldValues, useForm } from 'react-hook-form'

import ThreeDotsLoadingAnimation from '../../../loaders/ThreeDotsLoadingAnimation'
import SaveSettingsService from '@/services/saveSettingService'
import PutSettingsService from '@/services/updateSettingsService'
import DeleteSettingsService from '@/services/deleteSettingsService'
import { RootState, store, useAppDispatch } from '../../../../../store'
import { removeDuplicatesByProperty } from '@/utils/removeDuplicate'
import { useSelector } from 'react-redux'
import { toggleRefresh } from '../../../../../store/slices/refreshSlice'
import StatusNameService from '@/services/getAllStatusNameService'
import SettingsService from '@/services/settingsService'; 
import toast from 'react-hot-toast'; 
import { isAnyLevelGreaterThanOne, isUniqElement } from '@/utils/checkIfUniq'
import FormWrapper from '../FormWrapper'

import roleImg from "../../../../../../../../public/white_icons/user.svg"
import roleAmountImg from "../../../../../../../../public/iconsSettings/moneys.svg"
import statusnameImg from "../../../../../../../../public/iconsSettings/status.svg"

import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CompanyService from '@/services/allCompany'

// import CheckBoxField from '../../checkBoxField/CheckBoxField'; 
// import DecaissementTitle from '../../decaissementForm/DecaissementTitle'; 
// import { roleAmountsData, rolesData } from '../../../TablesComponents/data'; 
// import { z } from 'zod'
// import ActifTitleComponent from '../ActifTitleComponent'; 
// import { Switch } from '@nextui-org/react'; 

type CompanyFormType = {
    headerTitle: string; 
    headerDescription: string; 
    roleValue?: string; 
    amountValue?: string | number; 
    role_amount_id?: any; 
    filled: boolean; 
    status?: string; 
    id?: string;
    action?: string;
    onClose?: any; 
    level?: any;
    status_name_id?: any;
    status_name?: any; 
    phoneValue?: number;
    emailValue?: string;
    nameValue?: string;
  

    
}

type LevelsType = Array<{
    id: string, 
    text: string,
    value: string,
    selected?: boolean,
}>

const levels: LevelsType = [
    {
        id: "1", 
        text: "Level 1", 
        value: "1", 
    }, 
    {
        id: "2", 
        text: "Level 2", 
        value: "2", 
    }, 
    {
        id: "3", 
        text: "Level 3", 
        value: "3", 
    }, 
    {
        id: "4", 
        text: "Level 4", 
        value: "4", 
    }
]


type CompanyFormDataTypes = {
    phone: number,
    email: string, 
    name: string,
}



const CompanyForm: React.FC<CompanyFormType> = ({ onClose, status_name_id, phoneValue,emailValue,nameValue, level, id, action, role_amount_id, headerTitle, status, headerDescription, filled, roleValue, amountValue }) => {
 
    const [ singRoleState, setSingleRoleState ] = useState ({
        status_name_id: ""
    });

    const [ allRoles, setAllRoles ] = useState<[{ status_name_id: ""}]> ([{
        status_name_id: ""
    }])

    const getRoleData = async () => {
        const settingsService = new SettingsService (); 
        if (id) {
            const getARole = await settingsService.getOneRoles(id); 
            const roleData = getARole.data
            setSingleRoleState(roleData)
        }
        const local_roles = await settingsService.getRoles(); 
        setAllRoles (local_roles.data)
    }

    const {
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting, isSubmitted}, 
        reset, 
        setValue, 
    } = useForm<CompanyFormDataTypes> (); 
    
    const dispatch = useAppDispatch(); 
    const refresh = useSelector((state: RootState) => state.refreshToggleData.refresh)


    const theStore2 = store.getState().roleAmountData;

    // THIS IS FOR THE SELECT OPTION PRESENT ON THE FORM
    const roleAmountsNewData = theStore2.allRoleAmountData.map((roleAmount, index) => {
        return {
            id: roleAmount._id, 
            value: roleAmount._id, 
            text: roleAmount.amount,
        }
    })

    const statusNameServices = new StatusNameService ();
    const [ statusNames, setStatusNames ] = useState ([]); 
    const [ selectedStatusNameList, setSelectedStatusNameList ] = useState<any> ([])

    const getStatusName = async () => {
        const getUserStatusNames = await statusNameServices.getAllStatusName()
        const transformedStatusName = getUserStatusNames.data.map((status_n: any, index: any) => {
            let selected = false;
            if (status_name_id) {
                setSelectedStatusNameList (status_name_id)
                status_name_id && status_name_id.forEach((element: any) => {
                    console.log("render")
                    if (element === status_n._id) {
                        selected = true; 
                    }
                });
            }
            return {
                id: status_n?._id, 
                text: status_n?.name, 
                value: status_n?._id, 
                selected: selected, 
            }
        })
        setStatusNames (transformedStatusName)
    }

    useEffect (() => {
        getRoleData ()
        getStatusName()
        setValue("name", nameValue as string)
        setValue("email", emailValue as string)
        setValue("phone", phoneValue as number)
    }, [])

    const onSubmitHandler = async (data: FieldValues) => {
        /* console.log(data)
        return */
        //data['level']= parseInt(data['level'])

        

        if (action === "add") {
                      
            try {
                const companyServices = new CompanyService();
                const result = await companyServices.postCompany(data)

                if (!result.data) {
                    toast.error("Echec Ajout de company")
                } else {
                    toast.success("company Ajoute avec success")
                }
            } catch (error: any) {
                console.log("error", error)
                toast.error(error?.response?.data as any || `${error?.message}. Check your internet Connection`); 
                return
                  // toast.error("Wrong credentials")
            }
            
        } else if (action === "update") {
            // return
            try {
                const updateCompany = new CompanyService();
                const result = await updateCompany.updateCompany(data, id)
                if (!result.data) {
                    toast.error("Echec Ajout company")
                } else {
                    toast.success("Company Ajoute avec success")
                }
            } catch (error: any) {
                console.log("error", error)
                toast.error(error?.response?.data as any || `${error?.message}. Check your internet Connection`); 
                return;
                  // toast.error("Wrong credentials")
            }
        } else if (action === "delete") {
            const deleteCompany = new CompanyService();
            await deleteCompany.deleteCompany(id)
        } else {
            console.log("hi")
        }
        dispatch(toggleRefresh(!refresh)); 
        reset ();
        onClose (); 
    }

    const [ selectedLevels, setSelectedLevels ] = useState<LevelsType> ()

    const filterLevels = async (data: any) => {
        const settingsService = new SettingsService ();
        const roleAmounts = await settingsService.getRolesAmounts(); 
        
        let filteredRoleAmount = roleAmounts.data.filter((rolAmount: any) => {
            return rolAmount._id === data
        })
        let filteredLevels = levels.filter((lev: any) => {
            if (filteredRoleAmount[0]?.amount === 0) {
                return parseInt(lev.value) > 1
            } else if (filteredRoleAmount[0]?.amount > 0) {
                return parseInt(lev.value) === 1
            }
        })
        setSelectedLevels (filteredLevels)
        return
    }

    const [ showMoreStatusNames, setShowMoreStatusName ] = useState (false)

    const handleStatusNameDisplayToggle = () => {
        setShowMoreStatusName ((showMoreStatusNames) => !showMoreStatusNames)
    }

    const [ refreshTagsColors, setRefreshTagsColors ] = useState (false)
    
    useEffect (() => {
        console.log("tag modified")
    }, [ refreshTagsColors ])

    

    console.log(">>>>>>", removeDuplicatesByProperty(selectedStatusNameList))

  return (
    <FormWrapper link='/settings' headerTitle={ headerTitle }>
        <form onSubmit={handleSubmit (onSubmitHandler)} className='flex flex-col gap-y-[1rem]'>
            {
                action === "delete" ? 
                    <h2>Etes vous sur que voullez supprimer?</h2> 
                    : 
                    <>
                        <div className='flex justify-around gap-x-9 w-full'>
                            <InputField  
                                name='name' 
                                placeholder='Ecrivez le nom de la company'
                                type='text'
                                readOnly={ action === "view" ? true : false }
                                img={ roleImg } 
                                required={ true }
                                flatStyle={ true }
                                filled={ filled }
                                data={ roleValue }
                                register={ register } 
                      
                              
                                // onChange= {  }
                                errors={ errors?.name?.message } 
                                validationMessage="Nom de company est obligatoire!"
                            />

                                <InputField 
                                name='email' 
                                placeholder='Ecrivez le email de la company'
                                type='text'
                                readOnly={ action === "view" ? true : false }
                                img={ roleImg } 
                                required={ true }
                                flatStyle={ true }
                                filled={ filled }
                                data={ roleValue }
                                register={ register } 
                                valuePattern = '/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/'
                                // onChange= {  }
                                errors={ errors?.email?.message } 
                                validationMessage="Email de company est obligatoire!"
                            />
                        </div>
                        <div className='flex justify-around gap-x-9 w-full'>
                        <InputField  
                                name='phone' 
                                placeholder='Ecrivez le phone de la company'
                                type='text'
                                readOnly={ action === "view" ? true : false }
                                img={ roleImg } 
                                required={ true }
                                flatStyle={ true }
                                filled={ filled }
                                data={ roleValue }
                                register={ register } 
                               /*  maxLength = {9}
                                minLength={9} */
                                message1='Taille trop petite'
                              
                                // onChange= {  }
                                errors={ errors?.phone?.message } 
                                validationMessage="Phone de company est obligatoire!"
                            />
                           
                        </div>

                       
                    </>
            }

            {
                action === "view" ?
                ""
                :
                <ButtonV2 
                    disabled={ isSubmitting }
                    icon=''
                    classes='w-full flex justify-center bg-easeBlue text-white rounded-lg p-4'
                    
                >
                    {
                        isSubmitting === true ? 
                            <div className="py-2">
                                <ThreeDotsLoadingAnimation color="white" />
                            </div>
                            :
                            <>{ headerDescription }</>
                    }
                </ButtonV2>

            }

        </form>
    </FormWrapper>
  )
}

export default CompanyForm
































// if (action === "add") {
//     // CHECK WHETHER THE NAME ENTERED DOES NOT EXIST ALREADY IN THE EXISTING DATA
//     // const nameExists = allRoles.find((rol: any) => {
//     //     console.log(rol.name, data.name)
//     //     return rol.name.toLowerCase() === data.name.toLowerCase()
//     // })

//     // console.log("data: ", data.level)

//     const isUniqEl = isUniqElement (allRoles, data.name)

//     const levelUsed = isAnyLevelGreaterThanOne (allRoles, data.level)

//     // console.log("/././././: ", levelUsed)
//     // return

//     // const levelAlreadyAssigned: any = allRoles.find((rol: any) => {
//     //     console.log(rol.name, data.name)
        
//     //     return rol.level === data.level
//     // })

//     // console.log("levelAlreadyAssigned: ", levelAlreadyAssigned)

//     if (levelUsed) {
//         toast.error(`Le niveau "${ data.level}" est deja ete assigne a un role. `)
//         return
//     }

    

//     if (isUniqEl === false) {
//         toast.success("Ce nom n'existe pas!")
//         // return
//         const savingRole = new SaveSettingsService();
//         const result = await savingRole.postRoles(data)

//         if (!result.data) {
//             toast.error("Echec modification")
//         } else {
//             toast.success("Role Modifie avec success")
//         }
//     } else {
//         toast.error(`Role "${ data.name }" existe deja!`)
//         return
//     }
// } 