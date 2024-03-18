"use client"
import React, { useEffect, useState } from 'react'
import UserTableComponent from '../../common/components/TablesComponents/userTable/UserTable';
import OfficeTable from '../../common/components/TablesComponents/officeTable/OfficeTable'
import DepartmentTable from '../../common/components/TablesComponents/departmentTable/DepartmentTable'
import CompanyTable from '../../common/components/TablesComponents/companyTable/companyTable'
import RolesTable from '../../common/components/TablesComponents/roleTable/RolesTable'
import RoleAmountTable from '../../common/components/TablesComponents/rolesAmountsTable/RolesAmountTable'
import BeneficiaryTable from '../../common/components/TablesComponents/beneficiariesTable/BeneficiariesTable'
import StatusNameTable from '../../common/components/TablesComponents/statusNameTable/StatusNameTable'
import PayementModeTable from '../../common/components/TablesComponents/payementModeTable/PayementModeTable'

// 

import DecaissementTypeTable from '../../common/components/TablesComponents/decaissementTypeTable/DecaissementsTypeTable'
import Image from 'next/image';
// import HeaderComponent from '@/app/modules/common/HeaderComponent/HeaderComponent';
import DataService from '@/services/dataService';
import { RootState, store, useAppDispatch } from '../../store';
import SettingsService from '@/services/settingsService';
import { setAllRoleAmountState, setCreatedAtState, setIDDisplay, setUpdatedAtState } from '../../store/slices/rolesSliceAmount';
import { setAmountState } from '../../store/slices/decaissementSlice';
import { setAllRoleState } from '../../store/slices/rolesSlice';
import { setAllCashoutTypeState } from '../../store/slices/cashoutTypeSlice';
import { setAllOfficesState } from '../../store/slices/officeSlice';
import { setAllDepartementState } from '../../store/slices/departementSlice';
import { setAllBeneficiariesState } from '../../store/slices/beneficiarySlice';
import UsersService from '@/services/allUserService';
import { setAllUsersDisplay } from '../../store/slices/allUsersSlice';
import { setAllStatusNameState } from '../../store/slices/statusNameSlice';
import { setAllPaymentModesState } from '../../store/slices/paymentModeSlice';
import { useSelector } from 'react-redux';
import { setSideBarState } from '../../store/slices/sideBarToggleSlice';
import SettingsButtonComponent from './SettingsButtonComponent';
// import TableComponent from '@/app/common/components/TablesComponents/decaissementTable/Table'

import blueRole from "../../../../../public/white_icons/user.svg"
import whiteRole from "../../../../../public/iconsSettings/user.svg"

import blueOfficeImg from "../../../../../public/iconsSettings/building.svg"
import whiteOfficeImg from "../../../../../public/white_icons/buliding.svg"

import blueAmountImg from "../../../../../public/iconsSettings/moneys.svg"
import whiteAmountImg from "../../../../../public/white_icons/moneys.svg"

import blueDepartementImg from "../../../../../public/new_assets/newIcons/buildings_2.svg"
import whiteDepartementImg from "../../../../../public/white_icons/buildings_2.svg"

import bluebeneImg from "../../../../../public/iconsSettings/people.svg"
import whitebeneImg from "../../../../../public/white_icons/people.svg"

import blueStatusNameImg from "../../../../../public/iconsSettings/status.svg"
import whiteStatusNameImg from "../../../../../public/white_icons/status.svg"

import bluePaymentModeImg from "../../../../../public/iconsSettings/money_change.svg"
import whitePaymentModeImg from "../../../../../public/white_icons/money_change.svg"

import blueTypeDecaissImg from "../../../../../public/iconsSettings/candle.svg"
import whiteTypeDecaissImg from "../../../../../public/white_icons/candle.svg"

