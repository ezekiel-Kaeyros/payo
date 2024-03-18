"use client";

import React, { useEffect, useState } from 'react'
import DecaissementTitle from '../decaissementForm/DecaissementTitle'
// import SummaryCard from './SummaryCard'
import GenericSummaryCard from './GenericSummaryCard'
import { RootState, store, useAppDispatch } from '../../../../store';
import { useSelector } from 'react-redux';
import SaveDisbursementService from '@/services/disbursementService';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { clearAllCashoutFormInfo } from '@/app/[lang]/store/slices/decaissementSlice';
import { API_URL } from '@/utils/link';

const Summarry = () => {
  // THE DATE IN PASSED AS PROPS BELOW 
  // WILL BE COMING FROM THE GLOBAL STATE
  // AFTER THE USER HAS FILLED THE FORM
  const router = useRouter (); 
  const dispatch = useAppDispatch(); 

  const theStore: any = useSelector((state: RootState) => state.cashout.allCahsoutInfoData);
  const finaleDate = new Date(theStore.date); 
  const selectedChefDep: any = useSelector((state: RootState) => state.cashout.adminValidator);
  const [ loggedInUser, setLoggedinUser ] = useState<any> (null); 
  const app_url = `${ API_URL }${ usePathname () }`; 

  useEffect (() => {
    const userU: {
      first_name: string, 
      last_name: string
    } = JSON.parse(localStorage.getItem('user')!); 

    if (userU) {
      setLoggedinUser (userU)
    } else {
      router.push("/"); 
    }
  }, [])

  const handleSubmitDecaissement = async (e: any) => {
    e.preventDefault()
    let data: any = {
      initiator: [theStore.initiator._id], 
      payment_method_id: [theStore.payementMode.id], 
      beneficiary_id: [theStore.beneficiary.id], 
      amount: theStore.amount, 
      invoice_number: theStore.invoiceNumber, 
      reject_note: theStore.cashoutNote, 
      app_url, 
    }

    // console.log("data", app_url)
    // return

    const savingDisbursment = new SaveDisbursementService();
    await savingDisbursment.postDisbursment(data); 
    toast.success(`Enregistrement éffectué avec succes`); 
    dispatch(clearAllCashoutFormInfo(theStore));
    router.push("/decaissements")
  }

  return (
    <div className='justify-self-center flex w-1/13 h-screen flex-col justify-items-center bg-white dark:bg-bgColorDark z-1'>
        <DecaissementTitle link='/decaissement' title='Aperçu du Décaissement' />
        {
          loggedInUser &&
              <GenericSummaryCard 
                specifiedZIndex={ "1" }
                id={2}
                fullName={` ${ loggedInUser ? `${loggedInUser?.first_name} ${loggedInUser?.last_name}` : 'Honorine Nguemo' }`}
                phoneNumber='(237) 692 00 00 00'
                inputationNumber='DED-00000000076'
                date={` ${ theStore?.date ? finaleDate : 'June 26, 2024'  }` }
                amount={`${ theStore?.amount ? theStore?.amount : '44000' }` }
                paymentType={`${ theStore.payementMode ? theStore?.payementMode?.text : 'Type de paiment' }`}
                office={`${ theStore.office ? theStore?.office :  'Douala'}` }
                chefOfDepName={ `${selectedChefDep[0]?.first_name ? `${selectedChefDep[0]?.last_name} ${selectedChefDep[0]?.first_name}` : 'Thierry Timba' }` }
                // ${ selectedChefDep[0].first_name ? selectedChefDep[0].last_name
                amountInWords={ theStore?.amountInWords ? theStore?.amountInWords : 'Quarante-quatre mille'}
                financialChefName={`${ theStore?.validator?.name ? theStore?.validator?.name : 'Stephane Kamga'}` }
                theCashier={`${ theStore?.validator ? theStore?.validator : 'Hermine Edimo' }` }
                cashouNote={`${ theStore?.cashoutNote ? theStore?.cashoutNote : 'Njoka'}`}
                chefDepValidationSatus= "pending" 
                cfoValidationStatus= "pending" 
                validatorStatus= "pending" 
                initiator_status= "pending" 
                link="/decaissement"
                toggleBtn1={false}
                toggleBtn2={true}
                label="Modifier"
                label2="Confirmer"
                classes='bg-decaissementBtn text-decaissementText rounded-lg p-4'
                classes2='bg-saveDecaissementTxt text-saveDecaissementBg rounded-lg p-4'
                passedFunction={ handleSubmitDecaissement }
                secondPassedFunction={ handleSubmitDecaissement }
                showTracking={ false} 
                showButton={ true }
              />
        }
        <br />
        <br />
        <br />
    </div>
  )
}

export default Summarry