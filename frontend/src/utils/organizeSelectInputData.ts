



import SettingsService from "@/services/settingsService";

export const OrganizeSelectDisbursmentTypesData = async () => {
    const settingsService = new SettingsService ();
    const cashoutTypes = await settingsService.getDisbursementTypes();

    return cashoutTypes?.data.map((d: any) => {
        return ({
            id: d._id, 
            value: d._id, 
            text: d.name,
        })
    })
} 

export const OrganizeSelectBeneficiareData = async () => {
    const settingsService = new SettingsService ();
    const cashoutTypes = await settingsService.getBeneficiary();

    return cashoutTypes?.data.map((d: any) => {
        return ({
            id: d._id, 
            value: d._id, 
            text: d.name,
        })
    })
} 

export const OrganizeSelectDepartmentData = async () => {
    const settingsService = new SettingsService ();
    const cashoutTypes = await settingsService.getDepartments();

    return cashoutTypes?.data.map((d: any) => {
        return ({
            id: d._id, 
            value: d._id, 
            text: d.name,
        })
    })
} 

export const OrganizeSelectPayementModeData = async () => {
    const settingsService = new SettingsService ();
    const cashoutTypes = await settingsService.getPaymentMode();

    return cashoutTypes?.data.map((d: any) => {
        return ({
            id: d._id, 
            value: d._id, 
            text: d.name,
        })
    })
} 

export const OrganizeSelectRolesData = async () => {
    const settingsService = new SettingsService ();
    const cashoutTypes = await settingsService.getRoles();

    return cashoutTypes?.data.map((d: any) => {
        return ({
            id: d._id, 
            value: d._id, 
            text: d.name,
        })
    })
} 

export const OrganizeSelectRolesAmountData = async () => {
    const settingsService = new SettingsService ();
    const cashoutTypes = await settingsService.getRolesAmounts();

    return cashoutTypes?.data.map((d: any) => {
        return ({
            id: d._id, 
            value: d._id, 
            text: d.name,
        })
    })
} 