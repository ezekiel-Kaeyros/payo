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

// import CheckBoxField from '../../checkBoxField/CheckBoxField'; 
// import DecaissementTitle from '../../decaissementForm/DecaissementTitle'; 
// import { roleAmountsData, rolesData } from '../../../TablesComponents/data'; 
// import { z } from 'zod'
// import ActifTitleComponent from '../ActifTitleComponent'; 
// import { Switch } from '@nextui-org/react'; 

type RolesFormType = {
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
    }, 
    // {
    //     id: "5", 
    //     text: "Level 5", 
    //     value: "5", 
    // }
]


type RoleFormDataTypes = {
    role_amount_id: any
    level: number
    status_name_id: any, 
    active: boolean, 
    name: string,
}



const RolesForm: React.FC<RolesFormType> = ({ onClose, status_name_id, status_name, level, id, action, role_amount_id, headerTitle, status, headerDescription, filled, roleValue, amountValue }) => {

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
    } = useForm<RoleFormDataTypes> (); 
    
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
        setValue("name", roleValue as string)
        setValue("level", level)
        setValue("status_name_id", status_name_id)
    }, [])

    const onSubmitHandler = async (data: FieldValues) => {
        data['level']= parseInt(data['level'])

        if (selectedStatusNameList.length === 0) {
            toast.error("Selectionnez au moins un status"); 
            return
        }

        data = {
            ...data, 
            role_amount_id: [ data.role_amount_id ], 
            status_name_id: selectedStatusNameList.flat(Infinity)
        }

        if (action === "add") {

            const isUniqEl = isUniqElement (allRoles, data.name)

            const levelUsed = isAnyLevelGreaterThanOne (allRoles, data.level)

            if (levelUsed) {
                toast.error(`Le niveau "${ data.level}" est deja ete assigne a un role. `)
                return
            }            

            if (isUniqEl === false) {
                toast.success("Ce nom n'existe pas!")
                // return
                try {
                    const savingRole = new SaveSettingsService();
                    const result = await savingRole.postRoles(data)

                    if (!result.data) {
                        toast.error("Echec Ajout du role")
                    } else {
                        toast.success("Role Ajoute avec success")
                    }
                } catch (error: any) {
                    console.log("error", error)
                    toast.error(error?.response?.data as any || `${error?.message}. Check your internet Connection`); 
                    return
                      // toast.error("Wrong credentials")
                }
            } else {
                toast.error(`Role "${ data.name }" existe deja!`)
                return
            }
        } else if (action === "update") {
            // return
            try {
                const updatingRole = new PutSettingsService();
                const result = await updatingRole.putRoles(data, id)
                if (!result.data) {
                    toast.error("Echec Ajout du role")
                } else {
                    toast.success("Role Ajoute avec success")
                }
            } catch (error: any) {
                console.log("error", error)
                toast.error(error?.response?.data as any || `${error?.message}. Check your internet Connection`); 
                return;
                  // toast.error("Wrong credentials")
            }
        } else if (action === "delete") {
            const deleteRole = new DeleteSettingsService();
            await deleteRole.deleteRoles(id)
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

    const handleToggleSelection = (index: any, id: any) => {
        console.log("clicked..........", id)
        // Create a copy of the items array
        const updatedItems: any = [...statusNames];
        
        // Modify the state of the specific item
        updatedItems[index]!.selected = !updatedItems[index]?.selected;
        console.log(updatedItems)
        console.log(updatedItems[index]!.selected)

        // Update the state with the modified array
        setStatusNames(updatedItems); 
        if (updatedItems[index]!.selected === false) {
            setSelectedStatusNameList((selectedStatusNameList: any) => selectedStatusNameList.filter((item: any, index: any) => {
                return item !== id
            }));
        } else {
            setSelectedStatusNameList ((selectedStatusNameList: any) => [...selectedStatusNameList, id])
        }
        setRefreshTagsColors ((refreshTagsColors) => !refreshTagsColors)
    }

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
                                // title='Rôles' 
                                name='name' 
                                placeholder='Ecrivez le nom du Rôle'
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
                                validationMessage="Nom du rôle est obligatoire!"
                            />

                            <SelectField required={true}
                                flatStyle={true}
                                // title="Montant du Rôle" 
                                options={removeDuplicatesByProperty(roleAmountsNewData)} 
                                name="role_amount_id"
                                readOnly={ action === "view" ? true : false }
                                placeHolder="Selectionnez un Montant"
                                img={ roleAmountImg }
                                value={ amountValue }
                                valueId={ role_amount_id }
                                onChangeIt={ filterLevels }
                                // onChange={ onRoleChange }
                                filled={ filled }
                                register={ register }
                                errors={ errors?.role_amount_id?.message }
                                validationMessage="Montant pour ce rôle est obligatoire!"
                            />
                        </div>
                        <div className='flex justify-around gap-x-9 w-full'>
                            <SelectField required={true}
                                flatStyle={true}
                                // title="Niveau du Role" 
                                // options={levels} 
                                options={ selectedLevels! }
                                readOnly={ action === "view" ? true : false }
                                name="level"
                                placeHolder="Assigner un Niveau"
                                img={ statusnameImg }
                                value={ level }
                                valueId={ level }
                                // onChange={ onRoleLevelChange }
                                filled={ filled }
                                register={ register }
                                errors={ errors?.role_amount_id?.message }
                                validationMessage="Niveau du Rôle est obligatoire!"
                            />
                            {/* <SelectField required={true}
                                flatStyle={true}
                                // title="Nom de Status" 
                                options={statusNames as any} 
                                readOnly={ action === "view" ? true : false }
                                name="status_name_id"
                                placeHolder="Assigner un Nom de status"
                                img={ statusnameImg }
                                value={ status_name }
                                valueId={ status_name_id }
                                filled={ filled }
                                // onChange={ onStatusNameChange }
                                register={ register }
                                // errors={ errors?.role_amount_id?.message }
                                // validationMessage="Niveau du Role est obligatoire!"
                            /> */}
                        </div>

                        <div className=''>
                            <h2 className='text-selectStatusNameOnRoleForm flex flex-col justify-center'>Selectionnez les noms de status</h2>
                            <div className={`overflow-hidden ${ showMoreStatusNames ? "h-[50px]" : "h-auto" } `}>
                                <div className='grid grid-cols-[repeat(3,minmax(100px,_1fr))] gap-2 '>
                                    {
                                        statusNames?.map((statu: any, index: any) => {
                                            let colorToAdop = "bg-inactiveColorUser"
                                            let textColorToAdop = "text-black"
                                            if (status_name_id) {
                                                status_name_id && status_name_id.forEach((element: any) => {
                                                    console.log("render")
                                                    if (statu.selected === true) {
                                                        colorToAdop = "bg-easeBlue"; 
                                                        textColorToAdop = "text-white"; 
                                                    }
                                                });
                                                
                                            } else {
                                                if (statu.selected === true) {
                                                    colorToAdop = "bg-easeBlue"; 
                                                    textColorToAdop = "text-white"; 
                                                }
                                            }
                                            return (
                                                <span key={statu.id} onClick={ () => handleToggleSelection (index, statu.id) } className={`${colorToAdop} ${ textColorToAdop } flex justify-center items-center rounded-3xl overflow-hidden py-[.5rem] px-[1rem] text-center`}>{ statu.text }</span>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className='flex flex-col justify-center cursor-pointer' onClick={ handleStatusNameDisplayToggle }>
                                <span className='text-center flex justify-center'>Voir plus</span>
                                <FontAwesomeIcon icon={ showMoreStatusNames ? faChevronDown : faChevronUp } style={{ fontSize: "1.5rem" }} />
                            </div>
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

export default RolesForm
































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