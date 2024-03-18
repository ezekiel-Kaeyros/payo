"use client"
import { cashoutTypesData, departments, officeData, roleAmountsData, rolesData } from '../../../common/components/TablesComponents/data'
import ButtonV2 from '../../../common/components/button/ButtonV2'
import CheckBoxField from '../../../common/components/forms/checkBoxField/CheckBoxField'
import DecaissementTitle from '../../../common/components/forms/decaissementForm/DecaissementTitle'
import SelectField from '../../../common/components/forms/select-field/SelectField'
import FormWrapper from '../../../common/components/forms/settings/FormWrapper'
import InputField from '../../../common/components/forms/text-field/InputField'
import ThreeDotsLoadingAnimation from '../../../common/components/loaders/ThreeDotsLoadingAnimation'
import { RootState, store, useAppDispatch } from '../../../store'
import { toggleRefresh } from '../../../store/slices/refreshSlice'
import UsersService from '@/services/allUserService'
import DeleteSettingsService from '@/services/deleteSettingsService'
import SaveSettingsService from '@/services/saveSettingService'
import SettingsService from '@/services/settingsService'
import PutSettingsService from '@/services/updateSettingsService'
import { removeDuplicatesByProperty } from '@/utils/removeDuplicate'
import { transforArrayForSelectInputField } from '@/utils/tranformArrays'
import { Switch } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

import firstNameImg from "../../../../../../public/bestIcons/user.svg"
import emailImg from "../../../../../../public/bestIcons/fi_mail.svg"
import roleImg from "../../../../../../public/bestIcons/tag.svg"
import passwordImg from "../../../../../../public/bestIcons/password.svg"
import officeImg from "../../../../../../public/bestIcons/map.svg"
import departmImg from "../../../../../../public/bestIcons/task.svg"
import { isDepartmentHasChefInOffice, isRoleAlreadyAssignedToUser, isUniqElementById } from '@/utils/checkIfUniq'
import toast from 'react-hot-toast'

type CreateUserComponentType = {
    headerTitle: string; 
    headerDescription: string; 
    allDepartments?: [{
        id: "", 
        value: "", 
        text: "",
    }], 
    allRoles?: [{
        id: "", 
        value: "", 
        text: "",
    }], 
    allOffices?: [{
        id: "", 
        value: "", 
        text: "",
    }], 
    fullname?: string;
    email?: string;
    office?: string | number;
    office_id?: string;
    department?: string | number;
    department_id?: string; 
    role?: string | number;
    active?: boolean;
    filled?: boolean; 
    roleValue?: string; 
    value?: string; 
    status?: string; 
    id?: string;
    action?: string;
    last_name?: string;
    first_name?: string; 
    role_name?: string; 
    onClose?: any;
    department_name?: string; 
}

