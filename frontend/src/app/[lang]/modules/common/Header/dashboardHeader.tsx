"use client";
import Link from "next/link";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownMessage from "./DropdownMessage";
import DropdownNotification from "./DropdownNotification";
import DropdownUser from "./DropdownUser";
import Image from "next/image";
import { ThemeSwitcher } from "../../../common/dark-mode/theme-switcher/ThemeSwitcher";
import LanguageToggler from "../../../common/components/language/LanguageToggler";
import { useEffect, useState } from "react";
import { RootState, store, useAppDispatch } from "../../../store";
import { setSideBarState } from "../../../store/slices/sideBarToggleSlice";
import { useSelector } from "react-redux";
import DropdownUserDashboard from "./DropdownUserDashboard";

import logoI from "../../../../../../public/new_assets/logo/lightLogo.png"
import plusIcon from "../../../../../../public/new_assets/navigation/plusIcon.png"


const DashboardHeader = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
  headerSizeStyle: string;
  marginStyle: string;
  borderRadius: string; 
  imageDisplay: boolean;
  dict: any, 
}) => {

  const dispatch = useAppDispatch ()

  // const storeData = store.getState().toggleSideBarData.toggleSideBar; 

  const storeData = useSelector((state: RootState) => state.toggleSideBarData.toggleSideBar)

  // console.log(storeData, "=-=-=-=-=-=-=-=")

  return (
    <header className={`sticky right-0 justify-self-end top-0 z-[1] ${ props.marginStyle } ${ props.borderRadius } flex w-${ props.headerSizeStyle } bg-easeBlue drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none`}>
      {/* <header className={`sticky right-0 justify-self-end top-0 z-[1] ${ props.marginStyle } ${ props.borderRadius } flex w-${ props.headerSizeStyle } bg-easeBlue drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none`}> */}
      <div className="flex flex-grow items-center justify-between xl:p-[15px] xl:px-7 sm:p-[24px] p-[15px] w-full shadow-2 md:px-6 2xl:px-11">
      {/* px-4 py-4 */}
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">

          <button
            aria-controls="sidebar"
            onClick={(e) => {
              // e.stopPropagation();
              dispatch(setSideBarState(!storeData))
              // props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm bg-easeBlue p-1.5 shadow-sm dark:bg-boxdark lg:hidden"
            // dark:border-strokedark border-stroke border
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !storeData && "!w-full delay-300"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !storeData && "delay-400 !w-full"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !storeData && "!w-full delay-500"
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    !storeData && "!h-0 !delay-[0]"
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !storeData && "!h-0 !delay-200"
                  }`}
                ></span>
              </span>
            </span>
          </button>

          <Link className="block flex-shrink-0 z-[20]" href="/">
            <Image
              width={60}
              height={60}
              src={logoI}
              alt="Logo"
            />
          </Link>
        </div>

        {
          props.imageDisplay ? 

            <div className="hidden lg:block z-[20]">
              <Link className="block flex-shrink-0" href="/">
                <Image
                  width={100}
                  height={100}
                  src={logoI}
                  alt="Logo"
                />
              </Link>
            </div>
            :
            ""
        }

        <div className={`flex ${ props.imageDisplay ? "" : "justify-between w-full" } items-center gap-3 2xsm:gap-7`}>
          <ul className="hidden lg:flex lg:items-center lg:gap-2 2xsm:gap-4 ">
            <Link href="/decaissement" className="hidden sm:block md:flex md:gap-x-[5px] md:border-white md:border-[2px] md:p-[.5rem] md:pl-[2rem] md:pr-[2rem] md:rounded-xl md:bg-transparent md:text-white    border-white border-[2px] p-[.5rem] pl-[2rem] pr-[2rem] rounded-xl bg-transparent">
              <Image src={ plusIcon } width={20} height={20} alt="addIcon" />
              <span className="hidden md:block">
                { props.dict?.page?.home?.header?.addDecaissementBtn }
                {/* Ajouter un Décaissement */}
              </span>
            </Link>
            {/* <DarkModeSwitcher /> */}

          </ul>
          { props.imageDisplay ?
            ""
            :
            <div className="flex-1 w-60"></div>
          }
          {/* bg-hoverColorDark */}
          
          <Link href="/decaissement" className="lg:hidden hidden md:flex md:gap-x-[5px] md:border-white md:border-[2px] md:p-[.5rem] md:pl-[2rem] md:pr-[2rem] md:rounded-xl md:bg-transparent md:text-white    border-white border-[2px] p-[.5rem] pl-[2rem] pr-[2rem] rounded-xl bg-transparent">
            <Image src={ plusIcon } width={20} height={20} alt="addIcon" />
            <span className="hidden md:block">Ajouter un Décaissement</span>
          </Link>
          <DropdownUserDashboard dict={ props.dict } />
          <div className="hidden xl:flex xl:flex-row items-center ">
              <DarkModeSwitcher /> 
            {/* <span className="mb-[1.5rem]">
            </span> */}
            <LanguageToggler iconColors="faIconWhite" />
          </div>
        </div>
      </div>
    </header>



  );
};


export default DashboardHeader;





{/* <div className="NavbarContainer bg-easeBlue w-full h-[92px] px-[70px] py-[21px] justify-between items-center inline-flex">
      <div className="EaseLogoContainer  flex-col justify-start items-start gap-2.5 inline-flex">
        <div className="EaseLogo w-[134.36px] h-[50px] relative">
          <div className="Group w-[134.36px] h-[37.88px] left-0 top-[12.13px] absolute">
          </div>
        </div>
      </div>
      <div className="SideMenuContainer h-[43px] justify-start items-start gap-6 flex">
        <div className="ButtonDecaissement px-4 py-2 rounded-lg border border-white justify-center items-center gap-[7px] flex">
          <div className="Add w-6 h-6 justify-center items-center flex">
            <div className="Add w-6 h-6 relative">
            </div>
          </div>
          <div className="AjouterUnDCaissement text-white text-base font-normal font-['Articulat CF']">Ajouter un décaissement</div>
        </div>
        <div className="LanguagecontainerProfile grow shrink basis-0 self-stretch justify-start items-center gap-3 flex">
          <div className="Frame235 justify-start items-center gap-[30px] flex">
            <div className="Frame88 w-9 self-stretch justify-center items-center gap-5 flex">
              <div className="Menu h-[27px] flex-col justify-start items-end gap-[13px] inline-flex">
                <div className="UserProfile justify-end items-center gap-2 inline-flex">
                  <div className=" text-white text-base font-normal font-['Articulat CF'] capitalize">|</div>
                  <img className="Ellipse1 w-6 h-6 rounded-full" src="https://via.placeholder.com/24x24" />
                </div>
              </div>
            </div>
          </div>
          <div className="Language h-[43px] flex-col justify-start items-center inline-flex">
            <div className="Langue px-4 py-2 justify-center items-center gap-1 inline-flex">
              <div className="English text-white text-sm font-normal font-['Articulat CF']">English</div>
              <div className="ArrowDown w-6 h-6 justify-center items-center flex">
                <div className="ArrowDown w-6 h-6 relative">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> */}























            {/* <ThemeSwitcher /> */}
            {/* <!-- Dark Mode Toggler --> */}

            {/* <!-- Notification Menu Area --> */}
            {/* <DropdownNotification /> */}
            {/* <!-- Notification Menu Area --> */}

  {/* <!-- User Area --> */}
  {/* <!-- User Area --> */}
            {/* <!-- Chat Notification Area --> */}
            {/* <DropdownMessage /> */}
            {/* <!-- Chat Notification Area --> */}
            {/* <!-- Dark Mode Toggler --> */}