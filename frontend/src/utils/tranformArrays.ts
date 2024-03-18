export type UserInArrayType = Array <{
    _id: string,
    role: Array<{
        _id: string,
        role_amount_id: Array<{
            _id: string,
            amount: number,
            createdAt: string,
            updatedAt: string,
        }>,
        name: string,
        active: boolean,
        level: number, 
        createdAt: string,
        updatedAt: string,
    }> ,
    department_id: Array<{
        _id: string,
        office_id: Array<string>,
        name: string,
        active: boolean,
        createdAt: string,
        updatedAt: string,
    }>,
    email: string,
    first_name: string,
    last_name: string,
    active: boolean,
    createdAt: string,
    updatedAt: string,
}>


export const getUsersGeneric: any = (allUsers: UserInArrayType, level: number) => {
    let result; 
    if (level || level > 0) {
        result = allUsers.filter ((user: any, index: any) => {
            if (level === user?.level) {
                return user
            }
        })
        return result 
    }
}


export const getChefDepsGeneric: any = (allUsers: UserInArrayType, level: number, myDep: string) => {
    let result; 
    if (level > 0) {
        result = allUsers.filter ((user: any, index: any) => {
            // console.log(user.department_id[0]._id)
            if (level === parseInt(user?.role[0]?.level) && myDep === user?.department_id[0]?._id) {
                return user
            }
        })
        return result 
    }
}

export const getUserGenericFunc: any = (allUsers: UserInArrayType, level: number) => {
    let result; 
    if (level > 0) {
        result = allUsers.filter ((user: any, index: any) => {
            // console.log(user.department_id[0]._id)
            if (level === parseInt(user?.role[0]?.level) ) {
                return user
            }
        })
        return result 
    }
}

export const getUserGenericFuncFiliale: any = (allUsers: UserInArrayType, level: number, office_id: string) => {
    let result; 
    if (level > 0) {
        result = allUsers.filter ((user: any, index: any) => {
            // console.log(user.department_id[0]._id)
            if (level === parseInt(user?.role[0]?.level && office_id === user?.department_id[0]?.office_id[0]) ) {
                return user
            }
        })
        return result 
    }
}


export const filterAllValidatorsMap: any = (allUsers: UserInArrayType) => {
    const result = allUsers.filter((user: any, index: any) => {
        // console.log("---------------", user)
        if (user?.role[0]?.role_amount_id[0]?.amount > 0) {
            return user
        }
    })
    return result
}

export const newTranformedValidatorArray: any = (allValidatorsMap: UserInArrayType) => {
    allValidatorsMap.map((finalValidato: any) => {
        return {
            id: finalValidato?._id, 
            name: `${ finalValidato?.first_name } ${ finalValidato?.last_name }`, 
            amount: finalValidato?.role[0]?.role_amount_id[0]?.amount,
        }
    });
    return allValidatorsMap;
}

export const transforArrayForSelectInputField: any = (data: any) => {
    let result = data.map((d: any) => {
        return ({
            id: d?._id, 
            value: d?._id, 
            text: d?.name,
        })
    }); 
    return result; 
}




