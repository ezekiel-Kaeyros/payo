import Image from 'next/image'

import React, { ReactNode } from 'react'

type ButtonTypes = {
    classes?: string, 
    props?: any, 
    icon?: string, 
    children?: ReactNode, 
    passedFunction?: any, 
    passedFunction2?: any, 
    disabled?: boolean,
}

const ButtonV2: React.FC<ButtonTypes> = ({ disabled, classes, props, icon, children, passedFunction, passedFunction2 }) => {
    return (
        <button disabled={ disabled } {...props} onClick={(e) => {if (passedFunction) passedFunction (e); if (passedFunction2) passedFunction2 ()}} className={classes}>
            <div className="flex items-center">
                {
                  icon ? 
                    <span className="mr-2">
                      <Image src={icon} alt={'Icon'} /> 
                    </span>
                  : 
                  ''
                }
              {children}
            </div>
          </button>
    )
}

export default ButtonV2