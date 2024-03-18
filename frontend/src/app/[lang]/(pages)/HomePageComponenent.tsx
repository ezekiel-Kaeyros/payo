"use client"; 
import React, { useEffect, useState } from 'react'; 
import { useAppDispatch } from '../store';
import SaveDisbursementService from '@/services/disbursementService';
import { setAllCashoutsState } from '../store/slices/allCashoutsSlice';
import ThreeDotsLoadingAnimation from '../common/components/loaders/ThreeDotsLoadingAnimation';
import HomePageCard from '../common/components/cards/HomePageCard';
import UsersService from '@/services/allUserService';
import { UserInArrayType, getChefDepsGeneric } from '@/utils/tranformArrays';
import { setAdminValidatorState } from '../store/slices/decaissementSlice';

import img from '../../../../public/new_assets/note-favorite.svg'; 
import imgDash from '../../../../public/dashboard_icons/dashboardPiles.svg'; 

const cardMap = [
  {
    key: 1,
    link: "/decaissement", 
    img: img, 
    title: "Ajouter un decaissement", 
    paragraph: "Accédez au panel pour demander un versement en especes."
  }, 
  {
    key: 2,
    link: "/dashboard", 
    img: imgDash, 
    title: "Tableau de Bord", 
    paragraph: "Accédez au Tablea de bord pour voir les différentes activités."
  }
]

const HomePageComponenent = ({ dict }: { dict: any }) => {
  const [ userInfoOnNavBar, setUserInfoOnNavBar ] = useState<{first_name: string; last_name: string}> (); 

  const dispatch = useAppDispatch(); 

  const handleLoadDecaissementsInGlobalState = async () => {
    const savingDisbursment = new SaveDisbursementService();
    const result = await savingDisbursment.getDisbursment(); 
    const userServices = new UsersService (); 
    const allUsers = await userServices.getAllUsers (); 
    const getLoggedInUserInfo = localStorage.getItem("user")
    const parseUserInfo = JSON.parse(getLoggedInUserInfo!)
    const geLocalStorageValidators = localStorage.getItem("validators")
    const getChefDepartement: UserInArrayType = getChefDepsGeneric (allUsers.data, 2, parseUserInfo?.department_id[0]._id) || JSON.parse(geLocalStorageValidators!); 
    dispatch(setAdminValidatorState(getChefDepartement))
    return result; 
  }



  useEffect(() => {
    dispatch(setAllCashoutsState(handleLoadDecaissementsInGlobalState ()))
    const userU: any | undefined = JSON.parse(localStorage.getItem('user')!); 
    setUserInfoOnNavBar (userU); 
  }, [])

  return (
    <div className="flex h-screen flex-col mt-[150px] justify-items-center content-center ">
        <h1 className='text-easeBlue flex gap-x-[1rem] justify-center justify-items-center text-[28px] font-bold'>
          <span>{ dict?.page?.home?.welcome }</span> 
          {/* <br /> */}
          {
            userInfoOnNavBar?.first_name ?
              <>
                { userInfoOnNavBar?.first_name } { userInfoOnNavBar?.last_name }
              </>
              :
              <span className="py-2">
                  <ThreeDotsLoadingAnimation color="easeBlue" />
              </span>
          }
        </h1>
        <div className='lg:flex lg:mt-[56px] lg:justify-center lg:content-center lg:gap-x-8 grid justify-items-center gap-y-8 mt-[56px] ml-[1rem] mr-[1rem]'>
            {
              dict?.page?.home?.data.map((card: any) => {
                if (card.link === "/decaissement") {
                  
                  return (
                    <HomePageCard 
                      key={card.key}
                      img={img} 
                      title={card.title}
                      paragraphe={card.paragraph}
                      link={ card.link }
                    />
                  )
                } else if (card.link === "/dashboard") {
                  return (
                    <HomePageCard 
                      key={card.key}
                      img={imgDash} 
                      title={card.title}
                      paragraphe={card.paragraph}
                      link={ card.link }
                    />
                  )
                }
              })
            }
        </div>
    </div>
  )
}

export default HomePageComponenent