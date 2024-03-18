import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type ButtonTypes = {
    classes?: string, 
    props?: any, 
    icon?: string, 
    children?: string, 
    passedFunction?: any, 
    link?: string, 
}

const ButtonLinkV2: React.FC<ButtonTypes> = ({ classes, props, icon, children, passedFunction, link }) => {
  return (
    <Link {...props} href={link} className={classes}>
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
      </Link>
  )
}

export default ButtonLinkV2