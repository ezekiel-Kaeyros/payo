import React, { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form';
import ButtonV2 from '../../../button/ButtonV2';
import CheckBoxField from '../../checkBoxField/CheckBoxField';
import ThreeDotsLoadingAnimation from '../../../loaders/ThreeDotsLoadingAnimation';
import InputField from '../../text-field/InputField';
import DecaissementTitle from '../../decaissementForm/DecaissementTitle';
import SaveSettingsService from '@/services/saveSettingService';
import SelectField from '../../select-field/SelectField';
import { departments, officeData } from '../../../TablesComponents/data';
import { removeDuplicatesByProperty } from '@/utils/removeDuplicate';
import { RootState, store, useAppDispatch } from '../../../../../store';
import PutSettingsService from '@/services/updateSettingsService';
import DeleteSettingsService from '@/services/deleteSettingsService';
import { toggleRefresh } from '../../../../../store/slices/refreshSlice';
import { useSelector } from 'react-redux';
import ActifTitleComponent from '../ActifTitleComponent';
import SettingsService from '@/services/settingsService';
import { isDepartmentExistForOffice, isUniqElement } from '@/utils/checkIfUniq';
import toast from 'react-hot-toast';
import FormWrapper from '../FormWrapper'; 

import departImg from "../../../../../../../../public/new_assets/newIcons/buildings_2.svg"
import officeImg from "../../../../../../../../public/iconsSettings/building.svg"


type DepartmentFromType = {
    headerTitle: string; 
    headerDescription: string; 
    roleValue?: string; 
    value?: string; 
    filled: boolean; 
    status?: string; 
    id?: string;
    action?: string;
    office?: any;
    officeValue?: string; 
    onClose?: any;
}

const DepartmentFrom: React.FC<DepartmentFromType> = ({ onClose, id, officeValue, office, action, headerTitle, status, headerDescription, filled, value }) => {

    console.log("DEPARTEMENT DATA IS COMING:", id, officeValue, office, action, headerTitle, status, headerDescription, filled, value)
    const {
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting, isSubmitted}, 
        reset, 
        getValues, 
    } = useForm ({
        defaultValues: {
            name: value, 
            office: office, 
            active: status === "active" ? true : false, 
        }
    });

    const dispatch = useAppDispatch(); 
    const refresh = useSelector((state: RootState) => state.refreshToggleData.refresh)

    const allOfficeData = store.getState().officeData; 

    const officeDataNewData = allOfficeData.officeData.map((office: any, index: any) => {
        return {
            id: office._id, 
            value: office._id, 
            text: office.name,
        }
    }); 

    const onSubmitHandler = async (data: FieldValues) => {
        const settingsService = new SettingsService (); 
        const getDepartment = await settingsService.getDepartments(); 
        const getOffice = await settingsService.getOneOffice (data.office_id)
        const selectedOffice = getOffice.data
        const selectedOfficeName = selectedOffice.name; 
        const isUniqOffice = isDepartmentExistForOffice (getDepartment.data, data.name, selectedOfficeName)
        if (data.name === value && selectedOfficeName === officeValue) {
            toast.error(`Le département "${ data.name }" existe deja a ${ selectedOfficeName }`)
            return
        }
        if (action === "add") {
            // const userData = JSON.parse(localStorage.getItem("user"))

            if (data.status === "") {
                data = {
                  ...data, 
                  status: "active", 
                //   user_id: 
                }
            }
            // console.log(data)

            if (isUniqOffice === true) {
                toast.error(`Le département "${ data.name }" existe deja a ${ selectedOfficeName }`)
                return
            } else {
                toast.success(`Le département "${ data.name }" n'existe pas encore pour le bureau de ${ selectedOfficeName }!`)
                // return
                try {
                    const savingDepartment = new SaveSettingsService();
                    const result = await savingDepartment.postDepartments(data)
        
                    if (!result.data) {
                        toast.error("Echec modification"); 
                    } else {
                        toast.success("Département Cree avec success"); 
                    }
                } catch (error: any) {
                    console.log("error", error)
                    toast.error(error?.response?.data as any || `${error?.message}. Check your internet Connection`)
                    // toast.error("Wrong credentials")
                }
            }

        } else if (action === "update") {
            if (isUniqOffice === true) {
                toast.error(`Le département "${ data.name }" existe deja a ${ selectedOfficeName }`)
                return
            } else {
                toast.success(`Le département "${ data.name }" n'existe pas encore pour le bureau de ${ selectedOfficeName }!`)
                // return
                try {
                    const updatingRole = new PutSettingsService();
                    const result = await updatingRole.putDepartments(data, id)
        
                    if (!result.data) {
                        toast.error("Echec modification"); 
                    } else {
                        toast.success("Département Cree avec success"); 
                    }
                } catch (error: any) {
                    console.log("error", error)
                    toast.error(error?.response?.data as any || `${error?.message}. Check your internet Connection`)
                    // toast.error("Wrong credentials")
                }
                
            }
            // const updatingRole = new PutSettingsService();
            // await updatingRole.putDepartments(data, id)
        } else if (action === "delete") {
            const deleteRole = new DeleteSettingsService();
            await deleteRole.deleteDepartments(id)
        } else {
            console.log("hi")
        }
        dispatch(toggleRefresh(!refresh))
        reset ();
        onClose ()
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
                                            // title='Département' 
                                            name='name' 
                                            placeholder='Écrire le nom du Département'
                                            type='text'
                                            img={ departImg } 
                                            required={ true }
                                            // readOnly={ false}
                                            readOnly={ action === "view" ? true : false }
                                            flatStyle={ true }
                                            filled={ filled }
                                            // data={ roleValue }
                                            register={ register }
                                            errors={ errors?.name?.message } 
                                            validationMessage="Nom du Département est obligatoire!"
                                        />

                                        <SelectField required={true}
                                            flatStyle={true}
                                            // title="Bureau" 
                                            options={removeDuplicatesByProperty(officeDataNewData)} 
                                            name="office_id"
                                            readOnly={ action === "view" ? true : false }
                                            placeHolder="Selectionner un département"
                                            // placeHolder="Selectionnez un Bureau pour ce département"
                                            img={ officeImg }
                                            value={ officeValue }
                                            valueId={ office }
                                            // filled={ filled }
                                            register={ register }
                                            // errors={ errors?.office_id?.message }
                                            // validationMessage="Montant pour ce role est obligatoire!"
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

export default DepartmentFrom