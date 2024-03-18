"use client"
import Image from 'next/image'
import React, { useContext } from 'react'
import { Button } from '../../button/Button'
// import { CounterContext } from '@/app/context/app.context';
import ButtonV2 from '../../button/ButtonV2';
import { useAppDispatch } from '../../../../store';
import { setSummaryDisplay } from '../../../../store/slices/decaissementSlice';
import ButtonLinkV2 from '../../button/ButtonLink';

const SummaryCard = () => {

    const dispatch = useAppDispatch();

    // const { state, dispatch } : { state: any, dispatch: any } = useContext(CounterContext); 
    // console.log("STATE: ", state, state?.summaryDisplay)

    const handleCloseSummary = (e: any) => {
        e.preventDefault()
        dispatch(setSummaryDisplay(false)); 
    }

  return (
    <div className='flex flex-col gap-y-[1rem] shadow-lg rounded-3xl p-[3rem]'>
        <div className='flex flex-row gap-x-[2rem]'>
            <div className='flex flex-col gap-y-[1rem]'>
                <div className='bg-easeBlue p-[2rem] flex justify-start rounded-3xl'>
                    <Image src={"/new_assets/logo/lightLogo.png"} width={100} height={100} alt='ease_logo' />
                </div>
                <div className='bg-summaryBgGray rounded-3xl p-[2rem]'>
                    {/* flex flex-col gap-y-1 */}
                    <p className='text-summaryGray text-[.8rem]'>decaissement de</p>
                    <h1 className='text-[1.2rem] font-bold text-black-2 mt-1 mb-1'>Honorine Nguemo</h1>
                    <p className='text-summaryGray text-[.8rem]'>(237) 692 00 00 00</p>
                    <p className='text-summaryGray text-[.8rem]'>DOUALA/YAOUNDERC</p>
                    <p className='text-summaryGray text-[.8rem]'>DLA/2020/M/4960, BP3024</p>
                    <p className='text-summaryGray text-[.8rem]'>Douala-Cameroun</p>
                </div>
            </div>
            <div className='flex flex-col gap-y-[1rem] rounded-3xl bg-white border-summaryBgGray border-[1px] p-[1rem]'>
                <div className='bg-summaryBgGray p-[1rem] rounded-2xl'>
                    <p className='text-summaryGray text-[.8rem]'>NO d&apos;inputation</p>
                    <h1 className='text-[1.1rem] font-bold text-black-2 mt-1 mb-1'>DED-00000000076</h1>
                </div>
                <div className='bg-summaryBgGray p-[1rem] rounded-2xl'>
                    <p className='text-summaryGray text-[.8rem]'>Date</p>
                    <h1 className='text-[1.1rem] font-bold text-black-2 mt-1 mb-1'>Jun 26, 2024</h1>
                </div>
                <div className='flex flex-col content-center justify-center pt-[1rem] bg-white border-t border-t-summaryBgGrayD'>
                    <p className='text-summaryGray text-[.8rem]'>Montan</p>
                    <h1 className='text-[1.3rem] font-bold text-black-2 mt-1 mb-1'>40 000 FCFA</h1>
                </div>
            </div>
        </div>
        {/* Détails du décaissement */}
        <div className='flex flex-col gap-x-[2rem]'>
            <h1 className='text-[1.1rem] font-bold text-easeBlue mt-1 mb-1'> Détails du décaissement </h1>
            <div className='flex flex-col gap-y-[1rem]'>
                <div className='flex flex-row justify-between gap-x-[2rem] w-full'>
                    <div className='flex flex-row w-1/2 gap-y-[.5rem] rounded-lg bg-summaryBgGray border-summaryBgGrayD border-[1px] p-[.5rem]'>
                        <div className='Image'>
                            <Image src={"/new_assets/form/filial.png"} width={20} height={20} alt='ease_logo' />
                        </div>
                        <div className=''>
                            <p className='text-summaryGray text-[.8rem]'>Type de Paiement</p>
                            <p className='text-summaryGray font-bold text-[.8rem]'>Espece</p>
                        </div>
                    </div>
                    <div className='flex flex-row w-1/2 gap-y-[.5rem] rounded-lg bg-summaryBgGray border-summaryBgGrayD border-[1px] p-[.5rem]'>
                        <div className='Image'>
                            <Image src={"/new_assets/form/filial.png"} width={20} height={20} alt='ease_logo' />
                        </div>
                        <div className=''>
                            <p className='text-summaryGray text-[.8rem]'>Filiale</p>
                            <p className='text-summaryGray font-bold text-[.8rem]'>Douala</p>
                        </div>
                    </div>

                </div>

                <div className='flex flex-row justify-between gap-x-[2rem] w-full'>
                    <div className='flex flex-row w-1/2 gap-y-[.5rem] rounded-lg bg-summaryBgGray border-summaryBgGrayD border-[1px] p-[.5rem]'>
                        <div className='Image'>
                            <Image src={"/new_assets/form/filial.png"} width={20} height={20} alt='ease_logo' />
                        </div>
                        <div className=''>
                            <p className='text-summaryGray text-[.8rem]'>Chef de Departement</p>
                            <p className='text-summaryGray font-bold text-[.8rem]'>Epoupa Joel</p>
                        </div>
                    </div>
                    <div className='flex flex-row w-1/2 gap-y-[.5rem] rounded-lg bg-summaryBgGray border-summaryBgGrayD border-[1px] p-[.5rem]'>
                        <div className='Image'>
                            <Image src={"/new_assets/form/filial.png"} width={20} height={20} alt='ease_logo' />
                        </div>
                        <div className=''>
                            <p className='text-summaryGray text-[.8rem]'>Montant en Lettre</p>
                            <p className='text-summaryGray font-bold text-[.8rem]'>Quarante-quatre milles</p>
                        </div>
                    </div>

                </div>

                <div className='flex flex-row justify-between gap-x-[2rem] w-full'>
                    <div className='flex flex-row w-1/2 gap-y-[.5rem] rounded-lg bg-summaryBgGray border-summaryBgGrayD border-[1px] p-[.5rem]'>
                        <div className='Image'>
                            <Image src={"/new_assets/form/filial.png"} width={20} height={20} alt='ease_logo' />
                        </div>
                        <div className=''>
                            <p className='text-summaryGray text-[.8rem]'>Chef financier</p>
                            <p className='text-summaryGray font-bold text-[.8rem]'>Stephane kamga</p>
                        </div>
                    </div>
                    <div className='flex flex-row w-1/2 gap-y-[.5rem] rounded-lg bg-summaryBgGray border-summaryBgGrayD border-[1px] p-[.5rem]'>
                        <div className='Image'>
                            <Image src={"/new_assets/form/filial.png"} width={20} height={20} alt='ease_logo' />
                        </div>
                        <div className=''>
                            <p className='text-summaryGray text-[.8rem]'>Motif de decaissement</p>
                            <p className='text-summaryGray font-bold text-[.8rem]'>Taxi</p>
                        </div>
                    </div>

                </div>

            </div>
        </div>

        <div className='flex gap-x-9 w-full'>
            <ButtonLinkV2 link='/decaissement' classes='bg-decaissementBtn text-decaissementText rounded-lg p-4' passedFunction={ handleCloseSummary } >Modifier</ButtonLinkV2>
            <ButtonV2 
                icon=''
                classes='bg-saveDecaissementTxt text-saveDecaissementBg rounded-lg p-4' >Confirmer</ButtonV2>
        </div>
    </div>
  )
}

export default SummaryCard