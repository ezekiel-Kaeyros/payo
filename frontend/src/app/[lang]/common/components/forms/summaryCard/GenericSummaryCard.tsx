"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react';
import ButtonV2 from '../../button/ButtonV2';
import { RootState, useAppDispatch } from '../../../../store';
import { setSummaryDisplay } from '../../../../store/slices/decaissementSlice';
import ButtonLinkV2 from '../../button/ButtonLink';
import SummaryFieldRow from './summaryFields/summaryFieldRow/SummaryFieldRow';
import SummaryTopSection from './summaryFields/summaryTopSection/SummaryTopSection';
import SummarryStepper from './summarryStepper/SummarryStepper';
import RejectionNoteComp from '../rejectionNote/RejectionNoteComp';
import SaveDisbursementStatusService from '@/services/disbursmentStatusServices';
import { useSelector } from 'react-redux';

// import uName from "../../../../../../../public/white_icons/user.svg"
// import calendatI from "../../../../../../../public/new_assets/form/calendar.png"
// // import benefI from "../../../../../../../public/iconsSettings/people.svg"
// import typeDecI from "../../../../../../../public/new_assets/login_page/usernameIcon.png"
// // import amountI from "../../../../../../../public/iconsSettings/moneys.svg"
// import modeDePayI from "../../../../../../../public/iconsSettings/status.svg"
// import invoiceI from "../../../../../../../public/iconsSettings/money_change.svg"
// import depI from "../../../../../../../public/new_assets/newIcons/buildings_2.svg"
// import valiAdminI from "../../../../../../../public/new_assets/form/cod.png"
// import chefFinI from "../../../../../../../public/new_assets/form/cfo.png"
// import validatorI from "../../../../../../../public/new_assets/form/cfos.png"

import modeDePayI from "../../../../../../../public/iconsSettings/money_change.svg"
import officeI from "../../../../../../../public/iconsSettings/building.svg"

import chefDepI from "../../../../../../../public/iconsSettings/moneys.svg"
import chefFinI from "../../../../../../../public/iconsSettings/people.svg"

import amountInLetI from "../../../../../../../public/iconsSettings/status.svg"
import motifDeDecI from "../../../../../../../public/iconsSettings/candle.svg"
import SettingsService from '@/services/settingsService';
import ViewRejectionNoteComp from '../rejectionNote/ViewRejectionNoteComp';
import { togglePDFDesignStyle, toggleShowRejectionNote } from '@/app/[lang]/store/slices/refreshSlice';
import { useOutsideClick } from '@/app/[lang]/hooks/useClickOutsideV2';


type GenericSummaryData = {
    id: number, 
    fullName: string; 
    phoneNumber: string; 
    inputationNumber: string; 
    date: string; 
    amount: string; 
    paymentType: string; 
    office: string; 
    chefOfDepName: string; 
    amountInWords: string; 
    financialChefName: string; 
    theCashier: string; 
    cashouNote: string; 
    children?: any;
    chefDepValidationSatus: string, 
    cfoValidationStatus: string, 
    validatorStatus: string, 
    initiator_status: string, 
    toggleBtn1?: boolean;
    toggleBtn2?: boolean; 
    classes: string; 
    classes2: string; 
    link?: string; 
    label?: string; 
    label2: string; 
    passedFunction?: any; 
    secondPassedFunction?: any; 
    showTracking: boolean;
    showButton?: boolean; 
    functionToExcAfterConfirmRejection?: any;
    functionToExcAfterConfirmValidation?: any;
    user_id?: string, 
    level?: string, 
    statusNameAccept?: any;
    statusIDAccept?: any;
    statusNameReject?: any;
    statusIDReject?: any;
    inCashoutTable?: any;
    onClose?: any; 
    chefDepValidationTime?: any; 
    cfoValidationTime?: any; 
    validatorTime?: any; 
    initiator_Time?: any; 
    specifiedZIndex?: string;
    reason?: string; 
    refDiv?: any; 
    displayQRCodeConfimr?: boolean; 
    handleQRCodeHide?: any;
    // pendingStatusNameForSuperValidator?: any;
    // pendingStatusNameForChefDepartment?: any;
    // pendingStatusNameForCaissiere?: any;
    // pendingStatusNameForInitiator?: any;

    // rejectStatusNameForChefDepartment?: any;
    // rejectStatusNameForSuperValidator?: any;
    // rejectStatusNameForCaissiere?: any;
    // rejectStatusNameForInitiator?: any;

    // validateStatusNameForChefDepartment?: any;
    // validateStatusNameForCFO?: any;
    // validateStatusNameForCaissiere?: any;
    // validateStatusNameForInitiator?: any;
    // showConfirmWindow?: boolean; 
}

