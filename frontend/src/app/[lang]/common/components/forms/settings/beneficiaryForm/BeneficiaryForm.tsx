import React, { useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form';
import DecaissementTitle from '../../decaissementForm/DecaissementTitle';
import InputField from '../../text-field/InputField';
import SelectField from '../../select-field/SelectField';
import CheckBoxField from '../../checkBoxField/CheckBoxField';
import ButtonV2 from '../../../button/ButtonV2';
import ThreeDotsLoadingAnimation from '../../../loaders/ThreeDotsLoadingAnimation';
import { cashoutTypesData } from '../../../TablesComponents/data';
import { RootState, store, useAppDispatch } from '../../../../../store';
import { removeDuplicatesByProperty } from '@/utils/removeDuplicate';
import SaveSettingsService from '@/services/saveSettingService';
import PutSettingsService from '@/services/updateSettingsService';
import DeleteSettingsService from '@/services/deleteSettingsService';
import { useSelector } from 'react-redux';
import { toggleRefresh } from '../../../../../store/slices/refreshSlice';
import ActifTitleComponent from '../ActifTitleComponent';
import toast from 'react-hot-toast';
import { isUniqElement } from '@/utils/checkIfUniq';
import SettingsService from '@/services/settingsService';
import FormWrapper from '../FormWrapper'; 

import bluebeneImg from "../../../../../../../../public/iconsSettings/people.svg"
import whiteTypeDecaissImg from "../../../../../../../../public/iconsSettings/candle.svg"

type BeneficiaryFormType = {
  headerTitle: string; 
  headerDescription: string; 
  beneficiaryValue: string; 
  disbursement_type_id?: string | number; 
  cashoutType?: string;
  filled: boolean; 
  status?: boolean;
  id?: string;
  action?: string;
  onClose?: any;
}; 

const BeneficiaryForm: React.FC<BeneficiaryFormType> = ({ onClose, id, action, cashoutType, disbursement_type_id, beneficiaryValue, status, headerTitle, headerDescription, filled }) => {

  const {
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting, isSubmitted}, 
    reset, 
    setValue, 
  } = useForm ({
  });

  const theStore2 = store.getState().cashoutTypeData;

  const cashoutTypesNewData = theStore2.allTypeCashoutData.map((cashout, index) => {
    return {
        id: cashout._id, 
        value: cashout._id, 
        text: cashout.name,
    }
  })

  const dispatch = useAppDispatch(); 
  const refresh = useSelector((state: RootState) => state.refreshToggleData.refresh)

  const onSubmitHandler = async (data: FieldValues) => {
    const settingsService = new SettingsService (); 
    const getBeneficiaries = await settingsService.getBeneficiary()
    const isUniqEl = isUniqElement (getBeneficiaries.data, data.name)          
    if (action === "add") {
      if (data.status === "") {
        data = {
          ...data, 
          status: "active"
        }
      }

      if (isUniqEl === false) {
          toast.success("Ce nom n'existe pas!")
          // return
          try {
            const savingBeneficiary = new SaveSettingsService();
            const result = await savingBeneficiary.postBeneficiary(data)

            if (!result.data) {
                toast.error("Echec modification")
            } else {
                toast.success("Beneficaire Cree avec success")
            }
          } catch (error: any) {
              console.log("error", error)
              toast.error(error?.response?.data as any || `${error?.message}. Check your internet Connection`)
              // toast.error("Wrong credentials")
          }
          
      } else {
          toast.error(`Beneficaire "${ data.name }" existe deja!`)
          return
      }
      // return
      // const savingBeneficiary = new SaveSettingsService();
      // await savingBeneficiary.postBeneficiary(data)
    } else if (action === "update") {
        if (isUniqEl === false) {
          toast.success("Ce nom n'existe pas!")
          // return
          
          try {
            const updatingBeneficiary = new PutSettingsService();
            const result = await updatingBeneficiary.putBeneficiary(data, id)

            if (!result.data) {
                toast.error("Echec modification")
            } else {
                toast.success("Beneficaire Modife avec success")
            }
          } catch (error: any) {
              console.log("error", error)
              toast.error(error?.response?.data as any || `${error?.message}. Check your internet Connection`)
              // toast.error("Wrong credentials")
          }
        } else {
            toast.error(`Beneficaire "${ data.name }" existe deja!`)
            return
        }
        // const updatingBeneficiary = new PutSettingsService();
        // await updatingBeneficiary.putBeneficiary(data, id)
    } else if (action === "delete") {
        const deleteBeneficiary = new DeleteSettingsService();
        await deleteBeneficiary.deleteBeneficiary(id)
        toast.success("Beneficaire Supprime avec success")
    } else {
        console.log("hi")
    }
    await new Promise((resolve: any) => setTimeout(resolve, 10000))

    dispatch(toggleRefresh(!refresh))
    reset ();
    onClose ()
  }

  useEffect (() => {
    setValue ("name", beneficiaryValue);
    setValue ("disbursement_type_id", disbursement_type_id);
    setValue ("status", status);
  }, [])

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
                      // title='Bénéficiaire' 
                      name='name' 
                      placeholder='Entrer le nom du Bénéficiaire'
                      type='text'
                      img={ bluebeneImg } 
                      required={ true }
                      readOnly={ action === "view" ? true : false }
                      flatStyle={ true }
                      filled={ filled }
                      register={ register }
                      errors={ errors?.name?.message } 
                      validationMessage="Nom du Bénéficiaire est obligatoire!"
                  />

                  <SelectField required={true}
                      flatStyle={true}
                      // title="Type de Décaissement" 
                      options={removeDuplicatesByProperty(cashoutTypesNewData)} 
                      name="disbursement_type_id"
                      placeHolder="Selectionnez un Type de Décaissement"
                      img={ whiteTypeDecaissImg }
                      // value={ cashoutType }
                      valueId={ disbursement_type_id }
                      readOnly={ action === "view" ? true : false }
                      // filled={ filled }
                      register={ register }
                      errors={ errors?.disbursement_type_id?.message }
                      validationMessage="Type de Décaissement est obligatoire!"
                  />
              </div>
            </>
        }

        {
          action === "view"   ? 
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

export default BeneficiaryForm