




// await new Promise((resolve: any) => setTimeout(resolve, 10000))







// const validators = [
//     {
//         id: "1", 
//         name: "Ariel Mboma", 
//         amount: 500000,
//     }, 
//     {
//         id: "2", 
//         name: "Stephan Kamga", 
//         amount: 3000000,
//     }, 
//     {
//         id: "3", 
//         name: "Franck Dakayi", 
//         amount: 9999999999,
//     }, 
// ]




        // dispatch(setInitiatorState(data.initiator))
        // dispatch(setDateState(data.date))
        // dispatch(setOfficeState(data.office)); 
        // dispatch(setDecaissementTypeState(data.decaissementType));
        // JSON.stringify(localStorage.setItem("cashoutType", data.decaissementType))
        // dispatch(setBeneficiaryState(data.beneficiary)); 
        // JSON.stringify(localStorage.setItem("beneficiary", data.beneficiary))
        // // dispatch(setAmountState(data.amount)); 
        // JSON.stringify(localStorage.setItem("amount", data.amount))
        // dispatch(setPaymentModeState(data.payementMode))
        // JSON.stringify(localStorage.setItem("payementMode", data.payementMode))
        // dispatch(setInvoiceNumberState(data.invoiceNumber))
        // JSON.stringify(localStorage.setItem("invoiceNumber", data.invoiceNumber))
        // dispatch(setCashoutNoteState(data.cashoutNote))
        // JSON.stringify(localStorage.setItem("cashoutNote", data.cashoutNote))
        // dispatch(setDepartementState(data.department))
        // // JSON.stringify(localStorage.setItem("department", data.department))
        // dispatch(setAdminValidatorState(data.adminValidator))
        // // JSON.stringify(localStorage.setItem("adminValidator", data.adminValidator))
        // dispatch(setFinancialValidatorState(data.financialValidator))
        // dispatch(setValidatorState(data.validator))













                // setValue("decaissementType", {label: theStoreNewData?.decaissementType?.text , value: theStoreNewData?.decaissementType?.value})
        // setValue("beneficiary", {label: theStoreNewData?.beneficiary?.text , value: theStoreNewData?.beneficiary?.value})
        // setValue("payementMode", {label: theStoreNewData?.payementMode?.text , value: theStoreNewData?.payementMode?.value})




// defaultValues: {
        //     // initiator: `${ userInfoOnNavBar?.first_name} ${ userInfoOnNavBar?.last_name }`, 
        //     initiator: `${ userInfoLoaded?.first_name} ${ userInfoLoaded?.last_name }` || `${ userInfoOnNavBar?.first_name} ${ userInfoOnNavBar?.last_name }`, 
        //     office: userInfoLoaded?.office, 
        //     amount: storedAmount ? storedAmount : null, 
        //     // invoiceNumber: storedInvoiceNumber ? storedInvoiceNumber : "", 
        //     cashoutNote: storedCashoutNote ? storedCashoutNote : "", 
        //     department: userInfoLoaded?.department_id?.name, 
        //     decaissementType: "", 
        //     beneficiary: "", 
        //     payementMode: "", 
        //     adminValidator: "Thierry Timba", 
        //     financialValidator: "Franck Dakayi", 
        //     validator: "Ariel Mboma", 
        //     date: `${new Date().toISOString().split('T')[0]}}`,
        // }





// const incomingData = {
//     "initiator": "Eric Djhameni",
//     "office": "Yaounde",
//     "amount": "738598",
//     "invoiceNumber": "yeuiuiu",
//     "cashoutNote": "euyiuioi",
//     "department": "Finance",
//     "decaissementType": "External",
//     "beneficiary": "External",
//     "payementMode": "Taxi",
//     "adminValidator": "Thierry Timba",
//     "financialValidator": "Franck Dakayi",
//     "validator": "Ariel Mboma",
//     "date": "2023-12-12"
// }

// const fromState = {
//     "initiatorState": "Eric Djhameni",
//     "date": "Taxi",
//     "office": "Yaounde",
//     "decaissementType": "",
//     "beneficiary": "",
//     "amount": "7837489",
//     "payementMode": "",
//     "invoiceNumber": "wuryih",
//     "cashoutNote": "skrhkj",
//     "department": "Finance",
//     "adminValidator": "Thierry Timba",
//     "financialValidator": "Franck Dakayi",
//     "validator": "Ariel Mboma"
// }



{/* <div className='relative w-[350px]'>
                <label htmlFor={"Montant"} className="flex flex-row block mb-2 text-sm text-black font-medium dark:text-white"><span className='text-[12px]'> Montant </span> { true ? <span className='flex flex-row' style={{
                color: "red"
                }}>*</span> : ""}  </label>
                <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <Image alt='new_image' src={"/new_assets/login_page/usernameIcon.png"} width={25} height={25} />
                </div>
                <input
                    id='amount'
                    type={"number"}
                    placeholder={"Montant"}
                    autoComplete="off"
                    autoFocus

                    {...register("amount", {
                        // pattern: /^([0-9]*[1-9][0-9]*(\.[0-9]+)?|[0]*\.[0-9]*[1-9][0-9]*)$/, 
                        pattern: /^(?!0)[0-9]+$/,
                        minLength: 0, 
                        min: 0,
                    })
                    }
                    className={`bg-inputBackground ${ false ? "border-easeBlue border-[3px]" : "border-inputFieldBorder border-[2px]" }   text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
                    {
                        errors?.amount?.message && (
                        <p className='text-[.9rem]' style={{
                            color: "red"
                            }}>{ errors?.amount?.message }
                        </p>
                        )
                    }
                </div>
            </div> */}

            {/* <Controller
                name={"amount"}
                control={control}
                render={({ field: { ref, ...rest } }) => (
                <NumericFormat
                    className=''
                    thousandSeparator=","
                    decimalSeparator="."
                    // prefix="$ "
                    suffix=' FCFA'
                    decimalScale={2}
                    getInputRef={ref}
                    {...rest}
                />
                )}
            /> */}
            {/* {!!error && <span>{error?.message}</span>} */}