const GenericSummaryCard: React.FC<GenericSummaryData> = ({ 
    id, 
    fullName, 
    phoneNumber, 
    inputationNumber, 
    date, 
    amount, 
    paymentType, 
    office, 
    chefOfDepName, 
    amountInWords, 
    financialChefName, 
    theCashier, 
    cashouNote, 
    children, 
    chefDepValidationSatus, 
    cfoValidationStatus, 
    validatorStatus, 
    initiator_status, 
    toggleBtn1, 
    toggleBtn2, 
    classes, 
    classes2, 
    link, 
    label, 
    label2, 
    passedFunction, 
    secondPassedFunction, 
    showTracking, 
    showButton, 
    functionToExcAfterConfirmRejection, 
    functionToExcAfterConfirmValidation,
    user_id, 
    level, 
    statusNameAccept, 
    statusIDAccept, 
    statusNameReject, 
    statusIDReject, 
    inCashoutTable,
    onClose, 
    chefDepValidationTime, 
    cfoValidationTime, 
    validatorTime, 
    specifiedZIndex, 
    initiator_Time, 
    reason, 
    refDiv, 
    displayQRCodeConfimr, 
    handleQRCodeHide, 
    // pendingStatusNameForSuperValidator, 
    // pendingStatusNameForChefDepartment, 
    // pendingStatusNameForCaissiere, 
    // pendingStatusNameForInitiator, 
    // rejectStatusNameForChefDepartment, 
    // rejectStatusNameForSuperValidator, 
    // rejectStatusNameForCaissiere, 
    // rejectStatusNameForInitiator, 
    // validateStatusNameForChefDepartment, 
    // validateStatusNameForCFO, 
    // validateStatusNameForCaissiere, 
    // validateStatusNameForInitiator, 
    // showConfirmWindow, 
}) => {

    // console.log ("---------[[[[[[[[", pendingStatusNameForSuperValidator, 
    // pendingStatusNameForChefDepartment, 
    // pendingStatusNameForCaissiere, 
    // pendingStatusNameForInitiator, 
    // rejectStatusNameForChefDepartment, 
    // rejectStatusNameForSuperValidator, 
    // rejectStatusNameForCaissiere, 
    // rejectStatusNameForInitiator, 
    // validateStatusNameForChefDepartment, 
    // validateStatusNameForCFO, 
    // validateStatusNameForCaissiere, 
    // validateStatusNameForInitiator, )
    // return;

    const disbursmentStatus = {
        user_id: [user_id], 
    }

    const [ officeName, setOfficeName ] = useState ("")
    const showRejectionNote = useSelector((state: RootState) => state.refreshToggleData.showRejectionNote); 
    const changePDFDesignStyle = useSelector((state: RootState) => state.refreshToggleData.changePDFDesignStyle); 
    const getOfficeInfo = async () => {
        const settingsService = new SettingsService (); 
        const getOfficeInfo = await settingsService.getOneOffice(office); 
        const officeData = getOfficeInfo.data; 
        setOfficeName (officeData?.name !== "CastError" ? officeData?.name : officeData?.value)
        // TO DO: FIX GET ONE OFFICE IN SUMMARY COMPONENT
    }

    const firstLine =  [
        {
            img: modeDePayI, 
            label: "Type de Paiement",
            data: paymentType, 
        }, 
        {
            img: officeI, 
            label: "Filiale",
            data: officeName, 
        }
    ]

    const secondLine = [
        {
            img: chefDepI, 
            label: "Chef de Département",
            data: chefOfDepName, 
        }, 
        {
            img: amountInLetI, 
            label: "Montant en Lettre",
            data: `${amountInWords.charAt(0).toLocaleUpperCase() + amountInWords.slice(1)} FCFA`, 
        }
    ]

    const thirdLine = [
        {
            img: chefFinI , 
            label: "Chef Financier",
            data: financialChefName, 
        }, 
        {
            img: motifDeDecI, 
            label: "Motif de Décaissement",
            data: cashouNote, 
        }
    ]

    const allData = [ firstLine, secondLine, thirdLine ]

    const [ showRejectionWindow, setShowRejectionWindow ] = useState (false); 
    const [ showConfirmWindow, setShowConfirmWindow ] = useState (false); 

    const handleShowRjection = () => {
        setShowRejectionWindow (true)
    }

    const handleCloseRjection = () => {
        setShowRejectionWindow (false)
    }

    const handleShowConfirm = () => {
        setShowConfirmWindow (true)
    }

    const handleCloseConfirm = () => {
        setShowConfirmWindow (false)
    }

    const refresh = useSelector((state: any) => state.refreshToggleData.refresh)
    const [ localStatus, setLocalStatus ] = useState (""); 
    useEffect(() => {
        // onClose ()
        setLocalStatus (chefDepValidationSatus as string); 
        console.log("Refreshing Table")
    }, [ refresh ])

    useEffect (() => {
        getOfficeInfo (); 
    }, [])

    useEffect (() => {
        console.log(",,,,")
    }, [showRejectionNote])
    
  return (
    <div ref={ refDiv } style={{
        zIndex: `${ specifiedZIndex ? specifiedZIndex : "1000000000000000000!important" } `
    }} className={`relative flex flex-col  ${ changePDFDesignStyle ? "gap-y-[5rem]" : "gap-y-[1rem]" } shadow-lg rounded-3xl p-[3rem] z-[999999999]`}>
        {
            displayQRCodeConfimr ? 
            <div className=''>
                <RejectionNoteComp 
                    title="Confirmation de retrait de l'initiateur" 
                    description='Souhaitez-vous vraiment générer un QR Code pour ce décaissement?'
                    buttonCancelTextColor='bg-decaissementBtn text-decaissementText rounded-lg p-4'
                    buttonAcceptTextColor='bg-decaissementValiderBtnBg text-decaissementValiderBtnText rounded-lg p-4'
                    btnLabel1='Annuller'
                    btnLabel2='Générer QR Code' 
                    cashout_id={id} 
                    // status_name_id={ statusIDAccept } 
                    user_id={user_id} 
                    qrCodeRequest={true}
                    actionCancelFunction={ handleCloseConfirm } 
                    showTextArea={false}
                    // actionMainFunction={ functionToExcAfterConfirmValidation }
                    onClose={ onClose }
                    // handleQRCodeHide={ handleQRCodeHide}
                />
                {/* <div className='absolute opacity-40 left-0 top-0 h-full w-full bg-bgColorDark'></div> */}
            </div>
            :
            <>
                <SummaryTopSection
                    fullName={fullName} 
                    phoneNumber={phoneNumber} 
                    inputationNumber={inputationNumber} 
                    date={date} 
                    amount={amount}
                    office={ officeName }
                />

                <div className='flex flex-col gap-x-[2rem]'>
                    <h1 className='text-[1.1rem] font-bold text-easeBlue mt-[.5rem] mb-[.5rem]'> Détails du Décaissement </h1>
                    <div className={`flex flex-col ${ changePDFDesignStyle ? "gap-y-[3rem]" : "gap-y-[1rem]" }`}>
                        {
                            allData && allData.map((data, index) => {
                                return (
                                    <SummaryFieldRow key={index} dataArray={data} />
                                )
                            })
                        }
                    </div>
                </div>

                {
                    showButton && showButton ? 
                        <div className='flex gap-x-9 w-full'>
                            {
                                toggleBtn1 ? 
                                    <ButtonV2 classes={classes} passedFunction={ passedFunction } passedFunction2={ handleShowRjection } >{ label }</ButtonV2>
                                    :
                                    <ButtonLinkV2 link={link} classes={classes} passedFunction={ passedFunction } >{ label }</ButtonLinkV2>
                            }
                            {
                                toggleBtn2 ? 
                                    <ButtonV2 classes={classes2} passedFunction={ secondPassedFunction } passedFunction2={ inCashoutTable ? handleShowConfirm : null } >{ label2 }</ButtonV2>
                                        // passedFunction2={ handleShowConfirm }
                                    :
                                    <ButtonLinkV2 link={link} classes={classes2} passedFunction={ secondPassedFunction } >{ label2 }</ButtonLinkV2>
                            }
                        </div>
                        : 
                        ""
                }

                {
                    showTracking ?
                    
                        <SummarryStepper
                            id={ id }
                            theAgentFullName={ fullName } 
                            theDepartmentChef={chefOfDepName}
                            theFinancialChief={financialChefName}
                            theCashier={ theCashier}
                            date={date} 
                            chefDepValidationSatus={chefDepValidationSatus}
                            cfoValidationStatus={ cfoValidationStatus }
                            validatorStatus={ validatorStatus }
                            initiator_status={ initiator_status } 
                            chefDepValidationTime= { chefDepValidationTime } 
                            cfoValidationTime= { cfoValidationTime } 
                            validatorTime= { validatorTime } 
                            initiator_Time= { initiator_Time } 

                            // pendingStatusNameForSuperValidator={ pendingStatusNameForSuperValidator } 
                            // pendingStatusNameForChefDepartment={ pendingStatusNameForChefDepartment } 
                            // pendingStatusNameForCaissiere={ pendingStatusNameForCaissiere } 
                            // pendingStatusNameForInitiator={ pendingStatusNameForInitiator } 

                            // rejectStatusNameForChefDepartment={ rejectStatusNameForChefDepartment } 
                            // rejectStatusNameForSuperValidator={ rejectStatusNameForSuperValidator } 
                            // rejectStatusNameForCaissiere={ rejectStatusNameForCaissiere } 
                            // rejectStatusNameForInitiator={ rejectStatusNameForInitiator } 

                            // validateStatusNameForChefDepartment={ validateStatusNameForChefDepartment } 
                            // validateStatusNameForCFO={ validateStatusNameForCFO } 
                            // validateStatusNameForCaissiere={ validateStatusNameForCaissiere } 
                            // validateStatusNameForInitiator={ validateStatusNameForInitiator } 
                        />
                        :
                        <></>
                }

                {
                    showRejectionWindow ? 
                        <>
                            <RejectionNoteComp 
                                title='Voulez-vous Rejeté' 
                                description='Souhaitez-vous vraiment rejeté ce décaissement ?'
                                buttonCancelTextColor='bg-decaissementBtn text-decaissementText rounded-lg p-4'
                                buttonAcceptTextColor='bg-decaissementRejectBtnBg text-redishColor rounded-lg p-4'
                                btnLabel1='Annuller'
                                btnLabel2='Rejeter' 
                                cashout_id={id} 
                                status_name_id={ statusIDReject } 
                                user_id={user_id} 
                                actionCancelFunction={ handleCloseRjection } 
                                showTextArea={true}
                                actionMainFunction={ functionToExcAfterConfirmRejection }
                                onClose={ onClose }
                            />
                            <div className='absolute opacity-40 left-0 top-0 h-full w-full bg-bgColorDark'></div>
                        </>
                        :
                        ""
                }

                {
                    showConfirmWindow ? 
                    <>
                        <RejectionNoteComp 
                            title='Voulez-vous Confirmer' 
                            description='Souhaitez-vous vraiment valider ce décaissement ?'
                            buttonCancelTextColor='bg-decaissementBtn text-decaissementText rounded-lg p-4'
                            buttonAcceptTextColor='bg-decaissementValiderBtnBg text-decaissementValiderBtnText rounded-lg p-4'
                            btnLabel1='Annuller'
                            btnLabel2='Valider' 
                            cashout_id={id} 
                            status_name_id={ statusIDAccept } 
                            user_id={user_id} 
                            actionCancelFunction={ handleCloseConfirm } 
                            showTextArea={false}
                            actionMainFunction={ functionToExcAfterConfirmValidation }
                            onClose={ onClose }
                        />
                        <div className='absolute opacity-40 left-0 top-0 h-full w-full bg-bgColorDark'></div>
                    </>
                    :
                    ""
                }

                {
                    showRejectionNote ? 
                    <>
                        <ViewRejectionNoteComp 
                            title='Raison du Rejet' 
                            description='La raison du rejet de ce décaissement ?'
                            buttonCancelTextColor='bg-decaissementBtn text-decaissementText rounded-lg p-4'
                            buttonAcceptTextColor='bg-decaissementRejectBtnBg text-redishColor rounded-lg p-4'
                            btnLabel1='Annuller'
                            btnLabel2='Rejeter' 
                            reason={ reason }
                            status={chefDepValidationSatus ||
                                cfoValidationStatus ||
                                validatorStatus ||
                                initiator_status
                            }
                            showTextArea={true}
                        />
                        <div className='absolute opacity-40 left-0 top-0 h-full w-full bg-bgColorDark'></div>
                    </>
                    :
                    ""
                }
            </>
        }
    </div>
  )
}

export default GenericSummaryCard




















