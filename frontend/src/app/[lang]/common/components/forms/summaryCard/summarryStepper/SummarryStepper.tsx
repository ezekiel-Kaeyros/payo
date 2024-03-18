import React, { useState } from 'react'
import StepperItem from './stepperItem/StepperItem';

type SummarryStepperTypes = {
    id: number,
    theAgentFullName: string; 
    theFinancialChief: string;
    theDepartmentChef: string;
    theCashier: string; 
    date: string; 
    chefDepValidationSatus: string;
    cfoValidationStatus: string;
    validatorStatus: string;
    initiator_status: string; 
    chefDepValidationTime: string;
    cfoValidationTime: string;
    validatorTime: string;
    initiator_Time: string;
}

const SummarryStepper: React.FC<SummarryStepperTypes> = ({ 
            id, theAgentFullName, theFinancialChief, 
            theDepartmentChef, theCashier, date, 
            chefDepValidationSatus, cfoValidationStatus, 
            validatorStatus, initiator_status, 
            chefDepValidationTime, cfoValidationTime, validatorTime, initiator_Time
        }) => {

    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }

    const validationData = [
        {
            id: 1, 
            validationType: "Validation Administrative", 
            adminValidationName: theDepartmentChef, 
            status: chefDepValidationSatus, 
            date: new Date(chefDepValidationTime)?.toLocaleDateString("fr-FR", options), 
            time: `${new Date(chefDepValidationTime).getHours()}H : ${ new Date(chefDepValidationTime).getMinutes()}M : ${ new Date(chefDepValidationTime).getSeconds()}s` // the date taken above will the one to be formated using the function above
        }, 
        {
            id: 2, 
            validationType: "Validation Financiere", 
            adminValidationName: theFinancialChief, 
            status: cfoValidationStatus, 
            date: new Date(cfoValidationTime)?.toLocaleDateString("fr-FR", options), 
            time: `${new Date(cfoValidationTime).getHours()}H : ${ new Date(cfoValidationTime).getMinutes()}M : ${ new Date(cfoValidationTime).getSeconds()}s` // the date taken above will the one to be formated using the function above
        }, 
        {
            id: 3, 
            validationType: "Caisse", 
            adminValidationName: theCashier, 
            status: validatorStatus, 
            date: new Date(validatorTime)?.toLocaleDateString("fr-FR", options), 
            time: `${new Date(validatorTime).getHours()}H : ${ new Date(validatorTime).getMinutes()}M : ${ new Date(validatorTime).getSeconds()}s` // the date taken above will the one to be formated using the function above
        }, 
        {
            id: 4, 
            validationType: "Initiateur", 
            adminValidationName: theAgentFullName, 
            status: initiator_status, 
            date: new Date(initiator_Time)?.toLocaleDateString("fr-FR", options), 
            time: `${new Date(initiator_Time).getHours()}H : ${ new Date(initiator_Time).getMinutes()}M : ${ new Date(initiator_Time).getSeconds()}s` // the date taken above will the one to be formated using the function above
        }
    ]


  return (

    <div className='w-full'>
        <div className='Header'>
            <h1 className='text-[1.1rem] font-bold text-easeBlue mt-1 mb-1'>Validateurs</h1>
        </div>
        <div className='relative mt-[1rem] flex flex-row w-full'>
            {
                validationData && validationData.map((validation, index) => {
                    return(
                        <StepperItem 
                            key={ index }
                            status={validation.status as any} 
                            validationType={validation.validationType}
                            admin={validation.adminValidationName}
                            date={validation.date} 
                            time={validation.time}
                        />
                    )
                })
            }

        </div>
    </div>
  )
}

export default SummarryStepper












