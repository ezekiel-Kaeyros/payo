
// ---------------------------------------------------------
// ------------------------   USERS  -----------------------
// ---------------------------------------------------------
const columns = [
    {name: "ID", uid: "_id", sortable: true},
    {name: "Nom", uid: "name", sortable: true},
    {name: "Email", uid: "email"},
    {name: "Phone", uid: "phone", sortable: true},
    {name: "Actions", uid: "actions"}, 
    // {name: "Role ID", uid: "role_id", sortable: true}, 
    // {name: "Département ID", uid: "department_id"},
  ];
  
  const users = [
    {
      id: 1,
      name: "Ariel Mboma",
      email: "tony.reichert@example.com",
      phone: "+237 655555555",
    },
    {
      id: 2,
      name: "Stephan Kamga",
      email: "zoey.lang@example.com",
      phone: "+237 655555555",
    },
    {
      id: 3,
      name: "Franck Dakayi",
      email: "jane.fisher@example.com",
      phone: "+237 655555555",
    },
    {
      id: 4,
      name: "William Howard",
      email: "william.howard@example.com",
      phone: "+237 655555555"
    },
    {
      id: 5,
      name: "Kristen Copper",
      email: "kristen.cooper@example.com",
      phone: "+237 655555555"
    },
    {
      id: 6,
      name: "Brian Kim",
      email: "brian.kim@example.com",
      phone: "+237 655555555"
    },
    {
      id: 7,
      name: "Michael Hunt",
      email: "michael.hunt@example.com",
      phone: "+237 655555555"
    },
    {
      id: 8,
      name: "Samantha Brooks",
      email: "samantha.brooks@example.com",
      phone: "+237 655555555"
    },
    {
      id: 9,
      name: "Frank Harrison",
      email: "frank.harrison@example.com",
      phone: "+237 655555555"
    },
    {
      id: 10,
      name: "Emma Adams",
      email: "emma.adams@example.com",
      phone: "+237 655555555"
    },
    {
      id: 11,
      name: "Brandon Stevens",
      email: "brandon.stevens@example.com",
      phone: "+237 655555555"
    },
    {
      id: 12,
      name: "Megan Richards",
      email: "megan.richards@example.com",
      phone: "+237 655555555"
    },
    {
      id: 13,
      name: "Oliver Scott",
      email: "oliver.scott@example.com",
      phone: "+237 655555555"
    },
    {
      id: 14,
      name: "Grace Allen",
      email: "grace.allen@example.com",
      phone: "+237 655555555"
    },
    {
      id: 15,
      name: "Noah Carter",
      email: "noah.carter@example.com",
      phone: "+237 655555555"
    },
    {
      id: 16,
      name: "Ava Perez",
      email: "ava.perez@example.com",
      phone: "+237 655555555"
    },
    {
      id: 17,
      name: "Liam Johnson",
      email: "liam.johnson@example.com",
      phone: "+237 655555555"
    },
    {
      id: 18,
      name: "Sophia Taylor",
      email: "sophia.taylor@example.com",
      phone: "+237 655555555"
    },
    {
      id: 19,
      name: "Lucas Harris",
      email: "lucas.harris@example.com",
      phone: "+237 655555555"
    },
    {
      id: 20,
      name: "Mia Robinson",
      email: "mia.robinson@example.com",
      phone: "+237 655555555"
    },
  ];
  
  
  // ---------------------------------------------------------
  // ------------------------   USERS  -----------------------
  // ---------------------------------------------------------
  
  
  
  
  
  // ---------------------------------------------------------
  // --------------------   DEPARTMENTS  ---------------------
  // ---------------------------------------------------------
  
  const companyColumns = [
    {name: "ID", uid: "_id", sortable: true},
    {name: "Nom", uid: "name", sortable: true},
    {name: "Email", uid: "email"},
    {name: "Phone", uid: "phone", sortable: true},
    {name: "Actions", uid: "actions"}, 
  ];
  
  
  const departments = [
    {
      id: 1,
      name: "Ariel Mboma",
      email: "tony.reichert@example.com",
      phone: "+237 655555555",
    },
    {
      id: 2,
      name: "Stephan Kamga",
      email: "zoey.lang@example.com",
      phone: "+237 655555555",
    },
    {
      id: 3,
      name: "Franck Dakayi",
      email: "jane.fisher@example.com",
      phone: "+237 655555555",
    },
    {
      id: 4,
      name: "William Howard",
      email: "william.howard@example.com",
      phone: "+237 655555555"
    },
    {
      id: 5,
      name: "Kristen Copper",
      email: "kristen.cooper@example.com",
      phone: "+237 655555555"
    },
    {
      id: 6,
      name: "Brian Kim",
      email: "brian.kim@example.com",
      phone: "+237 655555555"
    },
    {
      id: 7,
      name: "Michael Hunt",
      email: "michael.hunt@example.com",
      phone: "+237 655555555"
    },
    {
      id: 8,
      name: "Samantha Brooks",
      email: "samantha.brooks@example.com",
      phone: "+237 655555555"
    },
    {
      id: 9,
      name: "Frank Harrison",
      email: "frank.harrison@example.com",
      phone: "+237 655555555"
    },
    {
      id: 10,
      name: "Emma Adams",
      email: "emma.adams@example.com",
      phone: "+237 655555555"
    },
    {
      id: 11,
      name: "Brandon Stevens",
      email: "brandon.stevens@example.com",
      phone: "+237 655555555"
    },
    {
      id: 12,
      name: "Megan Richards",
      email: "megan.richards@example.com",
      phone: "+237 655555555"
    },
    {
      id: 13,
      name: "Oliver Scott",
      email: "oliver.scott@example.com",
      phone: "+237 655555555"
    },
    {
      id: 14,
      name: "Grace Allen",
      email: "grace.allen@example.com",
      phone: "+237 655555555"
    },
    {
      id: 15,
      name: "Noah Carter",
      email: "noah.carter@example.com",
      phone: "+237 655555555"
    },
    {
      id: 16,
      name: "Ava Perez",
      email: "ava.perez@example.com",
      phone: "+237 655555555"
    },
    {
      id: 17,
      name: "Liam Johnson",
      email: "liam.johnson@example.com",
      phone: "+237 655555555"
    },
    {
      id: 18,
      name: "Sophia Taylor",
      email: "sophia.taylor@example.com",
      phone: "+237 655555555"
    },
    {
      id: 19,
      name: "Lucas Harris",
      email: "lucas.harris@example.com",
      phone: "+237 655555555"
    },
    {
      id: 20,
      name: "Mia Robinson",
      email: "mia.robinson@example.com",
      phone: "+237 655555555"
    },
  ];
  
  // ---------------------------------------------------------
  // --------------------   DEPARTMENTS  ---------------------
  // ---------------------------------------------------------
  
  
  
  // ---------------------------------------------------------
  // ------------------   USER ROLES  ------------------------
  // ---------------------------------------------------------
  
  const userRolesColumns = [
    {name: "ID", uid: "_id", sortable: true},
    {name: "Nom", uid: "name", sortable: true}, 
    {name: "Montant", uid: "amount", sortable: true}, 
    // {name: "Statut", uid: "active", sortable: true}, 
    {name: "Nom de status ID", uid: "status_name_id", sortable: true},
    {name: "Nom de status", uid: "status_name", sortable: true},
    {name: "Niveau du Rôle", uid: "level", sortable: true}, 
  
    {name: "Crée le", uid: "createdAt", sortable: true},
    {name: "Modifié le", uid: "updatedAt", sortable: true},
    {name: "Actions", uid: "actions"},
  ];
  
  const rolesData = [
    {
      id: "1", 
      name: "requester", 
      role_amount_id: "1", 
      amount: 0, 
      status: "active", 
      createdAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
      updatedAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)",
    }, 
    {
      id: "2", 
      name: "administrative_validator", 
      role_amount_id: "1", 
      amount: 0, 
      status: "active", 
      createdAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
      updatedAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)",
    }, 
    {
      id: "3", 
      name: "financial_validator1", 
      role_amount_id: "2", 
      amount: 500000, 
      status: "active", 
      createdAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
      updatedAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)",
    }, 
    
    {
      id: "4", 
      name: "financial_validator2", 
      role_amount_id: "2", 
      amount: 3000000, 
      status: "active", 
      createdAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
      updatedAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)",
    }, 
    {
      id: "5", 
      name: "financial_validator3", 
      role_amount_id: "4", 
      amount: 9999999999, 
      status: "active", 
      createdAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
      updatedAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)",
    }, 
    {
      id: "6", 
      name: "financial_validator4", 
      role_amount_id: "5", 
      amount: 999999999999999, 
      status: "inactive", 
      createdAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
      updatedAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)",
    }, 
    {
      id: "7", 
      name: "cashier", 
      role_amount_id: "1", 
      amount: 0, 
      status: "active", 
      createdAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
      updatedAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)",
    }
  ]
  
  // ---------------------------------------------------------
  // ------------------   USER ROLES  ------------------------
  // ---------------------------------------------------------
  
  
  
  
  // ---------------------------------------------------------
  // ------------------  ROLES AMOUNT  ------------------------
  // ---------------------------------------------------------
  
  const roleAmountsColumns = [
    {name: "ID", uid: "_id", sortable: true},
    {name: "Montant", uid: "amount", sortable: true}, 
    // {name: "Statut", uid: "active", sortable: true}, 
    {name: "Crée le", uid: "createdAt", sortable: true},
    {name: "Modifié le", uid: "updatedAt", sortable: true},
    {name: "Actions", uid: "actions"},
  ];
  
  const roleAmountsData = [
    {
      id: "1", 
      amount: 0, 
      status: "active", 
      createdAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
      updatedAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)",
    }, 
    {
      id: "2", 
      amount: 500000, 
      status: "active", 
      createdAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
      updatedAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)",
    }, 
    {
      id: "3", 
      amount: 3000000, 
      status: "active", 
      createdAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
      updatedAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)",
    }, 
    {
      id: "4", 
      amount: 10000000, 
      status: "active", 
      createdAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
      updatedAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)",
    }, 
    {
      id: "5", 
      amount: 999999999999999, 
      status: "inactive", 
      createdAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
      updatedAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)",
    }, 
  
  ]
  
  // ---------------------------------------------------------
  // ------------------  ROLES AMOUNT  ------------------------
  // ---------------------------------------------------------
  
  
  
  
  
  // ---------------------------------------------------------
  // ------------------   DECAISSEMENTS  ---------------------
  // ---------------------------------------------------------
  
  const newDecaissementDataColumn = [
    {name: "ID", uid: "id", sortable: true},
    {name: "No DED", uid: "inputationNumber", sortable: true}, 
    {name: "Initiateur", uid: "theAgentFullName", sortable: true}, 
    {name: "Montant", uid: "amount", sortable: true},
    { name: "Date", uid: "date", sortable: true }, 
  
    {name: "Validation Admin", uid: "chefDepValidationSatus", sortable: true}, 
    {name: "Validation Fin", uid: "cfoValidationStatus", sortable: true}, 
    {name: "Serv Décaissement", uid: "validatorStatus", sortable: true}, 
    {name: "Initiateur", uid: "initiator_status", sortable: true}, 
  
    {name: "Bureau", uid: "filiale", sortable: true}, 
    {name: "Chef de Service", uid: "theDepartmentChef"}, 
    {name: "Chef Financier", uid: "theFinancialChief"}, 
    {name: "Commentaire", uid: "comment", sortable: true}, 
    {name: "Montant en Lettre", uid: "letter_amount", sortable: true}, 
    {name: "Methode de Paiement", uid: "paymentType", sortable: true},
    {name: "Actions", uid: "actions"},
  ];
  const statusOptions = [
    {name: "Valide", uid: "valide"},
    {name: "Rejete", uid: "rejete"},
    {name: "Pending", uid: "pending"},
  ];
  
  
  const mainDecaissementDataColumn = [
    {name: "ID", uid: "_id", sortable: true}, 
    {name: "Mode de Paiement ID", uid: "payment_method_id", sortable: true}, 
    {name: "Mode de Paiement", uid: "payment_method_name", sortable: true}, 
    {name: "Bénéficiare ID", uid: "beneficiary_id", sortable: true}, 
    {name: "Bénéficiare", uid: "beneficiary_name", sortable: true}, 
    {name: "Initiateur ID", uid: "initiator", sortable: true}, 
    {name: "Initiateur", uid: "initiator_name", sortable: true}, 
    {name: "Montant", uid: "amount", sortable: true},
  
    // { name: "Date", uid: "date", sortable: true }, 
    // {name: "No DED", uid: "inputationNumber", sortable: true}, 
  
    {name: "Validation Admin", uid: "chefDepValidationSatus", sortable: true}, 
    {name: "Validation Fin", uid: "cfoValidationStatus", sortable: true}, 
    {name: "Serv Décaissement", uid: "validatorStatus", sortable: true}, 
    {name: "Initiateur", uid: "initiator_status", sortable: true}, 
  
    {name: "COMMENTAIRE", uid: "comment", sortable: true}, 
    {name: "Type de Décaissement", uid: "disbursement_type_id", sortable: true}, 
    {name: "Department ID", uid: "department_id", sortable: true}, 
    {name: "Department", uid: "department_name", sortable: true}, 
    {name: "Bureaux ID", uid: "office_id", sortable: true}, 
    {name: "Bureaux", uid: "office_name", sortable: true}, 
    {name: "Crée le", uid: "createdAt", sortable: true},
    {name: "Modifié le", uid: "updatedAt", sortable: true},
    // {name: "FILIALE", uid: "filiale", sortable: true}, 
    // {name: "CHEF DE SERVICE", uid: "theDepartmentChef"}, 
    // {name: "CHEF FINACIER", uid: "theFinancialChief"}, 
    // {name: "MONTANT EN LETTRE", uid: "letter_amount", sortable: true}, 
    {name: "Actions", uid: "actions"},
  ];
  
  // _id: "",
  //   initiator_name: "", 
  //   initiator_id: "", 
  //   beneficiary_name: "", 
  //   beneficiary_id: "", 
  //   payment_method_name: "", 
  //   payment_method_id: "", 
  //   disbursement_type_name: "",
  //   disbursement_type_id: "", 
  //   department_name: "", 
  //   department_id: "", 
  //   office_name: "", 
  //   office_id: "", 
  //   amount: 0, 
  //   invoice_number: "", 
  
  const decaissementsData = [
    {
      id: 1,
      inputationNumber: "DED-00000000076",
      theAgentFullName: "Tony Reichert",
      amount: "530400", 
      date: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
      chefDepValidationSatus: "pending", 
      cfoValidationStatus: "pending", 
      validatorStatus: "pending", 
      initiator_status: "pending", 
      email: "tony.reichert@example.com",
      avatar: "",
      
      theFinancialChief: "Mandegue Boris", 
      theDepartmentChef: "Moundengue Albert", 
      theCashier: "Bana Odile", 
      filiale: "Yaounde", 
      comment: "New Printer", 
      letter_amount: "cinq-cent quatre mile", 
      paymentType: "Espece", 
    },
    {
      id: 2,
      inputationNumber: "DED-00000000077",
      theAgentFullName: "Tony Reichert",
      amount: "502400", 
      date: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
      chefDepValidationSatus: "valider", 
      cfoValidationStatus: "valider", 
      validatorStatus: "waiting_fond", 
      initiator_status: "pending", 
      email: "tony.reichert@example.com",
      avatar: "",
  
      theFinancialChief: "Mandegue Boris", 
      theDepartmentChef: "Moundengue Albert", 
      theCashier: "Bana Odile", 
      filiale: "Yaounde", 
      comment: "New Printer", 
      letter_amount: "cinq-cent quatre mile", 
      paymentType: "Espece", 
    },
    {
      id: 3,
      inputationNumber: "DED-00000000078",
      theAgentFullName: "Tony Reichert",
      amount: "1300400", 
      date: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
      chefDepValidationSatus: "valider", 
      cfoValidationStatus: "valider", 
      validatorStatus: "cashedout", 
      initiator_status: "received", 
      email: "tony.reichert@example.com",
      avatar: "",
  
      theFinancialChief: "Mandegue Boris", 
      theDepartmentChef: "Moundengue Albert", 
      theCashier: "Bana Odile", 
      filiale: "Yaounde", 
      comment: "New Printer", 
      letter_amount: "cinq-cent quatre mile", 
      paymentType: "Espece", 
    },
    {
      id: 4,
      inputationNumber: "DED-00000000079",
      theAgentFullName: "Tony Reichert",
      amount: "5000400", 
      date: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
      chefDepValidationSatus: "valider", 
      cfoValidationStatus: "valider", 
      validatorStatus: "cashedout", 
      initiator_status: "not_received", 
      email: "tony.reichert@example.com",
      avatar: "",
  
      theFinancialChief: "Mandegue Boris", 
      theDepartmentChef: "Moundengue Albert", 
      theCashier: "Bana Odile", 
      filiale: "Yaounde", 
      comment: "New Printer", 
      letter_amount: "cinq-cent quatre mile", 
      paymentType: "Espece", 
    },
    {
      id: 5,
      inputationNumber: "DED-00000000080",
      theAgentFullName: "Tony Reichert",
      amount: "50400", 
      date: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
      chefDepValidationSatus: "pending", 
      cfoValidationStatus: "pending", 
      validatorStatus: "pending", 
      initiator_status: "pending", 
      email: "tony.reichert@example.com",
      avatar: "",
  
      theFinancialChief: "Mandegue Boris", 
      theDepartmentChef: "Moundengue Albert", 
      theCashier: "Bana Odile", 
      filiale: "Yaounde", 
      comment: "New Printer", 
      letter_amount: "cinq-cent quatre mile", 
      paymentType: "Espece", 
    },
  ];
  
  // ---------------------------------------------------------
  // ------------------   DECAISSEMENTS  ---------------------
  // ---------------------------------------------------------
  
  
  
  // ---------------------------------------------------------
  // ----------------------   OFFICE  ------------------------
  // ---------------------------------------------------------
  
  const filialeColumns = [
    {name: "ID", uid: "_id", sortable: true},
    {name: "Nom", uid: "name", sortable: true}, 
    // {name: "Statut", uid: "status", sortable: true}, 
    {name: "Crée le", uid: "createdAt", sortable: true},
    {name: "Modifié le", uid: "updatedAt", sortable: true},
    {name: "Actions", uid: "actions"},
  ];
  
  
  const officeData = [
    {
      id: "1", 
      name: "Yaounde", 
      status: "active", 
      users: [], 
      departments: [], 
      createdAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
      updatedAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)",
    }, 
    {
      id: "2", 
      name: "Douala", 
      status: "active", 
      users: [], 
      departments: [], 
      createdAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
      updatedAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)",
    }, 
    {
      id: "3", 
      name: "Buea", 
      status: "active", 
      users: [], 
      departments: [], 
      createdAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
      updatedAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)",
    }, 
    
    {
      id: "4", 
      name: "Edea", 
      status: "active", 
      users: [], 
      departments: [], 
      createdAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
      updatedAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)",
    }, 
    {
      id: "5", 
      name: "Baffousam", 
      status: "active", 
      users: [], 
      departments: [], 
      createdAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
      updatedAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)",
    }, 
  ]
  
  
  // ---------------------------------------------------------
  // ----------------------   OFFICE  ------------------------
  // ---------------------------------------------------------
  
  
  // ---------------------------------------------------------
  // ----------------  DISBURSEMENT TYPE  --------------------
  // ---------------------------------------------------------
  
  const cashoutTypesColumns = [
    {name: "ID", uid: "_1id", sortable: true},
    {name: "Nom", uid: "name", sortable: true}, 
    // {name: "Statut", uid: "status", sortable: true}, 
    {name: "Crée le", uid: "createdAt", sortable: true},
    {name: "Modifié le", uid: "updatedAt", sortable: true},
    {name: "Actions", uid: "actions"},
  ];
  
  const cashoutTypesData = [
    {
      id: "1", 
      name: "Taxi", 
      status: "active", 
      createdAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
      updatedAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)",
    }, 
    {
      id: "2", 
      name: "Maintenance", 
      status: "active",  
      createdAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
      updatedAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)",
    }, 
    {
      id: "3", 
      name: "Transaction", 
      status: "inactive",  
      createdAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
      updatedAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)",
    }, 
    
    {
      id: "4", 
      name: "Others", 
      status: "active",  
      createdAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
      updatedAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)",
    }, 
  ]
  
  // ---------------------------------------------------------
  // ----------------  DISBURSEMENT TYPE  --------------------
  // ---------------------------------------------------------
  
  
  
  // ---------------------------------------------------------
  // --------------------  BENEFICIARY  ----------------------
  // ---------------------------------------------------------
  
  const beneficiaireColumns = [
    {name: "ID", uid: "_id", sortable: true},
    {name: "NOM", uid: "name", sortable: true}, 
    {name: "Type de Décaissement", uid: "disbursment_type", sortable: true}, 
    {name: "ID Type de Dec.", uid: "disbursement_type_id", sortable: true}, 
    // {name: "Statut", uid: "status", sortable: true}, 
    {name: "Crée le", uid: "createdAt", sortable: true},
    {name: "Modifié le", uid: "updatedAt", sortable: true},
    {name: "Actions", uid: "actions"},
  ];
  
  const beneficiaryData = [
    {
      id: "1", 
      name: "Air france", 
      disbursment_type_id: "2", 
      disbursment_type: "Visa",
      status: "active", 
      createdAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
      updatedAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)",
    }, 
    {
      id: "2", 
      name: "Asky", 
      disbursment_type_id: "2", 
      disbursment_type: "Visa",
      status: "active", 
      createdAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
      updatedAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)",
    }, 
    {
      id: "3", 
      name: "Air ivoir", 
      disbursment_type_id: "2", 
      disbursment_type: "Visa",
      status: "active", 
      createdAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
      updatedAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)",
    }, 
    
    {
      id: "4", 
      name: "Camer-co", 
      disbursment_type_id: "2", 
      disbursment_type: "Visa",
      status: "active", 
      createdAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
      updatedAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)",
    }, 
    {
      id: "5", 
      name: "Movempick", 
      disbursment_type_id: "3", 
      disbursment_type: "Other",
      status: "active", 
      createdAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
      updatedAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)",
    }, 
    {
      id: "6", 
      name: "Hilton", 
      disbursment_type_id: "3", 
      disbursment_type: "Other",
      status: "inactive", 
      createdAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
      updatedAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)",
    }, 
    {
      id: "7", 
      name: "Kaeyros Analytics", 
      disbursment_type_id: "1", 
      disbursment_type: "Taxi",
      status: "active", 
      createdAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
      updatedAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)",
    }, 
    {
      id: "7", 
      name: "Fecafoot", 
      disbursment_type_id: "1", 
      disbursment_type: "Taxi",
      status: "active", 
      createdAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
      updatedAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)",
    }
  ]
  
  // ---------------------------------------------------------
  // --------------------  BENEFICIARY  ----------------------
  // ---------------------------------------------------------
  
  
  
  
  // ---------------------------------------------------------
  // ------------------  STATUS NAME  ------------------------
  // ---------------------------------------------------------
  
  const statusNameColumns = [
    {name: "ID", uid: "_id", sortable: true},
    {name: "Nom", uid: "name", sortable: true}, 
    // {name: "Statut", uid: "active", sortable: true}, 
    {name: "Crée le", uid: "createdAt", sortable: true},
    {name: "Modifié le", uid: "updatedAt", sortable: true},
    {name: "Actions", uid: "actions"},
  ];
  
  const statusNameData = [
  
    {
      _id: "1", 
      name: "rejete", 
      status: "active", 
      createdAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
      updatedAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)",
    }, 
    {
      _id: "2", 
      name: "valide", 
      status: "active", 
      createdAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
      updatedAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)",
    }, 
    {
      _id: "3", 
      name: "en attente de fond", 
      status: "active", 
      createdAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
      updatedAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)",
    }, 
    {
      _id: "4", 
      name: "décaisser", 
      status: "inactive", 
      createdAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
      updatedAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)",
    }, 
    {
      _id: "5", 
      name: "non reçu", 
      status: "inactive", 
      createdAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
      updatedAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)",
    }, 
    {
      _id: "6", 
      name: "encaisser", 
      status: "inactive", 
      createdAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
      updatedAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)",
    }, 
  
  ]
  
  // ---------------------------------------------------------
  // ------------------  STATUS NAME  ------------------------
  // ---------------------------------------------------------
  
  
  
  
  
  
  
  
  // ---------------------------------------------------------
  // ------------------  STATUS NAME  ------------------------
  // ---------------------------------------------------------
  
  const payementModeColumns = [
    {name: "ID", uid: "_id", sortable: true},
    {name: "Nom", uid: "name", sortable: true}, 
    // {name: "Statut", uid: "active", sortable: true}, 
    {name: "Crée le", uid: "createdAt", sortable: true},
    {name: "Modifié le", uid: "updatedAt", sortable: true},
    {name: "Actions", uid: "actions"},
  ];
  
  const payementModeData = [
    {
      _id: "1", 
      name: "momo", 
      active: "active", 
      createdAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
      updatedAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)",
    }, 
    {
      _id: "2", 
      name: "bank", 
      status: "active", 
      createdAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
      updatedAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)",
    }, 
    {
      _id: "3", 
      name: "Espece", 
      status: "active", 
      createdAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
      updatedAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)",
    }, 
    {
      _id: "4", 
      name: "orange_money", 
      status: "active", 
      createdAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
      updatedAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)",
    }, 
    {
      _id: "5", 
      name: "bitcoin", 
      status: "inactive", 
      createdAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
      updatedAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)",
    }, 
    {
      _id: "5", 
      name: "visa_card", 
      status: "inactive", 
      createdAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
      updatedAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)",
    }, 
    {
      _id: "5", 
      name: "eutherium", 
      status: "inactive", 
      createdAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
      updatedAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)",
    }, 
  
  ]
  
  // ---------------------------------------------------------
  // ------------------  STATUS NAME  ------------------------
  // ---------------------------------------------------------
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  const categoriesColumns = [
    {name: "ID", uid: "id", sortable: true},
    {name: "NOM", uid: "name", sortable: true}, 
    {name: "DATE", uid: "timestamp", sortable: true},
    {name: "Actions", uid: "actions"},
  ];
  
  
  
  const validatorSettingColumns = [
    {name: "ID", uid: "id", sortable: true},
    {name: "NOM", uid: "name", sortable: true}, 
    {name: "MINIMUM VALIDATION", uid: "min_validation", sortable: true}, 
    {name: "MAXIMUM VALIDATION", uid: "max_validation", sortable: true}, 
    {name: "DEVISE", uid: "currency", sortable: true},
    {name: "DATE", uid: "timestamp", sortable: true},
    {name: "Actions", uid: "actions"},
  ];
  
  
  const columnsCashoutTracking = [
    {name: "ID", uid: "id", sortable: true}, 
    {name: "ID Decaissement", uid: "cashout_fk", sortable: true}, 
    {name: "No D'IMPUTATION", uid: "inputationNumber", sortable: true}, 
    {name: "MONTANT", uid: "cashoutAmount", sortable: true},
    {name: "INITIATEUR", uid: "theAgentFullName", sortable: true}, 
    {name: "RAISON", uid: "cashoutComment", sortable: true}, 
    {name: "DATE DE CREATION", uid: "actionDate", sortable: true}, 
    {name: "DATE DE RETRAI", uid: "cashoutDate", sortable: true}, 
  
    {name: "CHEF DE SERVICE", uid: "theDepartmentChef"}, 
    {name: "VALIDATEUR FINANCIER", uid: "theFinancialChief", sortable: true},
    {name: "CAISSIER", uid: "theCashier", sortable: true},
  
    {name: "DATE VALIDATION ADMINISTRATIVE", uid: "chefDepValidator_date", sortable: true},
    {name: "DATE VALIDATION FINANCIERE", uid: "cfoValidator_date", sortable: true}, 
    {name: "DATE SORTIE DE FOND", uid: "validatorValid_date"}, 
    {name: "DATE ACCUSE RECEPTION", uid: "initiator_date"}, 
  
  
    {name: "STATUS 1", uid: "chefDepValidationSatus", sortable: true}, 
    {name: "STATUS 2", uid: "cfoValidationStatus", sortable: true}, 
    {name: "STATUS 3", uid: "validatorStatus", sortable: true}, 
    {name: "STATUS 4", uid: "initiator_status", sortable: true}, 
  
    {name: "Actions", uid: "actions"},
  ];
  
  const usersColumns = [
    {name: "ID", uid: "id", sortable: true},
    {name: "DECAISSEMENTS", uid: "numberOfCashouts", sortable: true}, 
    {name: "NOM", uid: "lastName", sortable: true}, 
    {name: "PRENOM", uid: "firstName", sortable: true}, 
    {name: "EMAIL", uid: "email", sortable: true},
    {name: "VALIDATEUR", uid: "isValidator"}, 
    {name: "FILIALE", uid: "filiale", sortable: true}, 
    {name: "DEPARTEMENT", uid: "department", sortable: true},
    {name: "POSITION", uid: "role", sortable: true},
    {name: "ROLE", uid: "user_role", sortable: true},
    // {name: "FILIALE", uid: "filiale", sortable: true}, 
    // {name: "VAIDATEUR", uid: "theValidator"}, 
    // {name: "CHEF FINACIER", uid: "theFinancialChief"}, 
    // {name: "COMMENTAIRE", uid: "comment", sortable: true}, 
    // {name: "MONTANT EN LETTRE", uid: "letter_amount", sortable: true}, 
    {name: "Actions", uid: "actions"},
  ];
  
  
   
  
  
  
  export {columns, payementModeColumns, payementModeData, statusNameData, statusNameColumns, beneficiaryData, rolesData, roleAmountsColumns, roleAmountsData, decaissementsData, officeData, mainDecaissementDataColumn, newDecaissementDataColumn, columnsCashoutTracking, companyColumns, departments, validatorSettingColumns, beneficiaireColumns, categoriesColumns, userRolesColumns, cashoutTypesColumns, cashoutTypesData, usersColumns, filialeColumns, users, statusOptions};
  