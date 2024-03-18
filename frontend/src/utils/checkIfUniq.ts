



export const isUniqElement = (arr: [{}], dataToCompare: "") => {
    const nameExists = arr.find((rol: any) => {
        return rol.name.toLowerCase() === dataToCompare.toLowerCase()
    })
    if (nameExists) return true
    return false
}

export const isUniqElementById = (arr: [{}], dataToCompare: "") => {
    const nameExists = arr.find((rol: any) => {
        // console.log(rol.id, dataToCompare)
        return rol.id === dataToCompare
    })
    if (nameExists) return true
    return false
}

export const isUniqElementAmount = (arr: [{}], amount: number) => {
    console.log(amount)
    const nameExists = arr.find((rol: any) => {
        // console.log(rol.amount)
        return rol.amount === amount
    })
    if (nameExists) return true
    return false
}

export const isAnyLevelGreaterThanOne = (arr: [{}], levelToCompare: number) => {
    const levelUsed = arr.filter((rol: any) => {
        return rol.level === levelToCompare && rol.level > 1
    }); 
    if (levelUsed.length > 0) return true
    return false
}

export const isDepartmentExistForOffice = (arr: [{}], deaprtementName: string, city: string) => {
    const officeDepExists = arr.filter((dep: any) => {
        // console.log(dep, dep?.office_id?.name.toLowerCase(), city.toLowerCase())
        // console.log(dep?.office_id?.name.toLowerCase() === city.toLowerCase(), dep?.name.toLowerCase() === deaprtementName.toLowerCase())
        return dep?.office_id?.name.toLowerCase() === city.toLowerCase() && dep?.name.toLowerCase() === deaprtementName.toLowerCase()
    }); 
    if (officeDepExists.length > 0) return true
    return false
}

export const isRoleAlreadyAssignedToUser = (arr: [{}], roleId: string) => {
    const roleAssigned = arr?.filter((user: any) => {
        // console.log(roleId, 
        //     user, user?.role[0]?._id, user?.role[0]?.level, user?.role[0]?.role_amount_id
        //     )
        return user?.role[0]?._id === roleId && user?.role[0]?.level === 1 && user?.role[0]?.role_amount_id[0]?.amount > 0
    }); 
    // console.log(roleAssigned, "vana vana")
    if (roleAssigned.length > 0) return true
    return false
}

export const isDepartmentHasChefInOffice = (arr: [{}], roleId: string, departId: string, officeId: string) => {
    const roleAssigned = arr?.filter((user: any) => {
        // console.log(roleId, 
        //     departId, 
        //     user, user?.role[0]?._id, user?.role[0]?.level, user?.role[0]?.role_amount_id
        //     )
        return (
            user?.role[0]?._id === roleId 
            && user?.role[0]?.level === 2 
            && user?.role[0]?.role_amount_id[0]?.amount === 0 
            && user?.department_id[0]?._id === departId
            && user?.office_id[0]?._id === officeId
        )
    }); 
    // console.log(roleAssigned, "vana vana")
    if (roleAssigned.length > 0) return true
    return false
}
