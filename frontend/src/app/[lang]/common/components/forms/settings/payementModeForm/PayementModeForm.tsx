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
import { isUniqElement } from '@/utils/checkIfUniq';
import SettingsService from '@/services/settingsService';
import FormWrapper from '../FormWrapper'; 


import paymentModeImg from "../../../../../../../../public/iconsSettings/money_change.svg"


type PayementModesFormType = {
  headerTitle: string; 
  headerDescription: string; 
  roleValue?: string; 
  value?: string; 
  filled: boolean; 
  active?: string; 
  _id?: string;
  action?: string; 
  onClose?: any;
}

const PaymentModeForm: React.FC<PayementModesFormType> = ({ onClose, action, _id, headerTitle, active, headerDescription, filled, value }) => {
//   console.log("IDIDIDIDI, ", _id)
  const {
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting, isSubmitted}, 
    reset, 
    getValues, 
  } = useForm ({
      defaultValues: {
          name: value, 
          active: active === "active" ? true : false
      }
  });

  const dispatch = useAppDispatch(); 
    const refresh = useSelector((state: RootState) => state.refreshToggleData.refresh)


  const onSubmitHandler = async (data: FieldValues) => {
    // console.log(data, _id)
    // return
    const settingsService = new SettingsService (); 
    const getPayementModes = await settingsService.getPaymentMode()
    const isUniqEl = isUniqElement (getPayementModes.data, data.name)          
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
            try {
                const savingPaymenentMode = new SaveSettingsService();
                const result = await savingPaymenentMode.postPaymentMode(data)
                if (!result.data) {
                    toast.error("Echec modification")
                } else {
                    toast.success("Mode de paiement Cree avec success")
                }
            } catch (error: any) {
                console.log("error", error)
                toast.error(error?.response?.data as any || `${error?.message}. Check your internet Connection`)
                // toast.error("Wrong credentials")
            }

        } else {
            toast.error(`Mode de paiement "${ data.name }" existe deja!`)
            return
        }
        // const savingRole = new SaveSettingsService();
        // await savingRole.postPaymentMode(data)
    } else if (action === "update") {
        if (isUniqEl === false) {
            toast.success("Ce nom n'existe pas!")

            try {
                const updatingRole = new PutSettingsService();
                const result = await updatingRole.putPaymentMode(data, _id)
    
                if (!result.data) {
                    toast.error("Echec modification")
                } else {
                    toast.success("Mode de paiement Modifie avec success")
                }
            } catch (error: any) {
                console.log("error", error)
                toast.error(error?.response?.data as any || `${error?.message}. Check your internet Connection`)
                // toast.error("Wrong credentials")
            }
        } else {
            toast.error(`Mode de paiement "${ data.name }" existe deja!`)
            return
        }
        // const updatingRole = new PutSettingsService();
        // await updatingRole.putPaymentMode(data, _id)
    } else if (action === "delete") {
        const deleteRole = new DeleteSettingsService();
        await deleteRole.deletePaymentMode(_id)
    } else {
        console.log("hi")
    }

    dispatch(toggleRefresh(!refresh)); 
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
                                // title='mode de paiement' 
                                name='name' 
                                placeholder='Entrer un Nom de mode de paiement'
                                type='text'
                                img={ paymentModeImg } 
                                readOnly={ action === "view" ? true : false }
                                required={ true }
                                flatStyle={ true }
                                filled={ filled }
                                // data={ roleValue }
                                register={ register }
                                errors={ errors?.name?.message } 
                                validationMessage="Nom du mode de mode de paiement"
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

export default PaymentModeForm