const CreateUserComponent: React.FC<CreateUserComponentType> = ({ allOffices, allRoles, allDepartments, office_id, office, department_name, last_name, first_name, id, action, role, department_id, headerTitle, headerDescription, role_name,
    email,
    filled, 
    active, onClose }) => {

        // console.log("-----------------", allRoles)
        // return


    const dispatch = useAppDispatch(); 
    const refresh = useSelector((state: RootState) => state.refreshToggleData.refresh)

    const {
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting, isSubmitted}, 
        reset, 
        setValue, 
    } = useForm ({
    });

    useEffect (() => {
        setValue ("first_name", first_name);
        setValue ("last_name", last_name);
        setValue ("email", email);
        setValue ("role", role);
        setValue ("department_id", department_id);
        setValue ("department_name", department_name); 
        setValue ("office_id", office_id); 
        setValue ("active", active); 
      }, [])

    const allDepartementData = store.getState().departementData; 

    const [ departmentsNewData, setDepartmentsNewData ] = useState ([{
        id: "", 
        value: "", 
        text: "",
    }]); 
    const [ rolesDataNewData, setRolesDataNewData ] = useState ([{
        id: "", 
        value: "", 
        text: "",
    }]); 
    const [ officesDataNewData, setOfficesDataNewData ] = useState ([{
        id: "", 
        value: "", 
        text: "",
    }]); 

    // GET DATA VIA REQUEST
    const getAllDataForSettings = async () => {
        const settingsService = new SettingsService ();
        const dep = await settingsService.getDepartments();
        const rol = await settingsService.getRoles(); 
        const offi = await settingsService.getOffices(); 

        setDepartmentsNewData (transforArrayForSelectInputField (dep?.data)); 
        setRolesDataNewData (transforArrayForSelectInputField (rol?.data)); 
        setOfficesDataNewData (transforArrayForSelectInputField (offi?.data)); 
    }

    useEffect(() => {
        getAllDataForSettings (); 
    }, [])

    const [ custumActiveState, setCustumActiveState ] = useState (active)

    const changeActive = () => {
        setCustumActiveState ((custumActiveState) => !custumActiveState)
        // return !active
    }

    const [ allUsers, setAllUsers ] = useState<[{ status_name_id: ""}]> ([{
        status_name_id: ""
    }])

    const getUsersData = async () => {
        const usersService = new UsersService (); 
        const local_users = await usersService.getAllUsers(); 
        setAllUsers (local_users.data)
    }

    useEffect (() => {
        getUsersData ()
    }, [])

    const onSubmitHandler = async (data: FieldValues) => {

        console.log(allUsers)

        // const isRoleAlreadyAssigned = isRoleAlreadyAssignedToUser (allUsers!, data.role); 
        // const isAlreadyDepChefForOffice = isDepartmentHasChefInOffice (allUsers!, data.role, data.department_id, data.office_id); 

        // if (isRoleAlreadyAssigned === true) {
        //     toast.error("Ce niveau validateur a déja été assigne a un utilisateur"); 
        //     return
        // }
        // if (isAlreadyDepChefForOffice === true) {
        //     toast.error("Il existe déja un chef pour ce departement dans cette ville"); 
        //     return
        // }

        if (action === "add") {
            const savingRole = new UsersService();
            try {
                const result = await savingRole.postUser(data)
                console.log("result", result)
            } catch (error: any) {
                console.log("error", error)
                toast.error(error?.response?.data as any || `${error?.message}. Check your internet Connection`)
                // toast.error("Wrong credentials")
            }
        } else if (action === "update") {
            data = {
                active: custumActiveState, 
                email: data.email,
                first_name: data.first_name, 
                last_name: data.last_name, 
                department_id: [data.department_id], 
                office_id: [data.office_id], 
                role: [data.role]
            }
            const updatingUser= new UsersService();

            try {
                const result = await updatingUser.updateUser(data, id)
            } catch (error: any) {
                console.log("error", error)
                toast.error(error?.response?.data as any || `${error?.message}. Check your internet Connection`)
            }
            // return
        } else if (action === "delete") {
            const deleteUser = new UsersService();
            await deleteUser.deleteUser(id)
        } else {
            console.log("hi")
        }

        // return

        dispatch(toggleRefresh(!refresh)); 
        reset ();
        onClose ();
    }

  return (
    <FormWrapper link='/settings' headerTitle={ headerTitle }>
        <form onSubmit={handleSubmit (onSubmitHandler)} className='flex flex-col gap-y-[1rem]'>
            {
                action === "delete" ? 
                    <h2>Souhaitez vous supprimer cet Utilisateur</h2>
                    :
                    <>
                        <div className='lg:flex justify-around gap-x-9 w-full'>
                            <InputField 
                                // title='Prénom' 
                                name='first_name' 
                                placeholder='Prénom'
                                type='text'
                                img={ firstNameImg } 
                                readOnly={ action === "view" ? true : false }
                                required={ true }
                                // readOnly={ false}
                                flatStyle={true} 
                                register={ register } 
                                errors={ errors?.first_name?.message } 
                                validationMessage="Nom du role est obligatoire!"
                            />

                            <InputField 
                                // title='Nom' 
                                name='last_name' 
                                placeholder='Nom'
                                type='text'
                                img={ firstNameImg } 
                                required={ true }
                                // readOnly={ false}
                                readOnly={ action === "view" ? true : false }
                                flatStyle={true} 
                                register={ register } 
                                errors={ errors?.last_name?.message } 
                                validationMessage="Nom du role est obligatoire!"
                            />
                        </div>
                        

                        <div className='flex justify-around gap-x-9 w-full'>
                            <InputField 
                                // title='Courrier électronique' 
                                name='email' 
                                placeholder='Courrier électronique'
                                type='email'
                                img={ emailImg } 
                                required={ true }
                                // readOnly={ false}
                                readOnly={ action === "view" ? true : false }
                                flatStyle={true}
                                register={ register } 
                                errors={ errors?.email?.message } 
                                validationMessage="Email est obligatoire!"
                            />

                            {
                                action === "update" || action === "view"  ?
                                    <SelectField 
                                        // required={true}
                                        flatStyle={true}
                                        // title="Rôle" 
                                        // options={removeDuplicatesByProperty(rolesDataNewData)} 
                                        options={ allRoles! }
                                        name='role'
                                        value={ role_name }
                                        valueId={ role }
                                        readOnly={ action === "view" ? true : false }
                                        // filled={filled}
                                        placeHolder="Selectionnez un Rôle"
                                        img={ roleImg }
                                        register={ register } 
                                        // errors={ errors?.role?.message } 
                                        // validationMessage="Role est obligatoire!"
                                    />
                                    :
                                    ""
                            }

                            {
                                action === "add" ?
                                    <InputField 
                                        // title='Mot de Passe' 
                                        name='password' 
                                        placeholder='Mot de Passe'
                                        type='password'
                                        img={ passwordImg } 
                                        required={ true }
                                        readOnly={ false}
                                        flatStyle={true}
                                        register={ register } 
                                        pwAutoCompleter={ true }
                                        errors={ errors?.password?.message } 
                                        validationMessage="Mot de Passe obligatoire!"
                                    />
                                    :
                                    ""
                            }
                        </div>


                        <div className='flex justify-around gap-x-9 w-full'>
                            <SelectField 
                                required={true}
                                flatStyle={true}
                                // title="Bureau" 
                                // options={removeDuplicatesByProperty(officesDataNewData)} 
                                options={ allOffices! }
                                name='office_id'
                                // filled={filled}
                                value={office}
                                valueId={ office_id }
                                readOnly={ action === "view" ? true : false }
                                placeHolder="Selectionnez un Bureau"
                                img={ officeImg }
                                register={ register } 
                                // errors={ errors?.office?.message } 
                                // validationMessage="Bureau est obligatoire!"
                            />

                            <SelectField 
                                required={true}
                                flatStyle={true}
                                // title="Département" 
                                // options={removeDuplicatesByProperty(departmentsNewData)} 
                                options={ allDepartments! }
                                // name='department'
                                name='department_id'
                                value={department_name}
                                readOnly={ action === "view" ? true : false }
                                valueId={department_id}
                                // filled={filled}
                                placeHolder="Selectionnez un Département"
                                img={ departmImg }
                                register={ register } 
                                // errors={ errors?.department?.message } 
                                // validationMessage="Département est obligatoire!"
                            />

                        </div>

                        <div className={`flex ${ action === "add" ? "flex-start w-1/2 pr-[1rem]" : "justify-around w-full" }  gap-x-9`}>
                            {
                                action === "add" ?
                                    <SelectField 
                                        required={true}
                                        flatStyle={true}
                                        // title="Rôle" 
                                        // options={removeDuplicatesByProperty(rolesDataNewData)} 
                                        options={ allRoles! }
                                        name='role'
                                        value={ role_name }
                                        valueId={ role }
                                        // filled={filled}
                                        placeHolder="Selectionnez un Rôle"
                                        img={ roleImg }
                                        register={ register } 
                                        // errors={ errors?.role?.message } 
                                        // validationMessage="Role est obligatoire!"
                                    />
                                    :
                                    ""
                            }
                        </div>
                    </>
            }
            {
                action === "update" ? 
                    <div className=''>
                        <h3 className="mb-5 text-[1.2rem] text-easeBlue font-bold dark:text-white dark:bg-bgColorDark">Status:</h3>
                        <Switch 
                            defaultSelected 
                            size="lg"
                            color="primary"
                            checked={ active }
                            {...register("active")}
                            onChange={ changeActive }
                        >
                            { custumActiveState ? "Actif" : "Inactif" }
                        </Switch>
                    </div>
                    :
                    ""
            }

            {
                action === "view" ?
                    <>
                        <h3 className='text-[16px]'>Statut</h3>
                        <div className={` ${ active ? "bg-easeBlue" : "bg-inactiveColorUser" } px-[20px] py-[10px] rounded-3xl w-[100px] flex justify-center text-white`}>
                            { active ? "Actif" : "Inactif" }
                        </div>
                    </>
                    :
                    <ButtonV2 
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

export default CreateUserComponent