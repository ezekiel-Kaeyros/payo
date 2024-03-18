import React from 'react'
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
import toast from 'react-hot-toast';
import SettingsService from '@/services/settingsService';
import { isUniqElement } from '@/utils/checkIfUniq';
import FormWrapper from '../FormWrapper';

import whiteTypeDecaissImg from "../../../../../../../../public/iconsSettings/candle.svg"


type DecaissementTypeFormType = {
  headerTitle: string; 
  headerDescription: string; 
  roleValue?: string; 
  value?: string; 
  filled: boolean; 
  status?: string; 
  id?: string;
  action?: string;
  onClose?: any
}

const DecaissementTypeForm: React.FC<DecaissementTypeFormType> = ({ onClose, action, id, headerTitle, status, headerDescription, filled, value }) => {
  
  const {
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting, isSubmitted}, 
    reset, 
    getValues, 
  } = useForm ({
      defaultValues: {
          name: value, 
          active: status === "active" ? true : false
      }
  }); 

    const dispatch = useAppDispatch(); 
    const refresh = useSelector((state: RootState) => state.refreshToggleData.refresh)


  const onSubmitHandler = async (data: FieldValues) => {
    console.log(data)
    const settingsService = new SettingsService (); 
    const getDisbursmentTypes = await settingsService.getDisbursementTypes()
    const isUniqEl = isUniqElement (getDisbursmentTypes.data, data.name)          
    if (action === "add") {
        if (data.status === "") {
            data = {
              ...data, 
              status: "active"
            }
        }
        // console.log(data, data.disbursement_type_id)

        if (isUniqEl === false) {
            toast.success("Ce nom n'existe pas!")
            // return
            const savingDisbursmentType = new SaveSettingsService();
            const result = await savingDisbursmentType.postDisbursementTypes(data)

            if (!result.data) {
                toast.error("Echec modification")
            } else {
                toast.success("Type de Décaissement Cree avec success")
            }
        } else {
            toast.error(`Type de Décaissement "${ data.name }" existe deja!`)
            return
        }
        // const savingDisbursmentType = new SaveSettingsService();
        // await savingDisbursmentType.postDisbursementTypes(data)
    } else if (action === "update") {
        if (isUniqEl === false) {
            toast.success("Ce nom n'existe pas!")
            // return
            const updatingRole = new PutSettingsService();
            const result = await updatingRole.putDisbursementTypes(data, id)

            if (!result.data) {
                toast.error("Echec modification")
            } else {
                toast.success("Type de Décaissement modifié avec success")
            }
        } else {
            toast.error(`Type de Décaissement "${ data.name }" existe deja!`)
            return
        }
        // const updatingRole = new PutSettingsService();
        // await updatingRole.putDisbursementTypes(data, id)
    } else if (action === "delete") {
        const deleteRole = new DeleteSettingsService();
        await deleteRole.deleteDisbursementTypes(id)
    } else {
        console.log("hi")
    }

    dispatch(toggleRefresh(!refresh))
    reset ();
    onClose ()
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
                            // title='Type De Décaissement' 
                            name='name' 
                            placeholder='Entrer un Type de Décaissement'
                            type='text'
                            img={ whiteTypeDecaissImg } 
                            required={ true }
                            flatStyle={ true }
                            readOnly={ action === "view" ? true : false }
                            filled={ filled }
                            // data={ roleValue }
                            register={ register }
                            errors={ errors?.name?.message } 
                            validationMessage="Nom du Type de Décaissement est obligatoire!"
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

export default DecaissementTypeForm