"use client"; 
// import { LoginContextProvider } from '@/context/loginFormContext';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import InputField from '../../common/components/forms/text-field/InputField';
import ButtonV2 from '../../common/components/button/ButtonV2';
import ThreeDotsLoadingAnimation from '../../common/components/loaders/ThreeDotsLoadingAnimation';
import { FieldValues, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthService from '@/services/authService';
import { useRouter } from 'next/navigation';
import UsersService from '@/services/allUserService';
import { useAppDispatch } from '../../store';
import { setValidatorState } from '../../store/slices/decaissementSlice';
import SettingsService from '@/services/settingsService';
// import { UserInArrayType, filterAllValidatorsMap, newTranformedValidatorArray } from '@/utils/tranformArrays'; 
import { getAllValidatorsFunction } from '@/utils/getAllValidators';


import ease_logo_blue from '../../../../../public/new_assets/logo/darkLogo.png'
import login_icon from '../../../../../public/new_assets/login_page/login_icon_large.png'
import username_icon from '../../../../../public/new_assets/login_page/usernameIcon.png'
import password_icon from '../../../../../public/new_assets/login_page/passwordicon.png'


import Cookies from "js-cookie"; 
import toast from 'react-hot-toast'; 
import { useTheme } from 'next-themes';

const LoginPageComponent = ({ dict }: { dict: any }) => {
    const router = useRouter(); 
    const dispatch = useAppDispatch(); 
    const { theme, setTheme } = useTheme();

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting, isDirty, isValid },
    } = useForm();


    useEffect (() => {
        setTheme('light'); 
    }, [])

    const onSubmitHandler = async (data: FieldValues) => {
        // login
        const authentication = new AuthService (); 
        const userServices = new UsersService (); 
        
        try {
            console.log("------")
            const login = await authentication.login(data); 
            console.log("------")
            if (!login.data) {
                console.log("not login")
            } 
    
            if (login?.data?.token) {

                localStorage.setItem("token", login.data.token)
                Cookies.set("token", JSON.stringify(login.data.token)); 
                localStorage.setItem("user", JSON.stringify(login?.data?.user)); 
    
                // INSTANTIATING THE SERVICE CLASS TO GET ACCES TO ITS METHODS
                const settingsService = new SettingsService (); 
    
                // GET OFFICE OF THE LOGGIN USER
                const getOfficeInfo = await settingsService.getOneOffice(login?.data?.user?.office_id[0]?._id); 
                localStorage.setItem("userOffice", JSON.stringify(getOfficeInfo.data)); 
    
                // FUNCTION TO GET ALL VALIDATORS
                const newTranformedValidators = await getAllValidatorsFunction (); 
    
                // STORING THEM IN LOCAL STORAGE
                localStorage.setItem("validators", JSON.stringify(newTranformedValidators));
    
                // STORING THEM IN GLOBAL REDUX STATE
                dispatch(setValidatorState(newTranformedValidators)); 
                toast.success(dict?.page?.login?.afterLoginSuccessNotification)
                
                // NAVIGATE TO PROTECTED PAGES AND ROUTES
                router.push("/")
            }
        } catch (error: any) {
            console.log("error", error)
            toast.error(error?.response?.data as any || `${error?.message}. Check your internet Connection`)
        }

    }

    return (
        <div className='flex justify-center content-center gap-x-10 h-screen bg-white text-black hover:text-slate-600 dark:bg-black'>
            <div className='xl:flex xl:flex-row xl:justify-between xl:gap-x-[10rem] flex items-center content-center'>

                <div className='xl:flex xl:justify-center xl:flex-col flex-col flex self-center '>
                    <div className='w-full'>
                        <div className='Image'>
                            <Image alt='new_image' src={ ease_logo_blue } width={150} height={150} />
                        </div>
                        <div className='text-blue mt-5'>
                            <h1 className='text-[1.5rem] font-bold text-easeBlue dark:text-white'>Cash Disbursement App </h1>
                        </div>
                    </div>

                    <div className='w-full mt-10'>
                        <div className='titleBig'>
                            <h1 className=' text-[1.3rem] text-black font-bold dark:text-white'>{ dict?.page?.login?.loginPage }</h1>
                        </div>
                        <div className='title'>
                            <p className='text-[.8rem] dark:text-white'>{ dict?.page?.login?.info }</p>
                        </div>
                        <br></br>
                    </div>

                    <form onSubmit={handleSubmit (onSubmitHandler)} className='flex flex-col gap-y-5'>
                        <InputField 
                            title={ dict?.page?.login?.username } 
                            name='email' 
                            placeholder={ dict?.page?.login?.username } 
                            type='email' 
                            img={ username_icon } 
                            required={true} 
                            flatStyle={false} 
                            filled={ false }
                            register={ register }
                            errors={ errors?.email?.message }
                            validationMessage={ dict?.page?.login?.uNameValidationMessage }
                        />
                        <InputField 
                            title={ dict?.page?.login?.password } 
                            name='password' 
                            placeholder={ dict?.page?.login?.password }  
                            type='password' 
                            img={ password_icon } 
                            flatStyle={false} 
                            filled={ false }
                            required={true} 
                            register={ register}
                            errors={ errors?.password?.message } 
                            validationMessage={ dict?.page?.login?.uNameValidationMessage }
                        />
                        <div className='ButtonDiv'>
                            <ButtonV2 
                                disabled={ isSubmitting }
                                icon=''
                                classes='w-full justify-center py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border-inputFieldBorder border-[1px] hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center'
                                
                            >
                                {
                                    isSubmitting === true ? 
                                        <div className="py-2">
                                            <ThreeDotsLoadingAnimation color="easeBlue" />
                                        </div>
                                        :
                                        <>{ dict?.page?.login?.connect }</>
                                }
                            </ButtonV2>
                        </div>
                    </form>
                </div>

                <div className='xl:flex xl:justify-center xl:items-end xl:mt-[8rem] hidden content-center'>
                    <div className='Image'>
                        <Image alt='new_image' src={ login_icon } width={600} height={600} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPageComponent