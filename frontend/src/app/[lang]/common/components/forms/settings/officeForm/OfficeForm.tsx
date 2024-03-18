import React from 'react'
import { FieldValues, useForm } from 'react-hook-form';
import ButtonV2 from '../../../button/ButtonV2';
import ThreeDotsLoadingAnimation from '../../../loaders/ThreeDotsLoadingAnimation';
import CheckBoxField from '../../checkBoxField/CheckBoxField';
import InputField from '../../text-field/InputField';
import DecaissementTitle from '../../decaissementForm/DecaissementTitle';
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

import officeImg from "../../../../../../../../public/iconsSettings/building.svg"


type OfficeFormType = {
  headerTitle: string; 
  headerDescription: string; 
  roleValue?: string; 
  value?: string; 
  filled: boolean; 
  status?: string; 
  id?: string;
  action?: string;
  onClose?: any;
}

const OfficeForm: React.FC<OfficeFormType> = ({ onClose, id, action, headerTitle, status, headerDescription, filled, value }) => {

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
        const getOffices = await settingsService.getOffices()
        const isUniqEl = isUniqElement (getOffices.data, data.name)  
        if (action === "add") {
            data = {
              ...data, 
              status: data.active ? "active" : "rejeter", 
            //   active: data.active
            }

            if (isUniqEl === false) {
                toast.success("Ce nom n'existe pas!")
                
                try {
                    const savingOffice = new SaveSettingsService();
                    const result = await savingOffice.postOffices(data)

                    if (!result.data) {
                        toast.error("Echec creation")
                    } else {
                        toast.success("Bureau Cree avec success")
                    }
                } catch (error: any) {
                    console.log("error", error)
                    toast.error(error?.response?.data as any || `${error?.message}. Check your internet Connection`)
                    // toast.error("Wrong credentials")
                }
            } else {
                toast.error(`Bureau "${ data.name }" existe deja!`)
                return
            }

        } else if (action === "update") {
            if (isUniqEl === false) {
                toast.success("Ce nom n'existe pas!")
                try {
                    const updatingRole = new PutSettingsService();
                    const result = await updatingRole.putOffices(data, id)

                    if (!result.data) {
                        toast.error("Echec modification")
                    } else {
                        toast.success("Bureau Modifie avec success")
                    }
                } catch (error: any) {
                    console.log("error", error)
                    toast.error(error?.response?.data as any || `${error?.message}. Check your internet Connection`)
                    // toast.error("Wrong credentials")
                }
            } else {
                toast.error(`Bureau "${ data.name }" existe deja!`)
                return
            }
        } else if (action === "delete") {
            const deleteRole = new DeleteSettingsService();
            await deleteRole.deleteOffices(id)
        } else {
            console.log("hi")
        }

        dispatch(toggleRefresh(!refresh))
        reset ();
        onClose (); 
    }

  return (
    // <div className='flex justify-center content-center h-full '>
    //     <div className='w-full shadow-lg p-[3rem] rounded-3xl'>
    //         <DecaissementTitle 
    //             link='/settings'
    //             title={headerTitle}
    //         />
    //     </div>
    // </div>
    <FormWrapper link='/settings' headerTitle={ headerTitle }>
        <form onSubmit={handleSubmit (onSubmitHandler)} className='flex flex-col gap-y-[1rem]'>
            {
                action === "delete" ? 
                    <h2>Etes vous sur que voullez supprimer?</h2> 
                    : 
                    <>
                        <div className='flex justify-around gap-x-9 w-full'>
                            <InputField 
                                // title='Bureau' 
                                name='name' 
                                placeholder='Ecrivez le nom de la Ville'
                                type='text'
                                img={ officeImg } 
                                readOnly={ action === "view" ? true : false }
                                required={ true }
                                flatStyle={ true }
                                filled={ filled }
                                // data={ roleValue }
                                register={ register }
                                errors={ errors?.name?.message } 
                                validationMessage="Nom de la Ville est obligatoire!"
                            />
                        </div>

                        {/* <div className=''>
                            <ActifTitleComponent />
                                <CheckBoxField 
                                name="active" 
                                register={ register } 
                                label="Actif" checkBoxStyle='yesValidatorYelloColorBg' 
                                //   validationMessage="Actif ou Inactif!" 
                                //   errors={ errors?.active?.message } 
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

export default OfficeForm