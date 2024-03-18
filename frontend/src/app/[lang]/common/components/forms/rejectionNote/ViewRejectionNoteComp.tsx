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
    onClose?: any;
    status?: string; 
    reason?: string; 
}

const ViewRejectionNoteComp: React.FC<RejectionNoteCompType> = ({ title, reason, status, onClose, cashout_id, status_name_id, user_id, description, btnLabel1, btnLabel2, actionCancelFunction, actionMainFunction, showTextArea, buttonCancelTextColor, buttonAcceptTextColor }) => {
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
    const showRejectionNote = useSelector((state: RootState) => state.refreshToggleData.showRejectionNote)

    const refresh = useSelector((state: RootState) => state.refreshToggleData.refresh); 
    const app_url = `${ API_URL }${ usePathname () }`; 
    
    const handleRejectionHide = () => {
        dispatch(toggleShowRejectionNote(false)); 
    }
    const ref = useOutsideClick(() => handleRejectionHide ());

    return (
    <div className='absolute w-[70%] left-0 translate-x-1/4 translate-y-1/2 z-9999 rounded-3xl p-[2rem] shadow-lg bg-white' ref={ref}>
        <div className='flex rounded-full justify-center content-center p-[.3rem] w-[2rem] bg-decaissementRejectBtnBg'>
            <Image src={ rejectionIcons } width={30} height={30} alt='danger' />
        </div>
        <div className=''>
            <h1 className='text-[1.5rem] font-bold text-easeBlue mt-1 mb-1'>{ title }</h1>
        </div>
        <div className='bg-textAreaColorRejectNote mb-[1rem]  text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-xl h-[200px]'>
            
            {
                reason
            }
        </div>
    </div>
  )
}

export default ViewRejectionNoteComp