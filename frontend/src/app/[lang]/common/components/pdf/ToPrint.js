import { CounterContext } from '@/context/app.context';
import dayjs from 'dayjs';
import Image from 'next/image';
import React, { useContext, useRef, useState } from 'react'; 
import { DatePicker, Space, InputNumber, Select } from 'antd'; 
import Link from 'next/link';
import TextAreaInput from './inputsComponent/TextAreaInput';
import NumberInputs from './inputsComponent/NumberInputs';
import usePdf from './pdf/modulePdf';
import { useRouter } from 'next/navigation';

const { Option } = Select; 
const PopupPreviewToPrint = ( { dataToPrint } ) => {
    const router = useRouter(); 
    const [ options, setOptions ] = useState({ year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }); 
    const { state, dispatch } = useContext(CounterContext); 
    const selectAfter = (
        <Select
            disabled
          defaultValue="XAF"
          value={ state.currency }
          style={{
            width: 100, 
            padding: ".5rem",
          }}
        >
          <Option value="XAF">XAF</Option>
          <Option value="USD">$</Option>
          <Option value="EUR">€</Option>
          <Option value="GBP">£</Option>
          <Option value="CNY">¥</Option>
        </Select>
    );

    console.log(state)

    const handlerNextActionPane = () => {
        dispatch({ type: "HIDECHOICEWINDOW" })
        dispatch({ type: "SHOWDATATOPRINTPRIVIEW" })
        dispatch({ type: "HIDELOADINAFTERSAVING" })
        dispatch({ type: "HIDEPREVIEW" })
        dispatch({ type: "LOADDATATOPRINT", dataToPrint: dataToPrint }); 
        
    }

    const resetEveythingGoBackToMainMenu = () => {

        handlerNextActionPane ()
        dispatch({ type: "HIDEDATATOPRINTPRIVIEW" })
        dispatch({ type: "RESETFORM" }); 
        dispatch({ type: "ADDDBUTTON" })
        dispatch({ type: "SETSHIDEINPUTATIONNUMBER" }) 
        dispatch({ type: "SHOWMAINWINDOW" }) 
        router.push("/office"); 

    }

    const refDiv = useRef();
    const function_pdf=usePdf(refDiv);
  return (
    
    <div className='DecaissementPagePreview' style={{
        zIndex: "10"
    }}>
        <div className='InnerContent'>
            <div className="headerDiv" style={{
                cursor: "pointer"
            }} onClick={() => dispatch({ type: "HIDEDATATOPRINTPRIVIEW" })}>
                <div className='Image'>
                    <Image alt='new_image' src="/new_assets/goBack.png" width={25} height={25} />
                </div>
                Retour
            </div>
            <div className="bodyContainer" style={{
                padding: "2rem 5rem",
    
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)", 
                gridTemplateColumns: "1fr",
                gap: "2rem",
            }} >
                <div className='leftSide' style={{
                    display: "grid", 
                    gap: "2rem", 
                    padding: "3rem"
                }} ref={refDiv}>
                    <div className='Image' style={{
                        textAlign: 'center', 
                        
                    }}>
                        <Image alt='new_image' src="/new_assets/logo/darkLogo.png" width={100} height={100} />
                    </div>
                    <div className="InputLine" style={{
                        display: "grid", 
                        gridTemplateColumns: "repeat(2, 1fr)", 
                        gap: "2rem",
                    }}>
                        
                        <div className="InputDiv"  >
                            <div className='Image' style={{
                                position: "absolute",
                                width: "30px",
                                left: "5%",
                            }}>
                                <Image alt='new_image' src="/new_assets/login_page/usernameIcon.png" width={25} height={25} />
                            </div>
                            <span style={{
                                transform: "translateY(-100%)",
                                position: "absolute", 
                                zIndex: "2",
                                opacity: "1",
                                fontSize: ".8rem",
                                top: "-10%",
                            }}>Numero d&lsquo;Inputation</span>
                            <input style={{
                                paddingLeft: "2rem",
                                border: "none",
                                outline: "none",
                                backgroundColor: "#F8F9FA!important",
                                backgroundColor: "transparent!important",
                            }} disabled value={ `${dataToPrint?.inputationNumber}` } type='text' className='InputElement' placeholder="Nom de l'initiateur" />
                        </div>
                    </div>
                    <div className="InputLine" style={{
                        display: "grid", 
                        gridTemplateColumns: "repeat(2, 1fr)", 
                        gap: "2rem",
                    }}>
                        <div className="InputDiv" style={{
                            position: "relative",
                            border: "#CED4DA 1.5px solid", 
                            backgroundColor: "#F8F9FA",
                            borderRadius: "1rem", 
                            padding: "1rem 2rem",
                        }}>
                            <div className='Image' style={{
                                position: "absolute",
                                width: "30px",
                                left: "5%",
                            }}>
                                <Image alt='new_image' src="/new_assets/login_page/usernameIcon.png" width={25} height={25} />
                            </div>
                            <span style={{
                                transform: "translateY(-100%)",
                                position: "absolute", 
                                zIndex: "2",
                                opacity: "1",
                                fontSize: ".8rem",
                                top: "-10%",
                            }}>Filiale</span>
                            <input style={{
                                paddingLeft: "2rem",
                                border: "none",
                                outline: "none",
                                backgroundColor: "#F8F9FA!important",
                                backgroundColor: "transparent!important",
                            }} disabled value={dataToPrint?.filiale} type='text' className='InputElement' placeholder="Filiale" />
                        </div>
                        <div className="InputDiv"  >
                            <div className='Image' style={{
                                position: "absolute",
                                width: "30px",
                                left: "5%",
                            }}>
                                <Image alt='new_image' src="/new_assets/login_page/usernameIcon.png" width={25} height={25} />
                            </div>
                            <span style={{
                                transform: "translateY(-100%)",
                                position: "absolute", 
                                zIndex: "2",
                                opacity: "1",
                                fontSize: ".8rem",
                                top: "-10%",
                            }}>Nom de l&apos;initiateur</span>
                            <input style={{
                                paddingLeft: "2rem",
                                border: "none",
                                outline: "none",
                                backgroundColor: "#F8F9FA!important",
                                backgroundColor: "transparent!important",
                            }} disabled value={ `${dataToPrint?.firstName} ${dataToPrint?.lastName}` } type='text' className='InputElement' placeholder="Nom de l'initiateur" />
                        </div>
                    </div>
                    <div className="InputLine" style={{
                        display: "grid", 
                        gridTemplateColumns: "repeat(2, 1fr)", 
                        gap: "2rem",
                    }}>
                        <div className="InputDiv">
                            <div className='Image' style={{
                                position: "absolute",
                                width: "30px",
                                left: "5%",
                            }}>
                                <Image alt='new_image' src="/new_assets/login_page/usernameIcon.png" width={25} height={25} />
                            </div>
                            <span style={{
                                transform: "translateY(-100%)",
                                position: "absolute", 
                                zIndex: "2",
                                opacity: "1",
                                fontSize: ".8rem",
                                top: "-10%",
                            }}>Date</span>
                            <input style={{
                                paddingLeft: "2rem",
                                border: "none",
                                outline: "none",
                                backgroundColor: "#F8F9FA!important",
                                backgroundColor: "transparent!important",
                            }} disabled defaultValue={new Date()}  type='text' value={`${new Date(state?.newDate)?.toLocaleDateString("fr-FR", options)} ${new Date(state?.newDate).getHours()}H : ${ new Date(state?.newDate).getMinutes()}M : ${ new Date(state?.newDate).getSeconds()}s`} className='InputElement' placeholder="Date" />
                        </div>
                        <div className="SelectInputDiv" style={{
                                position: "relative",
                                border: "#CED4DA 1.5px solid", 
                                backgroundColor: "#F8F9FA", 
                                borderRadius: "1rem", 
                                padding: "1rem 2rem",
                                transition: "all ease-in-out .3s",
                        }} >
                            <div className='Image' style={{
                                position: "absolute",
                                width: "30px",
                                left: "5%",
                            }}>
                                <Image alt='new_image' src="/new_assets/login_page/usernameIcon.png" width={25} height={25} />
                            </div>
                            <span style={{
                                transform: "translateY(-100%)",
                                position: "absolute", 
                                zIndex: "2",
                                opacity: "1",
                                fontSize: ".8rem",
                                top: "-10%",
                            }}>Type de Decaissement</span>
                            <select disabled className="inputElement">
                                <option value={ dataToPrint?.choosenDecaissementType } >{ dataToPrint?.choosenDecaissementType }</option>
                            </select>
                        </div>
                    </div>
                    <div className="InputLine" style={{
                        display: "grid", 
                        gridTemplateColumns: "repeat(2, 1fr)", 
                        gap: "2rem",
                    }}>
                        <div className="SelectInputDiv" style={{
                                position: "relative",
                                border: "#CED4DA 1.5px solid", 
                                backgroundColor: "#F8F9FA", 
                                borderRadius: "1rem", 
                                padding: "1rem 2rem",
                                transition: "all ease-in-out .3s",
                        }}  >
                            <div className='Image' style={{
                                position: "absolute",
                                width: "30px",
                                left: "5%",
                            }}>
                                <Image alt='new_image' src="/new_assets/login_page/usernameIcon.png" width={25} height={25} />
                            </div>
                            <span style={{
                                transform: "translateY(-100%)",
                                position: "absolute", 
                                zIndex: "2",
                                opacity: "1",
                                fontSize: ".8rem",
                                top: "-10%",
                            }}>Beneficiaire</span>
                            <select disabled className="inputElement" value={ dataToPrint?.choosenBenef } >
                                <option value={state?.choosenBeneficiaryObj?.id} >{ dataToPrint?.choosenBenef}</option>
                            </select>
                        </div>

                        <div className="NumberInputDiv" style={{
                            position: "relative",
                            border: "#CED4DA 1.5px solid", 
                            backgroundColor: "#F8F9FA",
                            borderRadius: "1rem", 
                            padding: "1rem 2rem",
                            transition: "all ease-in-out .3s",
                        }} >
                            <div className='Image' style={{
                                position: "absolute",
                                width: "30px",
                                left: "5%",
                            }}>
                                <Image alt='new_image' src="/new_assets/login_page/usernameIcon.png" width={25} height={25} />
                            </div>
                            <span style={{
                                transform: "translateY(-100%)",
                                position: "absolute", 
                                zIndex: "2",
                                opacity: "1",
                                fontSize: ".8rem",
                                top: "-10%",
                            }}>Montant</span>
                            
                            <input style={{
                                paddingLeft: "2rem",
                                border: "none",
                                outline: "none",
                                backgroundColor: "#F8F9FA!important",
                                backgroundColor: "transparent!important",
                            }} disabled type="number" min={1} 
                                defaultValue={dataToPrint?.amount}
                                className='InputElement' placeholder="Montant" />
                        </div>
                    </div>
                    <div className="InputLine" style={{
                            display: "grid",  
                            gridTemplateColumns: "repeat(2, 1fr)", 
                            gap: "2rem",

                         }}>
                         <TextAreaInput value={ dataToPrint?.amountInWords} label="Montant En Lettre" disabled={true} />
                    </div>
                    <div className="InputLine" style={{
                            display: "grid",  
                            gridTemplateColumns: "repeat(2, 1fr)", 
                            gap: "2rem",

                         }}>
                        <div className="SelectInputDiv" style={{
                                position: "relative",
                                border: "#CED4DA 1.5px solid", 
                                backgroundColor: "#F8F9FA", 
                                borderRadius: "1rem", 
                                padding: "1rem 2rem",
                                transition: "all ease-in-out .3s",
                        }}>
                            <div className='Image' style={{
                                position: "absolute",
                                width: "30px",
                                left: "5%",
                            }}>
                                <Image alt='new_image' src="/new_assets/login_page/usernameIcon.png" width={25} height={25} />
                            </div>
                            <span style={{
                                transform: "translateY(-100%)",
                                position: "absolute", 
                                zIndex: "2",
                                opacity: "1",
                                fontSize: ".8rem",
                                top: "-10%",
                            }}>Type de paiement</span>
                            <select disabled value={dataToPrint?.choosenPaymentType} className="inputElement" >
                                <option value="" >{dataToPrint?.choosenPaymentType}</option>
                            </select>
                        </div>
                        <div className="InputDiv"  >
                            <div className='Image' style={{
                                position: "absolute",
                                width: "30px",
                                left: "5%",
                            }}>
                                <Image alt='new_image' src="/new_assets/login_page/usernameIcon.png" width={25} height={25} />
                            </div>
                            <span style={{
                                transform: "translateY(-100%)",
                                position: "absolute", 
                                zIndex: "2",
                                opacity: "1",
                                fontSize: ".8rem",
                                top: "-10%",
                            }}>Numéro de Facture (champ optionnel)</span>
                            <input style={{
                                paddingLeft: "2rem",
                                border: "none",
                                outline: "none",
                                backgroundColor: "#F8F9FA!important",
                                backgroundColor: "transparent!important",
                            }} disabled value={dataToPrint?.invoiceNumber} type='text' className='InputElement' placeholder="Numéro de Facture" />
                        </div>
                    </div>

                    <div className="InputLine" style={{
                        display: "grid", 
                        gridTemplateColumns: "repeat(2, 1fr)", 
                        gap: "2rem",
                    }}>
                        <div className="InputLineTextAreaStyle" style={{
                            display: "grid", 
                            gridTemplateColumns: "207%",
                        }}>
                            <div className="inputItemTextArea" style={{
                                width: "100%", 
                                position: "relative",
                                transition: "all ease-in-out .3s",
                            }}>
                                <span style={{
                                transform: "translateY(-100%)",
                                position: "absolute", 
                                zIndex: "2",
                                opacity: "1",
                                fontSize: ".8rem",
                                top: "-10%",
                            }}>Motif de Décaissement</span>
                                <textarea style={{
                                    border: "#CED4DA 1.5px solid", 
                                    backgroundColor: "#F8F9FA",
                                    borderRadius: "1rem", 
                                    width: "100%!important", 
                                    transition: "all ease-in-out .3s",
                                    padding: "1rem", 
                                    transition: "all ease-in-out .3s",
                                }} disabled value={ state.cashoutNote} placeholder='Motif de Décaissement' name="" id="" cols="80" rows="1" >
                                </textarea>
                            </div>
                        </div>
                    </div>

                    <div className="InputLine" style={{
                        display: "grid", 
                        gridTemplateColumns: "repeat(2, 1fr)", 
                        gap: "2rem",
                    }}>
                        <div className="InputDiv">
                            <div className='Image' style={{
                                position: "absolute",
                                width: "30px",
                                left: "5%",
                            }}>
                                <Image alt='new_image' src="/new_assets/login_page/usernameIcon.png" width={25} height={25} />
                            </div>
                            <span style={{
                                transform: "translateY(-100%)",
                                position: "absolute", 
                                zIndex: "2",
                                opacity: "1",
                                fontSize: ".8rem",
                                top: "-10%",
                            }}>Departement</span>
                            <input style={{
                                paddingLeft: "2rem",
                                border: "none",
                                outline: "none",
                                backgroundColor: "#F8F9FA!important",
                                backgroundColor: "transparent!important",
                            }} disabled value={dataToPrint?.choosenService} type='text' className='InputElement' placeholder="Filiale" />
                        </div>
                        <div className="InputDiv"  >
                            <div className='Image' style={{
                                position: "absolute",
                                width: "30px",
                                left: "5%",
                            }}>
                                <Image alt='new_image' src="/new_assets/login_page/usernameIcon.png" width={25} height={25} />
                            </div>
                            <span style={{
                                transform: "translateY(-100%)",
                                position: "absolute", 
                                zIndex: "2",
                                opacity: "1",
                                fontSize: ".8rem",
                                top: "-10%",
                            }}>Chef de Departement</span>
                            <input style={{
                                paddingLeft: "2rem",
                                border: "none",
                                outline: "none",
                                backgroundColor: "#F8F9FA!important",
                                backgroundColor: "transparent!important",
                            }} disabled value={ `${dataToPrint?.chefDepfirstName} ${dataToPrint?.chefDepLastName}` } type='text' className='InputElement' placeholder="Nom de l'initiateur" />
                        </div>
                    </div>

                    <div className="InputLine" style={{
                        display: "grid", 
                        gridTemplateColumns: "repeat(2, 1fr)", 
                        gap: "2rem",
                    }}>
                        <div className="InputDiv">
                            <div className='Image' style={{
                                position: "absolute",
                                width: "30px",
                                left: "5%",
                            }}>
                                <Image alt='new_image' src="/new_assets/login_page/usernameIcon.png" width={25} height={25} />
                            </div>
                            <span style={{
                                transform: "translateY(-100%)",
                                position: "absolute", 
                                zIndex: "2",
                                opacity: "1",
                                fontSize: ".8rem",
                                top: "-10%",
                            }}>Chef Financier</span>
                            <input style={{
                                paddingLeft: "2rem",
                                border: "none",
                                outline: "none",
                                backgroundColor: "#F8F9FA!important",
                                backgroundColor: "transparent!important",
                            }} disabled value={`${dataToPrint?.cfofirstName} ${dataToPrint?.cflastName}`} type='text' className='InputElement' placeholder="Filiale" />
                        </div>
                        <div className="InputDiv"  >
                            <div className='Image' style={{
                                position: "absolute",
                                width: "30px",
                                left: "5%",
                            }}>
                                <Image alt='new_image' src="/new_assets/login_page/usernameIcon.png" width={25} height={25} />
                            </div>
                            <span style={{
                                transform: "translateY(-100%)",
                                position: "absolute", 
                                zIndex: "2",
                                opacity: "1",
                                fontSize: ".8rem",
                                top: "-10%",
                            }}>Validateur</span>
                            <input style={{
                                paddingLeft: "2rem",
                                border: "none",
                                outline: "none",
                                backgroundColor: "#F8F9FA!important",
                                backgroundColor: "transparent!important",
                            }} disabled type='text' value={ dataToPrint?.validatorfullName } className='InputElement' placeholder="Nom du Validateur" />
                        </div>
                    </div>


                </div>
                <div className="InputLineBTN" style={{
                    marginTop: "2rem",
                    display: "grid", 
                    padding: "0rem",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gridTemplateColumns: "1fr 1fr 5fr", 
                    gap: "1rem",
                }}>
                    <div className="ButtonContainerDeepTransparent">
                        <div className='ButtonDivFillPrimary'>
                            <button onClick={ () => function_pdf() } type='submit' className='Button'>Telechargez PDF</button>
                        </div>
                    </div>
                    <div className='ButtonDivFillPrimaryLight'>
                        <button onClick={ resetEveythingGoBackToMainMenu } className='Button'>Page d&apos;accueil</button>
                    </div>
                    
                </div>
                <div className='rightSide'>
                    <div className="InputLine">
                        
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default PopupPreviewToPrint