const SettingsPageComponent = ({ dict }: { dict: any }) => {

    const dispatch = useAppDispatch(); 

    const getAllDataForSettings = async () => {
        const settingsService = new SettingsService ();
        const userServices = new UsersService ()
        const roles_Amount = await settingsService.getRolesAmounts(); 
        const roles = await settingsService.getRoles(); 

        const cashoutTypes = await settingsService.getDisbursementTypes();
        const offices = await settingsService.getOffices();
        const departements = await settingsService.getDepartments();
        const beneficiaries = await settingsService.getBeneficiary();
        const payementMode = await settingsService.getPaymentMode();
        const statusName = await settingsService.getStatusName();

        const allUsers = await userServices.getAllUsers(); 

        allUsers.data.map((roleAm: any, id: any) => {
            dispatch(setAllUsersDisplay({...roleAm, status: "active"}))
        })

        roles_Amount.data.map((roleAm: any, id: any) => {
            dispatch(setAllRoleAmountState({
                ...roleAm, 
                status: "active"
            }))
        })

        // const theStore = store.getState().roleData; 
        const theStore2 = store.getState().roleAmountData; 
        roles.data.map((role: any, id: any) => {
            dispatch(setAllRoleState({
                ...role, 
                amount: theStore2.allRoleAmountData.find((amt, index) => {
                    amt._id === role.role_amount_id[0] || 0
                })
            }))
        })

        cashoutTypes.data.map((roleAm: any, id: any) => {
            dispatch(setAllCashoutTypeState({
                ...roleAm, 
                status: "active"
            }))
        })

        offices.data.map((roleAm: any, id: any) => {
            dispatch(setAllOfficesState({
                ...roleAm, 
                status: "active"
            }))
        })

        departements.data.map((roleAm: any, id: any) => {
            dispatch(setAllDepartementState({
                ...roleAm, 
                status: "active"
            }))
        })

        beneficiaries.data.map((roleAm: any, id: any) => {
            dispatch(setAllBeneficiariesState({
                ...roleAm, 
                status: "active"
            }))
        })

        payementMode.data.map((roleAm: any, id: any) => {
            dispatch(setAllPaymentModesState({
                ...roleAm, 
                status: "active"
            }))
        })

        statusName.data.map((roleAm: any, id: any) => {
            dispatch(setAllStatusNameState({
                ...roleAm, 
                status: "active"
            }))
        })

        console.log("==========", statusName.data)
    }

    const beneficiary = useSelector((state: RootState) => state.beneficiariesData.allBeneficiariesData)
    const userData = useSelector((state: RootState) => state.allUsersData.allUserData)
    const cashoutType = useSelector((state: RootState) => state.cashoutTypeData.allTypeCashoutData)
    const dep = useSelector((state: RootState) => state.departementData.allDepartementData)
    const office_ = useSelector((state: RootState) => state.officeData.officeData)
    const roles_amount = useSelector((state: RootState) => state.roleAmountData.allRoleAmountData)
    const roles_ = useSelector((state: RootState) => state.roleData.allRoleData)

    const refresh = useSelector((state: any) => state.refreshToggleData.refresh)

    useEffect(() => {
        getAllDataForSettings ()
    }, [
        refresh
    ])

    const [ officeTableDisplay, setOfficeTableDisplay ] = useState (false); 
    const [ departmentDisplay, setDepartmentDisplay ] = useState (false); 
    const [ companyDisplay, setCompanyDisplay ] = useState (false); 
    const [ roleDisplay, setRoleDisplay ] = useState (true); 
    const [ roleAmountDisplay, setRoleAmountDisplay ] = useState (false); 
    const [ decaissementTypeDisplay, setDecaissementTypeDisplay ] = useState (false); 
    const [ beneficiarieDisplay, setBeneficiarieDisplay ] = useState (false); 
    const [ users, setUsers ] = useState (false); 
    const [ statusNameDisplay, setStatusNameDisplay ] = useState (false); 
    const [ payementMethoDisplay, setPayementMethoDisplay ] = useState (false); 

    const [ allStatus, setAllStatus ] = useState ({
        officeTableDisplay: true, 
        companyDisplay: false,
        departmentDisplay: false, 
        roleDisplay: false, 
        roleAmountDisplay: false, 
        decaissementTypeDisplay: false, 
        beneficiarieDisplay: false, 
        users: false, 
        statusNameDisplay: false, 
        payementMethoDisplay: false,
    })

    const handleOfficeDisplay = () => {
        setOfficeTableDisplay (true)
        setCompanyDisplay (false)
        setDepartmentDisplay (false);
        setRoleDisplay (false)
        setRoleAmountDisplay (false)
        setDecaissementTypeDisplay (false)
        setBeneficiarieDisplay (false); 
        setPayementMethoDisplay (false); 
        setStatusNameDisplay (false); 
        setUsers(false)
    }
    companyDisplay
    const handleDepartmentDisplay = () => {
        setOfficeTableDisplay (false)
        setDepartmentDisplay (true);
        setCompanyDisplay(false)
        setRoleDisplay (false)
        setRoleAmountDisplay (false)
        setDecaissementTypeDisplay (false)
        setBeneficiarieDisplay (false); 
        setPayementMethoDisplay (false); 
        setStatusNameDisplay (false); 
        setUsers(false)
    }

    const handleCompanyDisplay = () => {
        setOfficeTableDisplay (false)
        setCompanyDisplay (true);
        setDepartmentDisplay (false);
        setRoleDisplay (false)
        setRoleAmountDisplay (false)
        setDecaissementTypeDisplay (false)
        setBeneficiarieDisplay (false); 
        setPayementMethoDisplay (false); 
        setStatusNameDisplay (false); 
        setUsers(false)
    }

    const handleRolesDisplay = () => {
        setOfficeTableDisplay (false)
        setCompanyDisplay(false)
        setDepartmentDisplay (false);
        setRoleDisplay (true)
        setRoleAmountDisplay (false)
        setDecaissementTypeDisplay (false)
        setBeneficiarieDisplay (false); 
        setPayementMethoDisplay (false); 
        setStatusNameDisplay (false); 
        setUsers(false)
    }

    const handleRolesAmountDisplay = () => {
        setOfficeTableDisplay (false)
        setCompanyDisplay(false)
        setDepartmentDisplay (false);
        setRoleDisplay (false)
        setRoleAmountDisplay (true)
        setDecaissementTypeDisplay (false)
        setBeneficiarieDisplay (false); 
        setPayementMethoDisplay (false); 
        setStatusNameDisplay (false); 
        setUsers(false)
    }
    const handleDecaissementTypeDisplay = () => {
        setOfficeTableDisplay (false)
        setCompanyDisplay(false)
        setDepartmentDisplay (false);
        setRoleDisplay (false)
        setRoleAmountDisplay (false)
        setDecaissementTypeDisplay (true)
        setBeneficiarieDisplay (false); 
        setPayementMethoDisplay (false); 
        setStatusNameDisplay (false); 
        setUsers(false)
    }

    const handleBeneficiaryTypeDisplay = () => {
        setOfficeTableDisplay (false)
        setCompanyDisplay(false)
        setDepartmentDisplay (false);
        setRoleDisplay (false)
        setRoleAmountDisplay (false)
        setDecaissementTypeDisplay (false)
        setBeneficiarieDisplay (true); 
        setPayementMethoDisplay (false); 
        setStatusNameDisplay (false); 
        setUsers(false)
    }

    const handleStatusNameDisplay = () => {
        setOfficeTableDisplay (false)
        setCompanyDisplay(false)
        setDepartmentDisplay (false);
        setRoleDisplay (false)
        setRoleAmountDisplay (false)
        setDecaissementTypeDisplay (false)
        setBeneficiarieDisplay (false); 
        setStatusNameDisplay (true); 
        setPayementMethoDisplay (false); 
        setUsers(false)
    }

    const handlePayementMethodDisplay = () => {
        setOfficeTableDisplay (false)
        setCompanyDisplay(false)
        setDepartmentDisplay (false);
        setRoleDisplay (false)
        setRoleAmountDisplay (false)
        setDecaissementTypeDisplay (false)
        setBeneficiarieDisplay (false); 
        setStatusNameDisplay (false); 
        setPayementMethoDisplay (true); 
        setUsers(false)
    }


    const handleUserDisplay = () => {
        setOfficeTableDisplay (false)
        setCompanyDisplay(false)
        setDepartmentDisplay (false);
        setRoleDisplay (false)
        setRoleAmountDisplay (false)
        setDecaissementTypeDisplay (false)
        setBeneficiarieDisplay (false); 
        setPayementMethoDisplay (false); 
        setStatusNameDisplay (false); 
        setUsers(true)
    }

  return (
    // <div className='p-[2rem]'>

    // </div>
        <div className='flex flex-col '>
            <div className='flex flex-col w-full justify-center content-center p-x-[2rem]'>
                <div className='flex w-full justify-center content-center'>
                    <h1 className='text-[1.5rem] font-bold text-easeBlue'>
                        {/* Paramètres */}
                        { dict?.page?.dashboard?.sideBar?.AppS?.appsettings?.appS }
                    </h1>
                </div>
                <div className='flex flex-row xl:flex-col gap-4'>
                    <div className='xl:flex w-full gap-x-[.5rem] xl:mt-[2rem] xl:justify-center xl:content-center grid justify-items-start  grid-cols-[repeat(1,minmax(50px,500px))] ml-4'>
                        <SettingsButtonComponent 
                            handleClick={ handleRolesDisplay }
                            tableDisplay={ roleDisplay }
                            normalImg={ blueRole }
                            SelectedImage={ whiteRole }
                            label={ dict?.page?.dashboard?.sideBar?.AppS?.appsettings?.role }
                        />
                        <SettingsButtonComponent 
                            handleClick={ handleOfficeDisplay }
                            tableDisplay={ officeTableDisplay }
                            normalImg={ blueOfficeImg }
                            SelectedImage={ whiteOfficeImg }
                            label={ dict?.page?.dashboard?.sideBar?.AppS?.appsettings?.company }
                        />
                        <SettingsButtonComponent 
                            handleClick={ handleRolesAmountDisplay }
                            tableDisplay={ roleAmountDisplay }
                            normalImg={ blueAmountImg }
                            SelectedImage={ whiteAmountImg }
                            label={ dict?.page?.dashboard?.sideBar?.AppS?.appsettings?.amount }
                        /> 
                        
                        <SettingsButtonComponent 
                            handleClick={ handleDepartmentDisplay }
                            tableDisplay={ departmentDisplay }
                            normalImg={ blueDepartementImg }
                            SelectedImage={ whiteDepartementImg }
                            label={ dict?.page?.dashboard?.sideBar?.AppS?.appsettings?.dept }
                        />

                        <SettingsButtonComponent 
                            handleClick={ handleCompanyDisplay }
                            tableDisplay={ companyDisplay }
                            normalImg={ blueDepartementImg }
                            SelectedImage={ whiteDepartementImg }
                            label="company"
                        />
                    
                    </div>
                    <div className='xl:flex w-full gap-x-[.5rem] xl:justify-center xl:content-center grid-cols-[repeat(4,minmax(100px,500px))] ml-4'>

                        <SettingsButtonComponent 
                            handleClick={ handleBeneficiaryTypeDisplay }
                            tableDisplay={ beneficiarieDisplay }
                            normalImg={ bluebeneImg }
                            SelectedImage={ whitebeneImg }
                            label={ dict?.page?.dashboard?.sideBar?.AppS?.appsettings?.benef }
                        />
                        <SettingsButtonComponent 
                            handleClick={ handleStatusNameDisplay }
                            tableDisplay={ statusNameDisplay }
                            normalImg={ blueStatusNameImg}
                            SelectedImage={ whiteStatusNameImg }
                            label={ dict?.page?.dashboard?.sideBar?.AppS?.appsettings?.statusName }
                        />
                        <SettingsButtonComponent 
                            handleClick={ handlePayementMethodDisplay }
                            tableDisplay={ payementMethoDisplay }
                            normalImg={ bluePaymentModeImg }
                            SelectedImage={ whitePaymentModeImg }
                            label={ dict?.page?.dashboard?.sideBar?.AppS?.appsettings?.payementMode }
                        />

                        <SettingsButtonComponent 
                            handleClick={ handleDecaissementTypeDisplay }
                            tableDisplay={ decaissementTypeDisplay }
                            normalImg={ blueTypeDecaissImg }
                            SelectedImage={ whiteTypeDecaissImg }
                            label={ dict?.page?.dashboard?.sideBar?.AppS?.appsettings?.typeD }
                        />
                       
                    </div>
                </div>
            </div>

            {
                officeTableDisplay ? 
                    <div className='pl-[2rem] pr-[2rem]'>
                        <h1 className='text-[1.1rem] font-bold text-easeBlue mt-1 mb-1'>{ dict?.page?.dashboard?.sideBar?.AppS?.appsettings?.company }</h1>
                        <OfficeTable dict={ dict } />
                    </div>
                    :
                    ""
            }

            {
                departmentDisplay ? 
                    <div className='pl-[2rem] pr-[2rem]'>
                        <h1 className='text-[1.1rem] font-bold text-easeBlue mt-1 mb-1'>{ dict?.page?.dashboard?.sideBar?.AppS?.appsettings?.dept }</h1>
                        <DepartmentTable />
                    </div>
                    :
                    ""
            }


{
                companyDisplay ? 
                    <div className='pl-[2rem] pr-[2rem]'>
                        <h1 className='text-[1.1rem] font-bold text-easeBlue mt-1 mb-1'>Company</h1>
                        <CompanyTable />
                    </div>
                    :
                    ""
            }


            {
                roleDisplay ? 
                    <div className='pl-[2rem] pr-[2rem]'>
                        <h1 className='text-[1.1rem] font-bold text-easeBlue mt-1 mb-1'>{ dict?.page?.dashboard?.sideBar?.AppS?.appsettings?.role }</h1>
                        <RolesTable />
                    </div>
                    :
                    ""
            }

            {
                roleAmountDisplay ? 
                    <div className='pl-[2rem] pr-[2rem]'>
                        <h1 className='text-[1.1rem] font-bold text-easeBlue mt-1 mb-1'>{ dict?.page?.dashboard?.sideBar?.AppS?.appsettings?.amount }</h1>
                        <RoleAmountTable />
                    </div>
                    :
                    ""
            }

            {
                decaissementTypeDisplay ? 
                    <div className='pl-[2rem] pr-[2rem]'>
                        <h1 className='text-[1.1rem] font-bold text-easeBlue mt-1 mb-1'>{ dict?.page?.dashboard?.sideBar?.AppS?.appsettings?.typeD }</h1>
                        <DecaissementTypeTable />
                    </div>
                    :
                    ""
            }

            {
                beneficiarieDisplay ? 
                    <div className='pl-[2rem] pr-[2rem]'>
                        <h1 className='text-[1.1rem] font-bold text-easeBlue mt-1 mb-1'>{ dict?.page?.dashboard?.sideBar?.AppS?.appsettings?.benef }</h1>
                        <BeneficiaryTable />
                    </div>
                    :
                    ""
            }

            {
                statusNameDisplay ? 
                    <div className='pl-[2rem] pr-[2rem]'>
                        <h1 className='text-[1.1rem] font-bold text-easeBlue mt-1 mb-1'>Nom des Status</h1>
                        <StatusNameTable />
                    </div>
                    :
                    ""
            }

            {
                payementMethoDisplay ? 
                    <div className='pl-[2rem] pr-[2rem]'>
                        <h1 className='text-[1.1rem] font-bold text-easeBlue mt-1 mb-1'>Mode de Paiements</h1>
                        <PayementModeTable />
                    </div>
                    :
                    ""
            }

        </div>
  )
}

export default SettingsPageComponent