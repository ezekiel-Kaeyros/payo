"use client"; 

import React, { useContext } from 'react'
import toast from 'react-hot-toast'; 
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
// import { signOut, useSession } from "next-auth/react"
import LanguegeTogglerStyle from "./ImageIcon.module.scss"

type GenericButtonTypes = {
  typE?: string; 
  color: string; 
  fontSize?: string; 
  icon: any; 
}

const GenericButton: React.FC<GenericButtonTypes> = ({ typE, color, fontSize, icon }) => {

  return (
    <div className='GenericButtonStyle'>
        <span>
            <div className={ LanguegeTogglerStyle[color] }>
                <FontAwesomeIcon icon={ icon } style={{ fontSize: `${ fontSize ? fontSize : "1.5rem" }` }} />
            </div>
        </span>
    </div>
  )
}

export default GenericButton