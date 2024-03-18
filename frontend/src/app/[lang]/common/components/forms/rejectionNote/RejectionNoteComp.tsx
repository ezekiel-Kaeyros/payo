import Image from 'next/image'
import React from 'react'
import TextArea from '../text-area/TextArea'
import ButtonV2 from '../../button/ButtonV2'
import { FieldValues, useForm } from 'react-hook-form'
import SaveDisbursementStatusService from '@/services/disbursmentStatusServices'
import { RootState, useAppDispatch } from '../../../../store'
import { useSelector } from 'react-redux'
import { toggleRefresh, toggleShowRejectionNote } from '../../../../store/slices/refreshSlice'; 
import toast from 'react-hot-toast'; 
import ThreeDotsLoadingAnimation from '../../loaders/ThreeDotsLoadingAnimation'
import { usePathname } from 'next/navigation'
import { API_URL } from '@/utils/link'

import rejectionIcons from "../../../../../../../public/new_assets/newIcons/warning_2.svg"
import SettingsService from '@/services/settingsService'
import { useOutsideClick } from '@/app/[lang]/hooks/useClickOutsideV2'

type RejectionNoteCompType = {
    title: string;
    description: string; 
    btnLabel1: string; 
    btnLabel2: string; 
    actionCancelFunction?: any; 
    actionMainFunction?: any; 
    cashout_id?: any,  
    status_name_id?: any,  
    user_id?: any,  
    showTextArea: boolean;
    buttonCancelTextColor: string; 
    buttonAcceptTextColor: string;
    onClose: any; 
    qrCodeRequest?: boolean; 
    // handleQRCodeHide?: any; 
}

const RejectionNoteComp: React.FC<RejectionNoteCompType> = ({ 
    // handleQRCodeHide, 
    qrCodeRequest, title, onClose, cashout_id, status_name_id, user_id, description, btnLabel1, btnLabel2, actionCancelFunction, actionMainFunction, showTextArea, buttonCancelTextColor, buttonAcceptTextColor }) => {
    const {
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting, isSubmitted}, 
        reset, 
        getValues, 
      } = useForm ({
          defaultValues: { 
            cashoutNote: "", 
          }
      });

    const dispatch = useAppDispatch(); 
    const refresh = useSelector((state: RootState) => state.refreshToggleData.refresh); 
    const app_url = `${ API_URL }${ usePathname () }`; 

    const onSubmitHandler = async (data: FieldValues) => {

        const saveDis = new SaveDisbursementStatusService (); 

        const loggedInUserID = JSON.parse(localStorage.getItem("user")!)

        user_id = loggedInUserID._id

        let message; 
        if (data.cashoutNote) {
            data = {
                reason: data.cashoutNote, 
                disbursement_id: cashout_id, 
                status_name_id, 
                user_id, 
                app_url, 
            }
            message = "Rejet éffectuée avec succes"
        } else {
            data = {
                disbursement_id: cashout_id, 
                status_name_id, 
                user_id, 
                app_url, 
            }
            message = "Validation éffectuée avec succes"
        }

        // const rejectionOne = new SettingsService ()
        // const getServiceNames = await rejectionOne.getStatusName ()

        // const findTheRejection = getServiceNames.data.find()

        // console.log("datadatadata: ", data, status_name_id, getServiceNames.data); 
        // return

        let result;
        // let message; 

        if (qrCodeRequest === true) {
            toast.success("got here")
            console.log(user_id, cashout_id)
            // return
            result = await saveDis.postQRCodeURLParams(user_id, cashout_id); 
        } else {
            // console.log("datadatadata: ", data); 
            // return
            result = await saveDis.postDisbursmentStatus(data); 
        }
        try {
            if (result.data) {
                toast.success(message)
                onClose (); 
                dispatch(toggleRefresh(!refresh)); 
            } else {
                toast.error("Un problem est survenu. Veuillez reessailler plus tard."); 
            }

        } catch (error: any) {
            toast.error("Un problem est survenu. Veuillez reessailler plus tard.", error); 
        }

    }

    return (
    <form onSubmit={handleSubmit (onSubmitHandler)}  className={`${ qrCodeRequest ? "" : "shadow-lg absolute w-[70%] left-0 translate-x-1/4 translate-y-1/2"}  z-9999 rounded-3xl p-[2rem]  bg-white`}>
        {/* ref={ ref} */}
        <div className='flex rounded-full justify-center content-center p-[.3rem] w-[2rem] bg-decaissementRejectBtnBg'>
            <Image src={ rejectionIcons } width={30} height={30} alt='danger' />
        </div>
        <div className=''>
            <h1 className='text-[1.5rem] font-bold text-easeBlue mt-1 mb-1'>{ title }</h1>
            <p className='text-decaissementText text-[1rem]'>{ description }</p>
        </div>
        {
            showTextArea ? 
                <div className='mb-[1rem] mt-[1rem]'>
                    <TextArea 
                        name='cashoutNote' 
                        customBg="textAreaColorRejectNote" 
                        placeholder='Raison du Rejet' 
                        required={true} 
                        register={ register } 
                        errors={ errors?.cashoutNote?.message } 
                        validationMessage="Remplissez une note de rejet!"
                    />
                </div>
                : 
                ""
        }
        <div className='flex flex-row gap-x-[1rem]'>
            {
                qrCodeRequest ? 
                    ""
                    :
                    <ButtonV2 passedFunction={ actionCancelFunction } classes={ buttonCancelTextColor } >
                        {
                            isSubmitting === true ? 
                                <div className="py-2">
                                    <ThreeDotsLoadingAnimation color="easeBlue" />
                                </div>
                                :
                                // <>Connexion</>
                                <>
                                { btnLabel1 }
                                </>
                        }
                    </ButtonV2>
            }

            <ButtonV2 passedFunction={ actionMainFunction } classes={ buttonAcceptTextColor } >
                {
                    isSubmitting === true ? 
                        <div className="py-2">
                            <ThreeDotsLoadingAnimation color="easeBlue" />
                        </div>
                        :
                        // <>Connexion</>
                        <>
                            { btnLabel2 }
                        </>
                }
            </ButtonV2>
        </div>
    </form>
  )
}

export default RejectionNoteComp