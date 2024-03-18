

// ---------------------------------------------------------
// ------------------------   USERS  -----------------------
// ---------------------------------------------------------
const columns = [
  {name: "ID", uid: "_id", sortable: true},
  {name: "Nom", uid: "name", sortable: true},
  {name: "Nom", uid: "last_name", sortable: true},
  {name: "Prénom", uid: "first_name", sortable: true},
  {name: "Rôle", uid: "role_name", sortable: true}, 
  {name: "RoleID", uid: "role", sortable: true}, 
  {name: "Département", uid: "department_id"},
  {name: "Bureau ID", uid: "office_id", sortable: true},
  {name: "Validateur", uid: "validateur"},
  {name: "Email", uid: "email"},
  {name: "Statut", uid: "active", sortable: true},
  {name: "Crée le", uid: "createdAt", sortable: true},
  {name: "Modifié le", uid: "updatedAt"}, 
  {name: "Bureau", uid: "office", sortable: true}, 
  {name: "Actions", uid: "actions"}, 
  // {name: "Role ID", uid: "role_id", sortable: true}, 
  // {name: "Département ID", uid: "department_id"},
];

const users = [
  {
    id: 1,
    name: "Ariel Mboma",
    role: "financial_validator1", 
    role_id: "3",
    department: "Finance", 
    department_id: "3", 
    validateur: "validateur", 
    status: "active",
    office: "Yaounde",
    office_id: "2", 
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    email: "tony.reichert@example.com",
  },
  {
    id: 2,
    name: "Stephan Kamga",
    role: "financial_validator2", 
    role_id: "4",
    department: "Visa", 
    department_id: "1", 
    validateur: "validateur", 
    status: "paused",
    office: "Yaounde", 
    office_id: "1", 
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    email: "zoey.lang@example.com",
  },
  {
    id: 3,
    name: "Franck Dakayi",
    role: "financial_validator3", 
    role_id: "5",
    department: "Hebergement", 
    department_id: "4", 
    validateur: "validateur", 
    status: "active",
    office: "Yaounde", 
    office_id: "1", 
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    email: "jane.fisher@example.com",
  },
  {
    id: 4,
    name: "William Howard",
    role: "administrative_validator", 
    role_id: "2",
    department: "Marketing", 
    department_id: "5", 
    validateur: "non_validateur", 
    status: "vacation",
    office: "Yaounde", 
    office_id: "1", 
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    email: "william.howard@example.com",
  },
  {
    id: 5,
    name: "Kristen Copper",
    role: "requester", 
    role_id: "1",
    department: "Marketing", 
    department_id: "5",
    validateur: "non_validateur", 
    status: "active",
    office: "Yaounde", 
    office_id: "1", 
    avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
    email: "kristen.cooper@example.com",
  },
  {
    id: 6,
    name: "Brian Kim",
    role: "requester", 
    role_id: "1",
    department: "Marketing", 
    department_id: "5",
    validateur: "non_validateur", 
    office: "Douala", 
    office_id: "2", 
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    email: "brian.kim@example.com",
    status: "active",
  },
  {
    id: 7,
    name: "Michael Hunt",
    role: "requester", 
    role_id: "1",
    department: "Marketing", 
    department_id: "5",
    validateur: "non_validateur", 
    status: "paused",
    office: "Douala", 
    office_id: "2", 
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29027007d",
    email: "michael.hunt@example.com",
  },
  {
    id: 8,
    name: "Samantha Brooks",
    role: "administrative_validator", 
    role_id: "2",
    department: "Visa",
    department_id: "1", 
    validateur: "validateur", 
    status: "active",
    office: "Douala",  
    office_id: "2", 
    avatar: "https://i.pravatar.cc/150?u=a042581f4e27027008d",
    email: "samantha.brooks@example.com",
  },
  {
    id: 9,
    name: "Frank Harrison",
    role: "requester", 
    role_id: "1",
    department: "Visa",
    department_id: "1", 
    validateur: "non_validateur", 
    status: "vacation",
    office: "Douala", 
    office_id: "2", 
    avatar: "https://i.pravatar.cc/150?img=4",
    email: "frank.harrison@example.com",
  },
  {
    id: 10,
    name: "Emma Adams",
    role: "cashier", 
    role_id: "7",
    department: "Visa",
    department_id: "1", 
    validateur: "non_validateur", 
    status: "active",
    office: "Yaounde", 
    office_id: "1", 
    avatar: "https://i.pravatar.cc/150?img=5",
    email: "emma.adams@example.com",
  },
  {
    id: 11,
    name: "Brandon Stevens",
    role: "requester", 
    role_id: "1",
    department: "Visa",
    department_id: "1", 
    validateur: "non_validateur", 
    status: "paused",
    office: "Yaounde", 
    office_id: "1", 
    avatar: "https://i.pravatar.cc/150?img=8",
    email: "brandon.stevens@example.com",
  },
  {
    id: 12,
    name: "Megan Richards",
    role: "administrative_validator", 
    role_id: "2",
    department: "Ticketing", 
    department_id: "2", 
    validateur: "non_validateur", 
    status: "paused",
    office: "Yaounde", 
    office_id: "1", 
    avatar: "https://i.pravatar.cc/150?img=10",
    email: "megan.richards@example.com",
  },
  {
    id: 13,
    name: "Oliver Scott",
    role: "requester", 
    role_id: "1",
    department: "Ticketing", 
    department_id: "2", 
    validateur: "non_validateur", 
    status: "rejected",
    office: "Douala", 
    office_id: "2", 
    avatar: "https://i.pravatar.cc/150?img=12",
    email: "oliver.scott@example.com",
  },
  {
    id: 14,
    name: "Grace Allen",
    role: "requester", 
    role_id: "1",
    department: "Ticketing", 
    department_id: "2", 
    validateur: "non_validateur", 
    status: "active",
    office: "Yaounde", 
    office_id: "1", 
    avatar: "https://i.pravatar.cc/150?img=16",
    email: "grace.allen@example.com",
  },
  {
    id: 15,
    name: "Noah Carter",
    role: "requester", 
    role_id: "1",
    department: "Ticketing", 
    department_id: "2", 
    validateur: "non_validateur", 
    status: "paused",
    office: "Douala", 
    office_id: "2", 
    avatar: "https://i.pravatar.cc/150?img=15",
    email: "noah.carter@example.com",
  },
  {
    id: 16,
    name: "Ava Perez",
    role: "administrative_validator", 
    role_id: "2",
    department: "Finance", 
    department_id: "3", 
    validateur: "non_validateur", 
    status: "active",
    office: "Yaounde", 
    office_id: "1", 
    avatar: "https://i.pravatar.cc/150?img=20",
    email: "ava.perez@example.com",
  },
  {
    id: 17,
    name: "Liam Johnson",
    role: "requester", 
    role_id: "1",
    department: "Finance", 
    department_id: "3", 
    validateur: "non_validateur", 
    status: "active",
    office: "Yaounde", 
    office_id: "1", 
    avatar: "https://i.pravatar.cc/150?img=33",
    email: "liam.johnson@example.com",
  },
  {
    id: 18,
    name: "Sophia Taylor",
    role: "administrative_validator", 
    role_id: "2",
    department: "Hebergement", 
    department_id: "4", 
    validateur: "non_validateur", 
    status: "active",
    office: "Yaounde", 
    office_id: "1", 
    avatar: "https://i.pravatar.cc/150?img=29",
    email: "sophia.taylor@example.com",
  },
  {
    id: 19,
    name: "Lucas Harris",
    role: "requester", 
    role_id: "1",
    department: "Hebergement", 
    department_id: "4", 
    validateur: "non_validateur", 
    status: "paused",
    office: "Yaounde", 
    office_id: "1", 
    avatar: "https://i.pravatar.cc/150?img=50",
    email: "lucas.harris@example.com",
  },
  {
    id: 20,
    name: "Mia Robinson",
    role: "requester", 
    role_id: "1",
    department: "Hebergement", 
    department_id: "4",
    validateur: "non_validateur", 
    status: "active",
    office: "Yaounde", 
    office_id: "1", 
    avatar: "https://i.pravatar.cc/150?img=45",
    email: "mia.robinson@example.com",
  },
];


