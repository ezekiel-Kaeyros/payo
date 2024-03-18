"use client"; 

import React, { useContext, useEffect, useState } from 'react'
import InputField from '../text-field/InputField'
import SelectField from '../select-field/SelectField'
import TextArea from '../text-area/TextArea'
import { Button } from '../../button/Button'
import ButtonV2 from '../../button/ButtonV2';
import { RootState, store, useAppDispatch } from '../../../../store';
import { clearAllCashoutFormInfo, setAdminValidatorState, setAllCashoutFormInfo, setAmountInWord, setAmountState, setBeneficiaryState, setCashoutNoteState, setDateState, setDecaissementTypeState, setDepartementState, setFinancialValidatorState, setInitiatorState, setInvoiceNumberState, setOfficeState, setPaymentModeState, setSummaryDisplay, setValidatorState } from '../../../../store/slices/decaissementSlice';
import ButtonLinkV2 from '../../button/ButtonLink';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { NumericFormat } from 'react-number-format'
import SettingsService from '@/services/settingsService';
import UsersService from '@/services/allUserService';
import InputFieldV2 from '../text-field/InputFieldV2';
import { convertNumberToFrench } from '@/utils/convertNumberToFrenchAmount';
import { UserInArrayType, filterAllValidatorsMap, getChefDepsGeneric, getUsersGeneric, newTranformedValidatorArray, transforArrayForSelectInputField } from '@/utils/tranformArrays'; 

import uName from "../../../../../../../public/iconsForms/security_user.svg"
import calendatI from "../../../../../../../public/iconsForms/calendar.svg"
import officeI from "../../../../../../../public/iconsSettings/building.svg"
import typeDecI from "../../../../../../../public/iconsForms/document_filter.svg"
import benefI from "../../../../../../../public/iconsForms/building.svg"
import amountI from "../../../../../../../public/iconsSettings/moneys.svg"
import modeDePayI from "../../../../../../../public/iconsSettings/status.svg"
import invoiceI from "../../../../../../../public/iconsSettings/money_change.svg"
import depI from "../../../../../../../public/iconsForms/device_message.svg"
import valiAdminI from "../../../../../../../public/iconsForms/user_octagon.svg"
import chefFinI from "../../../../../../../public/iconsForms/money_recive.svg"
import validatorI from "../../../../../../../public/iconsForms/user_octagon.svg"



type FormDataTypes = {
    initiator: any, 
    office: any, 
    amount: any, 
    invoiceNumber: any, 
    cashoutNote: any, 
    department: any, 
    decaissementType: any, 
    beneficiary: any, 
    payementMode: any, 
    adminValidator: any, 
    financialValidator: any, 
    validator: any, 
    date: any,
    allData: any, 
}

type SingleUserTypes = {
    _id: string,
    role: Array<{}>, 
    department_id: any, 
    email: string,
    office: string, 
    first_name: string,
    last_name: string,
    password: string,
    active: boolean,
    createdAt: string,
    updatedAt: string,
}


