import React, { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form';
import ButtonV2 from '../../../button/ButtonV2';
import CheckBoxField from '../../checkBoxField/CheckBoxField';
import InputField from '../../text-field/InputField';
import DecaissementTitle from '../../decaissementForm/DecaissementTitle';
import ThreeDotsLoadingAnimation from '../../../loaders/ThreeDotsLoadingAnimation';
import SaveSettingsService from '@/services/saveSettingService';
import PutSettingsService from '@/services/updateSettingsService';
import DeleteSettingsService from '@/services/deleteSettingsService';
import { RootState, useAppDispatch } from '../../../../../store';
import { useSelector } from 'react-redux';
import { toggleRefresh } from '../../../../../store/slices/refreshSlice';
import ActifTitleComponent from '../ActifTitleComponent';
import { isUniqElement } from '@/utils/checkIfUniq';
import SettingsService from '@/services/settingsService';
import toast from 'react-hot-toast';
import FormWrapper from '../FormWrapper';

import statusnameImg from "../../../../../../../../public/iconsSettings/status.svg"
import SelectField from '../../select-field/SelectField'; 


type StatusNameFormType = {
  headerTitle: string; 
  headerDescription: string; 
  roleValue?: string; 
  value?: string; 
  filled: boolean; 
  active?: string; 
  _id?: string;
  action?: string;
  onClose?: any;
  flag?: number;
}

type TypeStatusLevel = {
    id: string, 
    text: string,
    value: string,
    selected?: boolean,
}

type SatatusLevelsType = Array<TypeStatusLevel>

const statusLevels: SatatusLevelsType = [
    {
        id: "0", 
        text: "0=(Aucun status)", 
        value: "0", 
    }, 
    {
        id: "1", 
        text: "1=(Valider/Ok/Accepter)", 
        value: "1", 
    }, 
    {
        id: "2", 
        text: "2=(Reject/Rejeter/Invalider)", 
        value: "2", 
    }, 
    {
        id: "3", 
        text: "3=(Pending/En attente/On hold/Waiting)", 
        value: "3", 
    }
]

const StatusNameForm: React.FC<StatusNameFormType> = ({ onClose, flag, action, _id, headerTitle, active, headerDescription, filled, value }) => {
  
    const {
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting, isSubmitted}, 
        reset, 
        getValues, 
    } = useForm ({
        defaultValues: {
            name: value, 
            flag: flag ? flag : 0, 
            active: active === "active" ? true : false, 
        }
    });

    const dispatch = useAppDispatch(); 
    const refresh = useSelector((state: RootState) => state.refreshToggleData.refresh)

    const [ allRoles, setAllRoles ] = useState<[{ name: ""}]> ([{
        name: ""
    }])

    // const getStatusName = async () => {
    //     const settingsService = new SettingsService (); 
    //     const local_roles = await settingsService.getRoles(); 
    //     setAllRoles (local_roles.data)
    // }


  const onSubmitHandler = async (data: FieldValues) => {
    console.log(data)
    if (action === "add") {
        if (data.status === "") {
            data = {
              ...data, 
              status: "active"
            }
        }
        const settingsService = new SettingsService (); 
        const getStatusName = await settingsService.getStatusName()
        const isUniqEl = isUniqElement (getStatusName.data, data.name)          

        if (isUniqEl === false) {
            toast.success("Ce nom n'existe pas!")
            // return
            try {
                const savingStatusName = new SaveSettingsService();
                const result = await savingStatusName.postStatusName(data)

                if (!result.data) {
                    toast.error("Echec modification")
                } else {
                    toast.success("Nom de Status Cree avec success")
                }
            } catch (error: any) {
                console.log("error", error)
                toast.error(error?.response?.data as any || `${error?.message}. Check your internet Connection`)
                  // toast.error("Wrong credentials")
            }
        } else {
            toast.error(`Nom de Status "${ data.name }" existe deja!`)
            return
        }

    } else if (action === "update") {
        
        try {
            const updatingRole = new PutSettingsService();

            // console.log("datadata: ", data)
            // return

            const result = await updatingRole.putStatusName(data, _id)
            if (!result.data) {
                toast.error("Echec modification")
            } else {
                toast.success("Nom de Status Modifie avec success")
            }
        } catch (error: any) {
            console.log("error", error)
            toast.error(error?.response?.data as any || `${error?.message}. Check your internet Connection`)
              // toast.error("Wrong credentials")
        }
    } else if (action === "delete") {
        const deleteRole = new DeleteSettingsService();
        await deleteRole.deleteStatusName(_id)
    } else {
        console.log("hi")
    }

    dispatch(toggleRefresh(!refresh)); 
    reset ();
    onClose (); 
  }

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
                                // title='Nom de Status' 
                                name='name' 
                                readOnly={ action === "view" ? true : false }
                                placeholder='Entrer un Nom de Status'
                                type='text'
                                img={ statusnameImg } 
                                required={ true }
                                flatStyle={ true }
                                filled={ filled }
                                // data={ roleValue }
                                register={ register }
                                errors={ errors?.name?.message } 
                                validationMessage="Nom de Status est obligatoire!"
                            />
                            <SelectField required={true}
                                flatStyle={true}
                                // title="Montant du Rôle" 
                                options={ statusLevels } 
                                name="flag"
                                readOnly={ action === "view" ? true : false }
                                placeHolder="Assignez un Identificateur"
                                img={ statusnameImg }
                                value={ flag }
                                valueId={ flag }
                                // onChangeIt={ filterLevels }
                                // onChange={ onRoleChange }
                                filled={ filled }
                                register={ register }
                                errors={ errors?.flag?.message }
                                validationMessage="Identificateur est obligatoire!"
                            />
                        </div>

                        {/* <div className=''>
                            <ActifTitleComponent />
                            
                            <CheckBoxField 
                                name="active" 
                            //   errors={ errors?.active?.message } 
                            //   validationMessage="Actif ou Inactif!" 
                                register={ register } 
                                label="Actif" checkBoxStyle='yesValidatorYelloColorBg' 
                                forCheckBox='val-checkbox-list' />
                        </div> */}
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

export default StatusNameForm