// ---------------------------------------------------------
// ------------------------   USERS  -----------------------
// ---------------------------------------------------------





// ---------------------------------------------------------
// --------------------   DEPARTMENTS  ---------------------
// ---------------------------------------------------------

const departementColumns = [
  {name: "ID", uid: "_id", sortable: true},
  {name: "Nom", uid: "name", sortable: true}, 
  {name: "Bureaux", uid: "office", sortable: true}, 
  // {name: "Statut", uid: "status", sortable: true}, 
  {name: "Crée le", uid: "createdAt", sortable: true},
  {name: "Modifié le", uid: "updatedAt", sortable: true},
  {name: "Actions", uid: "actions"},
];

const departments = [

  {
    id: "1", 
    name: "Visa", 
    status: "active", 
    users: [], 
    office: [], 
    createdAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
    updatedAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)",
  }, 

  {
    id: "2", 
    name: "Ticketing", 
    status: "active", 
    users: [], 
    office: [], 
    createdAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
    updatedAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)",
  }, 

  {
    id: "3", 
    name: "Finance", 
    status: "active", 
    users: [], 
    office: [], 
    createdAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
    updatedAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)",
  }, 

  {
    id: "4", 
    name: "Hebergement", 
    status: "active", 
    users: [], 
    office: [], 
    createdAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
    updatedAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)",
  }, 
  {
    id: "5", 
    name: "Marketing", 
    status: "active", 
    users: [], 
    office: [], 
    createdAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
    updatedAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)",
  }, 
  {
    id: "6", 
    name: "Sales", 
    status: "active", 
    users: [], 
    office: [], 
    createdAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
    updatedAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)",
  }, 
  {
    id: "7", 
    name: "Design", 
    status: "active", 
    users: [], 
    office: [], 
    createdAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
    updatedAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)",
  }, 
  {
    id: "8", 
    name: "Design", 
    status: "active", 
    users: [], 
    office: [], 
    createdAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
    updatedAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)",
  }, 
  {
    id: "8", 
    name: "Information Technology", 
    status: "active", 
    users: [], 
    office: [], 
    createdAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)", 
    updatedAt: "Tue Nov 21 2023 15:07:46 GMT+0100 (West Africa Standard Time)",
  }, 

]

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
  {name: "Identifiant Status", uid: "flag", sortable: true}, 

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
  
  // {name: "Identifiant Status", uid: "flag", sortable: true}, 
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
  {name: "Identifiant Status", uid: "flag", sortable: true}, 
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






export {columns, payementModeColumns, payementModeData, statusNameData, statusNameColumns, beneficiaryData, rolesData, roleAmountsColumns, roleAmountsData, decaissementsData, officeData, mainDecaissementDataColumn, newDecaissementDataColumn, columnsCashoutTracking, departementColumns, departments, validatorSettingColumns, beneficiaireColumns, categoriesColumns, userRolesColumns, cashoutTypesColumns, cashoutTypesData, usersColumns, filialeColumns, users, statusOptions};