const DecaissementForm = ({ dict }: { dict: any }) => {

    const dispatch = useAppDispatch(); 
    const router = useRouter(); 
    const pathname = usePathname();
    const programId = pathname.split("/");

    // USE THIS TO SET DATA IN THE ALREADY FILLED FIELDS
    const [ beneficiary, setBeneficiary ] = useState<[{id: string; value: string, text: string}]> (); 
    const [ cashoutType, setCashoutType ] = useState<[{id: string; value: string, text: string}]> (); 
    const [ paymentType, setPaymentType ] = useState<[{id: string; value: string, text: string}]> (); 

    const [ userInfoLoaded, setUserInfoLoaded ] = useState<SingleUserTypes> ({
        _id: "",
        role: [], 
        department_id: {
            name: "",
        }, 
        email: "",
        office: "", 
        first_name: "",
        last_name: "",
        password: "",
        active: true,
        createdAt: "",
        updatedAt: "",
    })

    const selectedValidator: any = useSelector((state: RootState) => state.cashout.validator); 
    const selectedChefDep: any | undefined = useSelector((state: RootState) => state.cashout.adminValidator); 
    const amount = useSelector((state: RootState) => state.cashout.amount)
    const theStoreNewData: any = useSelector((state: RootState) => state.cashout.allCahsoutInfoData); 
    const [ chefOfDepName, setChefOfDepartement ] = useState<UserInArrayType>()
    const [ userInfoOnNavBar, setUserInfoOnNavBar ] = useState<{first_name: string; last_name: string}> ()
    const [ amountInWordsLocally, setAmountInWordsLocally ] = useState (); 

    const {
        register, 
        handleSubmit, 
        control, 
        formState: { errors, isSubmitting, isSubmitted }, 
        reset, 
        getValues, 
        setValue,
    } = useForm<FormDataTypes> ({
        defaultValues: {
            initiator: `${ userInfoLoaded?.first_name} ${ userInfoLoaded?.last_name }`,
            office: userInfoLoaded?.office, 
            department: userInfoLoaded?.department_id?.name, 
            adminValidator: selectedChefDep ? `${selectedChefDep[0]?.first_name } ${selectedChefDep[0]?.last_name }` : '', 
            financialValidator: selectedValidator[0]?.name ? selectedValidator[0]?.name : 'Ariel Mboma', 
            validator: selectedValidator[0]?.name ? selectedValidator[0]?.name : 'Ariel Mboma', 
        }
    });

    // GET ALL DATA TO FILL THE PREDEFINED FORM FIELDS
    const getAllDataForSettings = async () => {
        const settingsService = new SettingsService (); 
        const userServices = new UsersService (); 

        const getLoggedInUserInfo = localStorage.getItem("user")
        const parseUserInfo = JSON.parse(getLoggedInUserInfo!)
        const getLoggedInOfficeUserInfo = localStorage.getItem("userOffice")
        const parseUserOfficeInfo = JSON.parse(getLoggedInOfficeUserInfo!)

        // const userU: any = JSON.parse(localStorage.getItem('user')!); 
        setUserInfoOnNavBar (parseUserInfo); 

        let getOfficeInfo

        if (parseUserOfficeInfo) {
            getOfficeInfo = await settingsService.getOneOffice(parseUserInfo?.department_id[0]?.office_id); 
        }

        // SET USER INFO LOCALLY FOR LOCAL USE
        setUserInfoLoaded({
            ...userInfoLoaded, 
            role: parseUserInfo?.role[0],
            department_id: parseUserInfo?.department_id[0], 
            first_name: parseUserInfo.first_name,
            last_name: parseUserInfo.last_name,
            office: parseUserOfficeInfo.name || getOfficeInfo.data.name
        })

        // IF GLOBAL STATE VALIDATORS IS EMPTY GET VALIDATORS ELSEWHERE
        if (selectedValidator.length === 0) {
            const geLocalStorageValidators = localStorage.getItem("validators")
            const allUsers = await userServices.getAllUsers (); 
            const getChefDepartement: UserInArrayType = getChefDepsGeneric (allUsers.data, 2, parseUserInfo?.department_id[0]._id) || JSON.parse(geLocalStorageValidators!); 

            setChefOfDepartement (getChefDepartement)
            dispatch(setAdminValidatorState(getChefDepartement))

            const allValidatorsMap: UserInArrayType = filterAllValidatorsMap (allUsers.data)
            const newTranformedValidators: UserInArrayType = newTranformedValidatorArray (allValidatorsMap)
            dispatch(setValidatorState(newTranformedValidators))
            
        } 

        // LOADING BENEFICIARIES FROM SERVER
        // const beneficiaries = await settingsService.getBeneficiary();
        // setBeneficiary (transforArrayForSelectInputField (beneficiaries?.data))
        
        // LOADING PAYMENTS MODES FROM SERVER
        const payementMode = await settingsService.getPaymentMode();
        setPaymentType (transforArrayForSelectInputField (payementMode?.data)); 
        
        // LOADING DISBURSEMENTTYPES FROM SERVER
        const cashoutTypes = await settingsService.getDisbursementTypes();
        setCashoutType (transforArrayForSelectInputField (cashoutTypes?.data))

    }


    useEffect(() => {
        getAllDataForSettings (); 
    }, [])


    // THIS FUNCTION EXECUTES WHEN TYPING THE AMOUNT IN THE AMOUNT FIELD
    const changeValidator = (amount: any) => {

        let validators_result; 
        const geLocalStorageValidators = localStorage.getItem("validators")
        const parseLocalStorageValidatorsors = JSON.parse(geLocalStorageValidators!)
        const validators = parseLocalStorageValidatorsors.map((val: any, i: any) => {
            return {
                id: val._id, 
                name: `${ val.first_name } ${ val.last_name }`, 
                amount: val?.role[0]?.role_amount_id[0]?.amount, 
            }
        })

        const realAmount = parseInt(amount.target.value.split(",").join(""))
        const amountInWords = convertNumberToFrench (realAmount); 

        dispatch(setAmountState(realAmount))
        setAmountInWordsLocally(amountInWords)
        dispatch(setAmountInWord(amountInWords))

        setValue("initiator", userInfoLoaded?.office)
        setValue("office", userInfoLoaded?.office)
        setValue("department", userInfoLoaded?.department_id?.name)
        setValue("adminValidator", selectedChefDep ? `${selectedChefDep[0]?.first_name } ${selectedChefDep[0]?.last_name }` : '')
        setValue("financialValidator", selectedValidator[0]?.name ? selectedValidator[0]?.name : 'Ariel Mboma')
        setValue("validator", theStoreNewData?.validator ? theStoreNewData?.validator : selectedValidator[0]?.name ? selectedValidator[0]?.name : 'Ariel Mboma')

        const sortedValidator = validators.sort((a: any,b: any) => {
            return a.amount - b.amount
        }); 

        validators_result = sortedValidator.filter((element: any) => {
            return element.amount >= realAmount
        }); 

        dispatch(setValidatorState(validators_result))
    }

    const filterBeneficiary = async (data: any) => {
        const settingsService = new SettingsService ();
        const beneficiaries = await settingsService.getBeneficiary(); 
        let filteredBeneficiary = beneficiaries.data.filter((fBene: any) => {
            return data == fBene.disbursement_type_id[0]._id
        })
        setBeneficiary (transforArrayForSelectInputField (filteredBeneficiary))
        return
    }
    


    // HANDLE THE FORM SUBMISSION
    const onSubmitHandler = async (data: FieldValues) => {
        const userU: any = JSON.parse(localStorage.getItem('user')!); 

        // console.log("Llllllllllllll: ", data)
        // return

        // FIX IN THE SELECTED PAYEMENT TYPE BEFORE SUBMITTING
        const findCorrespondingPayementType = paymentType?.find((pay: any, i: any) => {
            return pay.value === data.payementMode; 
        })

        // FIX IN THE SELECTED BENEFICIARY BEFORE SUBMITTING
        const findCorrespondingBeneficiary = beneficiary?.find((pay: any, i: any) => {
            return pay.value === data.beneficiary; 
        })

        // FIX IN THE SELECTED DISBURSMENT TYPE BEFORE SUBMITTING
        const findCorrespondingCashoutType = cashoutType?.find((pay: any, i: any) => {
            return pay.value === data.decaissementType; 
        })

        // GATHERING THE DATA
        data = {
            ...data, 
            initiator: {
                _id: userU._id, 
                name: `${ userInfoLoaded?.first_name} ${ userInfoLoaded?.last_name }`, 
            }, 
            payementMode: findCorrespondingPayementType, 
            beneficiary: findCorrespondingBeneficiary, 
            decaissementType: findCorrespondingCashoutType, 
            amount: amount, 
            validator: selectedValidator[0], 
            adminValidator: selectedChefDep, 
            amountInWords: convertNumberToFrench (amount), 
        }; 

        // DISPATCHING THE SELECTION TO THE GLOBAL STATE
        dispatch(setAllCashoutFormInfo(data));
        // dispatch(clearAllCashoutFormInfo(data as any));
        router.push("/confirmDecaissement");
        // reset (); 
    } 

    useEffect(() => {
        setValue("initiator", theStoreNewData?.initiator)
        setValue("date", theStoreNewData?.date) // reset ease
        setValue("office", theStoreNewData?.office)
        setValue("amount", theStoreNewData?.amount) // reset ease
        setValue("invoiceNumber", theStoreNewData?.invoiceNumber) // reset ease
        setValue("cashoutNote", theStoreNewData?.cashoutNote) // reset ease
        setValue("department", theStoreNewData?.department)
        setValue("decaissementType", theStoreNewData?.decaissementType?.value) // reset
        setValue("beneficiary", theStoreNewData?.beneficiary?.value) // reset
        setValue("payementMode", theStoreNewData?.payementMode?.value) // reset
        setValue("adminValidator", theStoreNewData?.adminValidator)
        setValue("financialValidator", theStoreNewData?.financialValidator)
        setValue("validator", theStoreNewData?.validator)
    }, [ ])

  return (
    <form onSubmit={handleSubmit (onSubmitHandler)} className='flex flex-col gap-y-2'>
        <div className='md:flex md:justify-around md:gap-x-9 md:w-full px-[1rem]'>
            <InputFieldV2 
                flatStyle={false} 
                required={true} 
                name={'initiator'} 
                type={'text'} 
                placeholder={ dict?.page?.decaissement?.initiator } 
                title={ dict?.page?.decaissement?.initiator} 
                readOnly={true}
                data={ `${ userInfoLoaded?.first_name} ${ userInfoLoaded?.last_name }` }
                img={ uName } 
                filled={true} 
                register={ register } 
                errors={ errors?.initiator?.message } 
                validationMessage="Initiateur est obligatoire!"
            />

            <InputField 
                flatStyle={false} 
                required={true} 
                name={'date'} 
                type={'date'} 
                min={new Date().toISOString().split('T')[0]} placeholder='Date' 
                title={ dict?.page?.decaissement?.date } 
                // data={ date.toLocaleDateString('en-CA')}
                img={ calendatI }
                register={ register } 
                errors={ errors?.date?.message } 
                validationMessage="Initiateur est obligatoire!"
            />
        </div>
        <div className='md:flex md:justify-around md:gap-x-9 md:w-full px-[1rem]'>
            <InputFieldV2 
                flatStyle={false} 
                required={true} 
                name={'office'} 
                type={'text'} 
                placeholder={ dict?.page?.decaissement?.subd?.subsidiary} 
                title={ dict?.page?.decaissement?.subd?.subsidiary} 
                readOnly={true}
                data={ userInfoLoaded?.office } 
                img={ calendatI } 
                filled={true} 
                register={ register } 
                errors={ errors?.office?.message } 
                validationMessage="Bureau est obligatoire!"
            />
            <SelectField required={true}
                flatStyle={false}
                title={ dict?.page?.decaissement?.disbursmentT?.DT } 
                options={cashoutType!} 
                // value={ storedCashoutType?.text }
                valueId={ theStoreNewData?.decaissementType?.value }
                name='decaissementType'
                onChangeIt={ filterBeneficiary }
                placeHolder={ dict?.page?.decaissement?.disbursmentT?.CDT }
                img={ typeDecI }
                register={ register } 
                errors={ errors?.decaissementType?.message } 
                validationMessage="Type de Décaissement est obligatoire!"
            />
        </div>
        <div className='md:flex md:justify-around md:gap-x-9 md:w-full px-[1rem]'>
            <SelectField required={true}
                flatStyle={false}
                title={ dict?.page?.decaissement?.benef?.beneficary } 
                options={beneficiary!} 
                // value={ storedBeneficiary?.text }
                valueId={ theStoreNewData?.beneficiary?.value }
                name='beneficiary'
                placeHolder={ dict?.page?.decaissement?.benef?.select }
                img={ benefI }
                register={ register } 
                errors={ errors?.beneficiary?.message } 
                validationMessage="Beneficiare est obligatoire!"
            />

            <InputField 
                flatStyle={false} 
                required={true} 
                name={'amount'} 
                type={'number'} 
                placeholder={ dict?.page?.decaissement?.amt?.amountPlaceHolder } 
                data={ amount ? amount : 0 }
                control={ control }
                title={ dict?.page?.decaissement?.amt?.amount }  
                img={ amountI } 
                register={ register } 
                functionToRun={ changeValidator }
                errors={ errors?.amount?.message } 
                validationMessage={ dict?.page?.decaissement?.amt?.amountValidation }
                validationForMinNumber={0}
                validate={(value: any) => {
                    return value === value.replace(/^0/, "")
                }}
            /> 
        </div>

        <div className='md:flex md:justify-around md:gap-x-8 md:w-full px-[1rem]'>
            <SelectField required={true}
                flatStyle={false}
                title={ dict?.page?.decaissement?.paymentMode?.payment } 
                options={paymentType!} 
                name='payementMode'
                // value={ storedPayementMode?.text }
                valueId={ theStoreNewData?.payementMode?.value }
                placeHolder={ dict?.page?.decaissement?.paymentMode?.payment }
                img={ modeDePayI }
                register={ register } 
                errors={ errors?.payementMode?.message } 
                validationMessage="Mode de paiement est obligatoire!"
            />
            <InputField 
                flatStyle={false} 
                required={false} 
                name={'invoiceNumber'} 
                type={'text'} 
                placeholder={ dict?.page?.decaissement?.invoice } 
                title={ dict?.page?.decaissement?.invoice } 
                img={ invoiceI } 
                register={ register } 
                // errors={ errors?.invoiceNumber?.message } 
                // validationMessage="Numero de facture est obligatoire!"
            /> 
        </div>

        <div className='flex justify-around gap-x-8 w-full px-[1rem]'>
            <TextArea 
                name='cashoutNote' 
                placeholder={ dict?.page?.decaissement?.reason } 
                required={true} 
                register={ register } 
                errors={ errors?.cashoutNote?.message } 
                validationMessage="Commentaire Obligatoire!"
            />
        </div>

        <div className='md:flex md:justify-around md:gap-x-9 md:w-full px-[1rem]'>
            <InputFieldV2 
                flatStyle={false} 
                required={true} 
                name={'department'} 
                type={'text'} 
                placeholder={ dict?.page?.decaissement?.dep?.departmentPH } 
                title={ dict?.page?.decaissement?.dep?.department } 
                readOnly={true}
                data={ userInfoLoaded?.department_id?.name } 
                img={ depI } 
                filled={true} 
                register={ register } 
                errors={ errors?.department?.message } 
                validationMessage="Departement est obligatoire!"
            />
            <InputFieldV2 
                flatStyle={false} 
                required={true} 
                name={'adminValidator'} 
                type={'text'} 
                placeholder='Validateur administratif' 
                title={ dict?.page?.decaissement?.HOD?.headOD } 
                readOnly={true}
                data={ selectedChefDep ? `${selectedChefDep[0]?.first_name } ${selectedChefDep[0]?.last_name }` : '' } 
                img={ valiAdminI } 
                filled={true} 
                register={ register } 
                errors={ errors?.adminValidator?.message } 
                validationMessage="Validateur administratif est obligatoire!"
            />
        </div>

        <div className='md:flex md:justify-around md:gap-x-9 md:w-full px-[1rem]'>
            <InputFieldV2 
                flatStyle={false} 
                required={true} 
                name={'financialValidator'} 
                type={'text'} 
                placeholder='Validateur financier' 
                title={ dict?.page?.decaissement?.fincialChief } 
                readOnly={true}
                data={ selectedValidator[0]?.name ? selectedValidator[0]?.name : 'Ariel Mboma' } 
                img={ chefFinI } 
                filled={true} 
                register={ register } 
                errors={ errors?.financialValidator?.message } 
                validationMessage="Validateur Financier est obligatoire!"
            />

            <InputFieldV2 
                flatStyle={false} 
                required={true} 
                name={'validator'} 
                type={'text'} 
                placeholder='Validateur' 
                title={ dict?.page?.decaissement?.validator } 
                readOnly={true}
                data={ selectedValidator[0]?.name ? selectedValidator[0]?.name : 'Ariel Mboma' } 
                img={ validatorI } 
                filled={true} 
                register={ register } 
                errors={ errors?.validator?.message } 
                validationMessage="Validateur Financier est obligatoire!"
            />
        </div>

        <div className='flex gap-x-9 w-full px-[1rem] mt-[2rem]'>
            <ButtonLinkV2 link='/' classes='bg-decaissementBtn text-decaissementText rounded-xl px-[2rem] p-4' >{ dict?.page?.decaissement?.cancel }</ButtonLinkV2>
            <ButtonV2 
                    icon=''
                    classes='bg-saveDecaissementTxt flex justify-center text-saveDecaissementBg rounded-xl px-[2rem] p-4'
                >
                { dict?.page?.decaissement?.save }
            </ButtonV2>
        </div>

    </form>
  )
}

export default DecaissementForm



