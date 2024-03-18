"use client"
import React, { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form';
import DecaissementTitle from '../../decaissementForm/DecaissementTitle';
import InputField from '../../text-field/InputField';
import SelectField from '../../select-field/SelectField';
import CheckBoxField from '../../checkBoxField/CheckBoxField';
import ButtonV2 from '../../../button/ButtonV2';
import ThreeDotsLoadingAnimation from '../../../loaders/ThreeDotsLoadingAnimation';
// import DataService from '@/services/dataService';
import SaveSettingsService from '@/services/saveSettingService';
import PutSettingsService from '@/services/updateSettingsService';
import DeleteSettingsService from '@/services/deleteSettingsService';
import { toggleRefresh } from '../../../../../store/slices/refreshSlice';
import { RootState, useAppDispatch } from '../../../../../store';
import { useSelector } from 'react-redux';
import ActifTitleComponent from '../ActifTitleComponent';
import { isUniqElementAmount } from '@/utils/checkIfUniq';
import SettingsService from '@/services/settingsService';
import toast from 'react-hot-toast';
import FormWrapper from '../FormWrapper'; 

import roleAmountImg from "../../../../../../../../public/iconsSettings/moneys.svg"

type RoleAmountFormType = {
  headerTitle: string; 
  headerDescription: string; 
  amountValue?: number; 
  filled: boolean; 
  status?: string;
  id?: string;
  action?: string;
  onClose?: any; 
}

const RoleAmountForm: React.FC<RoleAmountFormType> = ({ onClose, id, action, status, headerTitle, headerDescription, filled, amountValue }) => {


  const dispatch = useAppDispatch(); 
    const refresh = useSelector((state: RootState) => state.refreshToggleData.refresh)

  // console.log("amountValueamountValueamountValue: ", amountValue)

  const {
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting, isSubmitted}, 
    reset, 
    getValues, 
  } = useForm ({
    defaultValues: {
      amount: amountValue, 
      active: status === "active" ? true : false
    }
  });

  // console.log("headerTitleheaderDescriptionfilledamountValue:  ", headerTitle, headerDescription, filled, amountValue)

  const onSubmitHandler = async (data: FieldValues) => {
    console.log(data)    
    const settingsService = new SettingsService (); 
    const getRoleAmounts = await settingsService.getRolesAmounts()
    const isUniqEl = isUniqElementAmount (getRoleAmounts.data, parseInt(data.amount))          
    if (action === "add") {
      if (data.status === "") {
          data = {
            ...data, 
            status: "active"
          }
      }
      console.log(data)
      // return

      if (isUniqEl === false) {
          toast.success("Ce montant n'existe pas!")
          // return
          try {
            const savingRoleAmount = new SaveSettingsService();
            const result = await savingRoleAmount.postRolesAmounts(data)

            if (!result.data) {
                toast.error("Echec modification")
            } else {
                toast.success("Montant Cree avec success")
            }
          } catch (error: any) {
              console.log("error", error)
              toast.error(error?.response?.data as any || `${error?.message}. Check your internet Connection`)
              // toast.error("Wrong credentials")
          }
      } else {
          toast.error(`Le montant "${ data.amount }" existe deja!`)
          return
      }
      // const savingRoleAmount = new SaveSettingsService();
      // await savingRoleAmount.postRolesAmounts(data)
    } else if (action === "update") {
      if (isUniqEl === false) {
        toast.success("Ce montant n'existe pas!")
        // return
        try {
          const updatingRoleAmount = new PutSettingsService();
          const result = await updatingRoleAmount.putRolesAmounts(data, id)

          if (!result.data) {
              toast.error("Echec modification")
          } else {
              toast.success("Montant Modifie avec success")
          }
        } catch (error: any) {
            console.log("error", error)
            toast.error(error?.response?.data as any || `${error?.message}. Check your internet Connection`)
            // toast.error("Wrong credentials")
        }
      } else {
          toast.error(`Le montant "${ data.amount }" existe deja!`)
          return
      }
      // const updatingRoleAmount = new PutSettingsService();
      // await updatingRoleAmount.putRolesAmounts(data, id)
    } else if (action === "delete") {
      const deleteRoleAmount = new DeleteSettingsService();
      await deleteRoleAmount.deleteRolesAmounts(id)
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
                        // title='Montant' 
                        name='amount' 
                        readOnly={ action === "view" ? true : false }
                        placeholder='Entrer le montant'
                        type='number'
                        img={ roleAmountImg } 
                        required={ true }
                        flatStyle={ true }
                        filled={ filled }
                        register={ register }
                        errors={ errors?.amount?.message } 
                        validationMessage="Montant est obligatoire!"
                    />
                    
                </div>

                {/* <div className=''>
                    <ActifTitleComponent />

                    <CheckBoxField 
                      name="active" 
                      register={ register } 
                      // onAction={ handleisRoleAmountActifCheckOnAction } 
                      label="Actif" 
                      
                      checkBoxStyle='yesValidatorYelloColorBg' 
                      forCheckBox='val-checkbox-list'
                      // validationMessage="Actif ou Inactif!" 
                      // errors={ errors?.active?.message }
                        />
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

export default RoleAmountForm