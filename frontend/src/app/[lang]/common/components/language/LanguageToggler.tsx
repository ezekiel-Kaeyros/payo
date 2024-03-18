"use client"
import { faChevronDown, faChevronUp, faGlobeAfrica } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
// import GenericButton from './Icons/GenericIcon';
// import i18n from '../../../../../i18n';
import { i18n } from '../../../../../i18.config';
import GenericButton from '../button/GenericIcon';
import { usePathname } from 'next/navigation';
import LanguegeTogglerStyle from "./LanguageToggler.module.scss"
// import { i18n } from '@/i18.config';

type LanguageTogglerTypes = {
    // pathname: string; 
    iconColors: string; 
    togglerWidth?: string; 
    languagePanWidth?: string; 
}

const LanguageToggler: React.FC<LanguageTogglerTypes> = ({ iconColors, togglerWidth, languagePanWidth }) => {

    const pathname = usePathname(); 
    const [ showLanguagePane, setShowLanguagePane ] = useState ( false)
    const [ displayLanguage, setDisplayLanguage ] = useState ("")

    const handleSetLanguagePane = () => {
      setShowLanguagePane (showLanguagePane => !showLanguagePane)
    }

    useEffect (() => {
        // if (!pathname) return '/';
        const segments = pathname.split('/');
        // segments[1] = locale;
        setDisplayLanguage (segments[1])
    }, [])

    const redirectedPathName = (locale: string) => {
        if (!pathname) return '/';
        const segments = pathname.split('/');
        segments[1] = locale;
        return segments.join('/');
    };

    const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false); 
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });
  return (
    <div style={{
        width: togglerWidth ? togglerWidth : "auto",
    }} className={LanguegeTogglerStyle['languageButtonToggler']} id="language-picker-select">
        <div className={LanguegeTogglerStyle['languageButtonTogglerBtnContainer']} onClick={handleSetLanguagePane}>
            {/* <GenericButton color={ iconColors } icon={ faGlobeAfrica } /> */}
            <span style={{
                color: "white"
            }}>
            { displayLanguage === "en" ? "English" : "Français" }
            </span>
            {
            showLanguagePane ?
                <GenericButton color={ iconColors } icon={ faChevronUp } />
                :
                <GenericButton color={ iconColors } icon={ faChevronDown } />
            }
        </div>

        <div style={{
                width: languagePanWidth ? languagePanWidth : "auto",
            }} className={ showLanguagePane ? LanguegeTogglerStyle["LanguageContainer"] : LanguegeTogglerStyle["LanguageContainerHide"]}>
            {
                i18n.locales.map((locale: any) => {
                let value_ = "Français"
                let imgLink = "";
                if (locale === "en") {
                    value_ = "English"
                    // imgLink = "https://img.icons8.com/?size=512&id=t3NE3BsOAQwq&format=png"
                    imgLink = "https://cdn.britannica.com/25/4825-004-F1975B92/Flag-United-Kingdom.jpg"
                } else {
                    value_ = "Francais"
                    imgLink = "https://cdn.pixabay.com/photo/2013/07/13/14/15/france-162295_1280.png"
                }
                return (
                    <div className={LanguegeTogglerStyle["listButtonsLanguage"]} key={locale} lang={locale} >
                        {/* onClick={ () => loadData () } value={ value_ } */}
                        <Link href={redirectedPathName(locale)} className="py-2 text-easeBlue flex flex-row" style={{
                            // color: 'white',
                            fontSize: '1rem'
                        }}>
                            {/* <img src={ imgLink } className="w-5 h-5" /> */}
                            { value_ }
                        </Link>
                    </div>
                    
                );
                })}

        </div>

    </div>
  )
}

export default LanguageToggler





// "use client"
// import { faChevronDown, faChevronUp, faGlobeAfrica } from '@fortawesome/free-solid-svg-icons';
// import Link from 'next/link';
// import React, { useEffect, useRef, useState } from 'react'
// // import GenericButton from './Icons/GenericIcon';
// import i18n from '../../../../../i18n';
// import GenericButton from '../button/GenericIcon';
// import { usePathname } from 'next/navigation';
// import LanguegeTogglerStyle from "./LanguageToggler.module.scss"
// // import { i18n } from '@/i18.config';

// type LanguageTogglerTypes = {
//     // pathname: string; 
//     iconColors: string; 
//     togglerWidth?: string; 
//     languagePanWidth?: string; 
// }

// const LanguageToggler: React.FC<LanguageTogglerTypes> = ({ iconColors, togglerWidth, languagePanWidth }) => {

//     const pathname = usePathname(); 
//     const [ showLanguagePane, setShowLanguagePane ] = useState ( false)

//     const redirectedPathName = (locale: string) => {
//         if (!pathname) return '/';
//         const segments = pathname.split('/');
//         segments[1] = locale;
//         return segments.join('/');
//     };
//   return (
//     <div style={{
//         width: togglerWidth ? togglerWidth : "auto",
//     }} className={LanguegeTogglerStyle['languageButtonToggler']} id="language-picker-select">
        
//         <div className={`${LanguegeTogglerStyle['languageButtonTogglerBtnContainer']} flex gap-x-[2rem]`} >
//             <span style={{
//                 color: "white"
//             }}>
//                 <Link href={redirectedPathName("fr")} className="py-2" style={{
//                             color: 'white',
//                             fontSize: '1rem'
//                         }}>
//                             <img src={ "https://cdn.pixabay.com/photo/2013/07/13/14/15/france-162295_1280.png" } className="w-5 h-5" />
//                             {/* { value_ } */}
//                         </Link>
//             </span>
//             <span style={{
//                 color: "white"
//             }}>
//                 <Link href={redirectedPathName("en")} className="py-2" style={{
//                             color: 'white',
//                             fontSize: '1rem'
//                         }}>
//                             <img src={ "https://cdn.britannica.com/25/4825-004-F1975B92/Flag-United-Kingdom.jpg" } className="w-5 h-5" />
//                             {/* { value_ } */}
//                         </Link>
//             </span>
//         </div>

//         <div style={{
//                 width: languagePanWidth ? languagePanWidth : "auto",
//             }} className={ showLanguagePane ? LanguegeTogglerStyle["LanguageContainer"] : LanguegeTogglerStyle["LanguageContainerHide"]}>
//             {
//                 i18n.locales.map((locale) => {
//                 let value_ = "francais"
//                 let imgLink = "";
//                 if (locale === "en") {
//                     value_ = "English"
//                     // imgLink = "https://img.icons8.com/?size=512&id=t3NE3BsOAQwq&format=png"
//                     imgLink = "https://cdn.britannica.com/25/4825-004-F1975B92/Flag-United-Kingdom.jpg"
//                 } else {
//                     value_ = "Francais"
//                     imgLink = "https://cdn.pixabay.com/photo/2013/07/13/14/15/france-162295_1280.png"
//                 }
//                 return (
//                     <div className={LanguegeTogglerStyle["listButtonsLanguage"]} key={locale} lang={locale} >
//                         {/* onClick={ () => loadData () } value={ value_ } */}
//                         <Link href={redirectedPathName(locale)} className="py-2" style={{
//                             color: 'white',
//                             fontSize: '1rem'
//                         }}>
//                             <img src={ imgLink } className="w-5 h-5" />
//                             {/* { value_ } */}
//                         </Link>
//                     </div>
                    
//                 );
//                 })}

//         </div>

//     </div>
//   )
// }

// export default LanguageToggler
