'use client';
import React, { useEffect, useRef, useState } from 'react'; 
import toast from 'react-hot-toast'; 
import { Table,
  TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Button, DropdownTrigger, Dropdown, DropdownMenu, DropdownItem, Chip, User, Pagination,
} from '@nextui-org/react'; 

import { PlusIcon } from '../PlusIcon';
import { VerticalDotsIcon } from '../VerticalDotsIcon';
import { SearchIcon } from '../SearchIcon';
import { ChevronDownIcon } from '../ChevronDownIcon';
import { mainDecaissementDataColumn, statusOptions } from '../data';
import { capitalize } from '../utils';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { convertNumberToFrench } from '@/utils/convertNumberToFrenchAmount';

import { Modal, ModalContent, ModalFooter, useDisclosure,
} from '@nextui-org/react'; 

import Image from 'next/image';
import GenericSummaryCard from '../../forms/summaryCard/GenericSummaryCard';
import ThreeDotsLoadingAnimation from '../../loaders/ThreeDotsLoadingAnimation';
import { useSelector } from 'react-redux';
import SaveDisbursementService from '@/services/disbursementService'; 
import { removeDuplicatesByProperty } from '@/utils/removeDuplicate'; 
import UsersService from '@/services/allUserService';
import { filterAllValidatorsMap, getChefDepsGeneric, getUserGeneric, getUserGenericFunc, getUserGenericFuncFiliale, newTranformedValidatorArray } from '@/utils/tranformArrays';
import SettingsService from '@/services/settingsService'; 
// import PopupPreviewToPrint from '../ToPrint';

import pendingIcon from "../../../../../../../public/statusIcons/clock.svg"; 
import validateIcon from "../../../../../../../public/statusIcons/tick_circle.svg"; 
import rejeterIcon from "../../../../../../../public/statusIcons/close_circle.svg"; 
import waitingFundIcon from "../../../../../../../public/statusIcons/money_forbidden.svg"; 
import usePdf from '../../pdf/modulePdf';
import { togglePDFDesignStyle } from '@/app/[lang]/store/slices/refreshSlice';
import { useAppDispatch } from '@/app/[lang]/store';
import { useOutsideClick } from '@/app/[lang]/hooks/useClickOutsideV2';
import RejectionNoteComp from '../../forms/rejectionNote/RejectionNoteComp';

// const statusColorMap = {
//   pending: 'warning',
//   valide: 'success', 
//   rejete: 'danger',
//   en_attente_de_fond: "danger", 
//   décaisser: "success", 
//   non_reçu: "danger", 
//   encaisse: "success",
// };

const statusColorMap = {
  1: 'success', 
  2: 'danger',
  3: 'warning',
};

const INITIAL_VISIBLE_COLUMNS = [
  // "_id", 
  'initiator_name',
  'amount',
  'payment_method_name', 
  'beneficiary_name', 
  'chefDepValidationSatus',
  'cfoValidationStatus',
  'validatorStatus', 
  'initiator_status', 
  'actions',
  // 'inputationNumber', 
  // 'date', 
];

let cashoutObj = {
  _id: "",
  initiator_name: "", 
  initiator: "", 
  beneficiary_name: "", 
  beneficiary_id: "", 
  payment_method_name: "", 
  payment_method_id: "", 
  disbursement_type_name: "",
  disbursement_type_id: "", 
  department_name: "", 
  department_id: "", 
  office_name: "", 
  office_id: "", 
  amount: 0, 
  invoice_number: "", 
  level: "", 
  statusNameAccept: "",
  statusIDAccept: "",
  statusNameReject: "",
  statusIDReject: "", 
  createdAt: "", 
  reason: "", 

  pendingStatusNameForSuperValidator: "", 
  pendingStatusNameForChefDepartment: "", 
  pendingStatusNameForCaissiere: "", 
  pendingStatusNameForInitiator: "", 

  rejectStatusNameForChefDepartment: "", 
  rejectStatusNameForSuperValidator: "", 
  rejectStatusNameForCaissiere: "", 
  rejectStatusNameForInitiator: "", 

  validateStatusNameForChefDepartment: "", 
  validateStatusNameForCFO: "", 
  validateStatusNameForCaissiere: "", 
  validateStatusNameForInitiator: "", 
  
  chefDepValidationSatus: "",
  cfoValidationStatus: "",
  validatorStatus: "",
  initiator_status: "", 

  chefDepValidationTime: "", 
  cfoValidationTime: "", 
  validatorTime: "", 
  initiator_Time: "", 

  theDepartmentChef: "", 
  theFinancialChief: "",
  theCashier: "", 
  inputationNumber: "",

};

export default function TableComponent() {
  const allCashoutsFromGlobalState = useSelector((state) => state.allCashoutData.allCashoutsData);
  const [ cashoutDataTemp ] = useState (removeDuplicatesByProperty (allCashoutsFromGlobalState))

  const refresh = useSelector((state) => state.refreshToggleData.refresh)
  useEffect(() => {
    console.log("Refreshing Table")
  }, [ refresh ])

  const [ decaissementsData, setDecaissementsData ] = useState ([])

  const getAllCashouts = async () => {
    let temp; 
    const getAllashouts = new SaveDisbursementService(); 
    const userServices = new UsersService (); 
    const settingsServices = new SettingsService (); 

    const cashouts = await getAllashouts.getDisbursment();
    const allUsers = await userServices.getAllUsers (); 

    const allValidatorsMap = filterAllValidatorsMap (allUsers.data)
    const newTranformedValidators = newTranformedValidatorArray (allValidatorsMap); 

    const getThisUser = JSON.parse(localStorage.getItem("user"))
    const getOffice = await settingsServices.getOneOffice(getThisUser?.office_id[0]?._id); 
    const getUserRoleLevel = getThisUser?.role[0]?.level; 
    const getLoggedInUserAmount = getThisUser?.role[0]?.role_amount_id[0]?.amount; 
    const alTheOffices = getOffice.data

    const statusName = await settingsServices.getStatusName();

    // GETTING ALL STATUS NAME WITH NUMBER 3 LEVEL (NUMBER 3 INDICATES PENDING STATE)
    const getPendingStateAddedColor = statusName.data.filter((status) => {
      return status?.flag === 3
    })
    const getPendingState = getPendingStateAddedColor.map((status) => {
      return {
        ...status, 
        color: "warning", 
      }
    })
    console.log("getPendingStateAddedColorgetPendingStateAddedColor: ", getPendingStateAddedColor)
    const getRejectionStateAddedColor = statusName.data.filter((status) => {
      return status?.flag === 2
    })
    const getRejectionState = getRejectionStateAddedColor.map((status) => {
      return {
        ...status, 
        color: "danger", 
      }
    })
    const getValidationStateAddedColor = statusName.data.filter((status) => {
      return status?.flag === 1
    })
    const getValidationState = getValidationStateAddedColor.map((status) => {
      return {
        ...status, 
        color: "success", 
      }
    })

    console.log("/////////", getPendingState)
    console.log("[[[[[]]]]]", getRejectionState)
    console.log("{{{{{}}}}}", getValidationState)

    // CATEGORISING THE STATUS NAME WITH NUMBER 3 AND MAPPING THEM TO CORRESPONDING ROLE
    // 1-) get all the roles
    const roles = await settingsServices.getRoles(); 
    console.log(roles.data, "---===---")
    
    // 2-) mapping each status name number 3 to a role and putting it as default
    let pendingStatusNameForChefDepartment = ""; 
    let pendingStatusNameForSuperValidator = ""; 
    let pendingStatusNameForCaissiere = ""; 
    let pendingStatusNameForInitiator = ""; 

    let validateStatusNameForChefDepartment = ""; 
    let validateStatusNameForCFO = ""; 
    let validateStatusNameForCaissiere = ""; 
    let validateStatusNameForInitiator = ""; 

    let rejectStatusNameForChefDepartment = ""; 
    let rejectStatusNameForSuperValidator = ""; 
    let rejectStatusNameForCaissiere = ""; 
    let rejectStatusNameForInitiator = ""; 

    roles.data.forEach((role) => {

      getPendingState.forEach((pendingStatus) => {
        
        if (role.level === 1) {
          // && pendingStatusNameForSuperValidator === ""
          const exists = role?.status_name_id.some(status_name => {
            return status_name._id === pendingStatus._id && status_name.name === pendingStatus.name;
          });
          if (exists) {
            pendingStatusNameForSuperValidator = role?.status_name_id?.find(status_name => {
              // console.log("<<<<<: ", pendingStatus?._id === status_name?._id, pendingStatus?._id, status_name?._id)
              return pendingStatus?._id === status_name?._id
            })
          }
        }

        if (role.level === 2) {
          // && pendingStatusNameForChefDepartment === ""
          const exists = role?.status_name_id.some(status_name => {
            return status_name._id === pendingStatus._id && status_name.name === pendingStatus.name;
          });
          if (exists) {
            pendingStatusNameForChefDepartment = role?.status_name_id?.find(status_name => {
              // console.log("<<<<<: ", pendingStatus?._id === status_name?._id, pendingStatus?._id, status_name?._id)
              return pendingStatus?._id === status_name?._id
            })
          }
        }

        if (role.level === 3) {
          // && pendingStatusNameForCaissiere === ""
          const exists = role?.status_name_id.some(status_name => {
            return status_name._id === pendingStatus._id && status_name.name === pendingStatus.name;
          });
          if (exists) {
            pendingStatusNameForCaissiere = role?.status_name_id?.find(status_name => {
              // console.log("<<<<<: ", pendingStatus?._id === status_name?._id, pendingStatus?._id, status_name?._id)
              return pendingStatus?._id === status_name?._id
            })
          }
        }

        if (role.level === 4) {
          // && pendingStatusNameForInitiator === ""
          const exists = role?.status_name_id.some(status_name => {
            return status_name._id === pendingStatus._id && status_name.name === pendingStatus.name;
          });
          if (exists) {
            pendingStatusNameForInitiator = role?.status_name_id?.find(status_name => {
              // console.log("<<<<<: ", pendingStatus?._id === status_name?._id, pendingStatus?._id, status_name?._id)
              return pendingStatus?._id === status_name?._id
            })
          }
        }

      });

      getRejectionState.forEach((rejectStatus) => {
        
        if (role.level === 1) {
          // && rejectStatusNameForSuperValidator === ""
          const exists = role?.status_name_id.some(status_name => {
            return status_name._id === rejectStatus._id && status_name.name === rejectStatus.name;
          });
          if (exists) {
            rejectStatusNameForSuperValidator = role?.status_name_id?.find(status_name => {
              // console.log(">>>>: ", rejectStatus?._id === status_name?._id, rejectStatus?._id, status_name?._id)
              return rejectStatus?._id === status_name?._id
            })
          }
        }

        if (role.level === 2) {
          // && rejectStatusNameForChefDepartment === ""
          const exists = role?.status_name_id.some(status_name => {
            return status_name._id === rejectStatus._id && status_name.name === rejectStatus.name;
          });
          if (exists) {
            rejectStatusNameForChefDepartment = role?.status_name_id?.find(status_name => {
              // console.log(">>>>: ", rejectStatus?._id === status_name?._id, rejectStatus?._id, status_name?._id)
              return rejectStatus?._id === status_name?._id
            })
          }
        }

        if (role.level === 3) {
          // && rejectStatusNameForCaissiere === ""
          const exists = role?.status_name_id.some(status_name => {
            return status_name._id === rejectStatus._id && status_name.name === rejectStatus.name;
          });
          if (exists) {
            rejectStatusNameForCaissiere = role?.status_name_id?.find(status_name => {
              console.log(">>>>: ", rejectStatus?._id === status_name?._id, rejectStatus?._id, status_name?._id)
              return rejectStatus?._id === status_name?._id
            })
          }
          
        }

        if (role.level === 4) {
          // && rejectStatusNameForInitiator === ""
          const exists = role?.status_name_id.some(status_name => {
            return status_name._id === rejectStatus._id && status_name.name === rejectStatus.name;
          });
          if (exists) {
            rejectStatusNameForInitiator = role?.status_name_id?.find(status_name => {
              // console.log(">>>>: ", rejectStatus?._id === status_name?._id, rejectStatus?._id, status_name?._id)
              return rejectStatus?._id === status_name?._id
            })
          }
          
        }

      });

      getValidationState.forEach((validateStatus) => {
        
        if (role.level === 1 && validateStatusNameForCFO === "") {
          const exists = role?.status_name_id.some(status_name => {
            return status_name._id === validateStatus._id && status_name.name === validateStatus.name;
          });
          if (exists) {
            validateStatusNameForCFO = role?.status_name_id?.find(status_name => {
              return validateStatus?._id === status_name?._id
            })
          }
        }

        if (role.level === 2 && validateStatusNameForChefDepartment === "") {
          const exists = role?.status_name_id.some(status_name => {
            return status_name._id === validateStatus._id && status_name.name === validateStatus.name;
          });
          if (exists) {
            validateStatusNameForChefDepartment = role?.status_name_id?.find(status_name => {
              return validateStatus?._id === status_name?._id
            })
          }
        }
  
        if (role.level === 3 && validateStatusNameForCaissiere === "") {
          const exists = role?.status_name_id.some(status_name => {
            return status_name._id === validateStatus._id && status_name.name === validateStatus.name;
          });
          if (exists) {
            validateStatusNameForCaissiere = role?.status_name_id?.find(status_name => {
              return validateStatus?._id === status_name?._id
            })
          }
        }
  
        if (role.level === 4 && validateStatusNameForInitiator === "") {
          const exists = role?.status_name_id.some(status_name => {
            return status_name._id === validateStatus._id && status_name.name === validateStatus.name;
          });
          if (exists) {
            validateStatusNameForInitiator = role?.status_name_id?.find(status_name => {
              return validateStatus?._id === status_name?._id
            })
          }
        }

      });

    });

    temp = cashouts.data.map((cash, index) => {
      const getChefDepartement = getChefDepsGeneric (allUsers.data, 2, cash?.initiator[0]?.department_id[0]?._id); 
      const getCashier = getUserGenericFunc (allUsers.data, 3)
      const validatorsForTheAmount = newTranformedValidators.filter((val, index) => {
        if (val.role[0]?.role_amount_id[0]?.amount >= cash?.amount) {
          return val
        }
      })

      const minimumValidator = Math.min(...validatorsForTheAmount.map(item => item.role[0]?.role_amount_id[0]?.amount))

      const theSelectedValidator = validatorsForTheAmount.filter((val, index) => {
        if (val.role[0]?.role_amount_id[0]?.amount === minimumValidator) {
          return val
        }
      })

      const levelOne = cash?.disbursement_status_id.length > 0 ? cash?.disbursement_status_id.find((lev, i) => {
        return lev.user_id[0]?.role[0]?.level === 1; 
      }) : "hi" ; 
      const levelTwo = cash?.disbursement_status_id.length > 0 ? cash?.disbursement_status_id.find((lev, i) => {
        return lev.user_id[0]?.role[0]?.level === 2; 
      }) : "hi"; 
      const levelThree = cash?.disbursement_status_id.length > 0 ? cash?.disbursement_status_id.find((lev, i) => {
        return lev.user_id[0]?.role[0]?.level === 3; 
      }) : "hi"; 
      const levelFour = cash?.disbursement_status_id.length > 0 ? cash?.disbursement_status_id.find((lev, i) => {
        return lev.user_id[0]?.role[0]?.level === 4; 
      }) : "hi"; 
  

      return {
        ...cash, 
        createdAt: cash?.createdAt, 
        initiator_name: `${cash?.initiator[0]?.first_name} ${ cash?.initiator[0]?.last_name }` || "Pas de roles", 
        initiator: cash?.initiator[0]?._id || "Pas de roles", 
        department_name: cash?.initiator[0]?.department_id[0]?.name, 
        department_id: cash?.initiator[0]?.department_id[0]?._id, 
        beneficiary_id: cash?.beneficiary_id[0]?._id, 
        theDepartmentChef: `${getChefDepartement[0]?.first_name} ${ getChefDepartement[0]?.last_name }`, 
        theDepartmentChef_id: getChefDepartement[0]?._id, 
        theFinancialChief: `${theSelectedValidator[0]?.first_name} ${ theSelectedValidator[0]?.last_name}`,
        theFinancialChief_id: theSelectedValidator[0]?._id,

        office_name: alTheOffices?.name,
        office_id: cash?.initiator[0]?.office_id[0], 
        level: getUserRoleLevel, 

        statusNameReject: getThisUser?.role[0]?.status_name_id[0]?.name, 
        statusIDReject: getThisUser?.role[0]?.status_name_id[0]?._id, 
        statusNameAccept: getThisUser?.role[0]?.status_name_id[1]?.name, 
        statusIDAccept: getThisUser?.role[0]?.status_name_id[1]?._id, 

        theCashier: `${ getCashier[0]?.first_name } ${ getCashier[0]?.last_name }`, 
        theCashier_id: getCashier[0]?._id, 
        loggedInUserAmount: getLoggedInUserAmount, 

        pendingStatusNameForSuperValidator: pendingStatusNameForSuperValidator, 
        pendingStatusNameForChefDepartment: pendingStatusNameForChefDepartment, 
        pendingStatusNameForCaissiere: pendingStatusNameForCaissiere, 
        pendingStatusNameForInitiator: pendingStatusNameForInitiator, 

        rejectStatusNameForChefDepartment: rejectStatusNameForChefDepartment, 
        rejectStatusNameForSuperValidator: rejectStatusNameForSuperValidator, 
        rejectStatusNameForCaissiere: rejectStatusNameForCaissiere, 
        rejectStatusNameForInitiator: rejectStatusNameForInitiator, 

        validateStatusNameForChefDepartment: validateStatusNameForChefDepartment, 
        validateStatusNameForCFO: validateStatusNameForCFO, 
        validateStatusNameForCaissiere: validateStatusNameForCaissiere, 
        validateStatusNameForInitiator: validateStatusNameForInitiator, 

        chefDepValidationSatus: levelTwo && levelTwo.user_id && levelTwo.user_id.length != 0 ? {
          name: levelTwo.status_name_id[0]?.name, 
          flag: levelTwo.status_name_id[0]?.flag
        } : { 
          name: pendingStatusNameForChefDepartment.name, 
          flag: pendingStatusNameForChefDepartment.flag, 
        }, 
        cfoValidationStatus: levelOne && levelOne.user_id && levelOne.user_id.length != 0 ? { 
          name: levelOne.status_name_id[0]?.name, 
          flag: levelOne.status_name_id[0]?.flag, 
        } : { 
          name: pendingStatusNameForSuperValidator.name, 
          flag: pendingStatusNameForSuperValidator?.flag, 
        }, 
        validatorStatus: levelThree && levelThree.user_id && levelThree.user_id.length != 0 ? { 
          name: levelThree.status_name_id[0]?.name, 
          flag: levelThree.status_name_id[0]?.flag, 
        } : { 
          name: pendingStatusNameForCaissiere?.name, 
          flag: pendingStatusNameForCaissiere?.flag,
        }, 
        initiator_status: levelFour && levelFour.user_id && levelFour.user_id.length != 0 ? {
          name: levelFour.status_name_id[0]?.name, 
          flag: levelFour.status_name_id[0]?.flag,
        } : {
          name: pendingStatusNameForInitiator.name, 
          flag: pendingStatusNameForInitiator.flag
        },

        chefDepValidationTime: levelTwo && levelTwo.user_id && levelTwo.user_id.length != 0 ? cash?.updatedAt : "pas de date", // new Date() levelTwo.status_name_id[0]?.createdAt
        cfoValidationTime: levelOne && levelOne.user_id && levelOne.user_id.length != 0 ? cash?.updatedAt : "pas de date", // new Date() levelOne.status_name_id[0]?.createdAt
        validatorTime: levelThree && levelThree.user_id && levelThree.user_id.length != 0 ? cash?.updatedAt : "pas de date", // new Date() levelThree.status_name_id[0]?.createdAt
        initiator_Time: levelFour && levelFour.user_id && levelFour.user_id.length != 0 ? cash?.updatedAt : "pas de date", // new Date() levelFour.status_name_id[0]?.createdAt

        beneficiary_name: cash?.beneficiary_id[0]?.name, 
        payment_method_id: cash?.payment_method_id[0]?._id, 
        payment_method_name: cash?.payment_method_id[0]?.name, 
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      }
    })

    setDecaissementsData (temp)
  }

  useEffect(() => {
    getAllCashouts (); 
  }, [ refresh ])

  const [ options ] = useState({ year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }); 
  const router = useRouter(); 
  const [filterValue, setFilterValue] = React.useState('');
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: 'age',
    direction: 'ascending',
  });
  const [page, setPage] = React.useState(1);

  const pathname = usePathname(); 
  const programId = pathname.split("/");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = React.useState('blur');
  const [size, setSize] = React.useState('2xl'); 
  const [ showButtons, setShowButtons ] = React.useState(false)

  const [ rejectValidateBtnLabel, setRejectValidateBtnLabel ] = React.useState(["Rejeter", "Valider"])

  const [ showConfirmWindow, setShowConfirmWindow ] = useState (false); 

  const handleQRCodeDisplay = () => {
      setShowConfirmWindow (true)
  }

  const handleQRCodeHide = () => {
      setShowConfirmWindow (false)
  }

  const handleOpen = (backdrop, user) => {
    cashoutObj = user;
    setBackdrop(backdrop);
    onOpen();
  };


  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return mainDecaissementDataColumn;

    return mainDecaissementDataColumn.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredCashouts = [];
    if (typeof decaissementsData === 'string') {
      filteredCashouts = [];
    } else {
      filteredCashouts = [...decaissementsData?.slice().reverse()];
    }

    if (hasSearchFilter) {
      filteredCashouts = filteredCashouts.filter(
        (cashout) => {
          // console.log(cashout)
          // return
          return (
            cashout?.initiator_name?.toLowerCase()?.includes(filterValue?.toLowerCase())
            || cashout?.department_name?.toLowerCase()?.includes(filterValue?.toLowerCase()) 
            || cashout?.beneficiary_name?.toLowerCase()?.includes(filterValue?.toLowerCase()) 
            || cashout?.payment_method_name?.toLowerCase()?.includes(filterValue?.toLowerCase()) 
            || cashout?.chefDepValidationSatus?.toLowerCase()?.includes(filterValue?.toLowerCase()) 
            || cashout?.cfoValidationStatus?.toLowerCase()?.includes(filterValue?.toLowerCase()) 
            || cashout?.validatorStatus?.toLowerCase()?.includes(filterValue?.toLowerCase()) 
            || cashout?.initiator_status?.toLowerCase()?.includes(filterValue?.toLowerCase()) 
          )
        }
      );
    }

    if (
      statusFilter !== 'all' &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredCashouts = filteredCashouts.filter((cashout) =>
        Array.from(statusFilter).includes(cashout.status)
      );
    }

    return filteredCashouts;
  }, [decaissementsData, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);


  const renderCell = React.useCallback((individualCashout, columnKey) => {
    const cellValue = individualCashout[columnKey];
    cashoutObj = individualCashout;

    switch (columnKey) {
      case 'initiator_name':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        );

      case 'department_name':
        return (
          <User
            avatarProps={{ radius: 'lg', src: individualCashout.avatar }}
            description={individualCashout.email}
            name={cellValue}
          >
            {individualCashout.email}
          </User>
        );
      case 'amount':
        let formattedNumber = parseInt(cellValue).toLocaleString('cm-CM', {
          style: 'currency',
          currency: 'XAF',
        });
        const formattedAmount = formattedNumber.replace("FCFA", "").replace(",", " ").trim() + " FCFA";

        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{formattedAmount}</p>
          </div>
        );

      case 'chefDepValidationSatus':
        return (
          <>
            <Chip 
              isDisabled={ 
                individualCashout.level === 2 
                && individualCashout?.cfoValidationStatus?.name !== individualCashout?.rejectStatusNameForSuperValidator?.name // "rejete" 
                && individualCashout?.chefDepValidationSatus?.name === individualCashout?.pendingStatusNameForChefDepartment?.name // "pending" 
                ? false : true } 
              className="capitalize" color={statusColorMap[individualCashout?.chefDepValidationSatus?.flag]} size="sm" variant="flat">
              <button className='flex flex-row gap-x-1 justify-between content-center items-center' onClick={() => {handleOpen('blur', individualCashout); removePDFButton(); setShowButtons (true); setRejectValidateBtnLabel(["Rejeter", "Valider"])}}>
              { individualCashout?.chefDepValidationSatus?.name === individualCashout?.pendingStatusNameForChefDepartment?.name // "pending" 
                ?
                <Image className={`${
                  individualCashout.level === 2 
                  && individualCashout?.cfoValidationStatus?.name !== individualCashout?.rejectStatusNameForSuperValidator?.name // "rejete" 
                  && individualCashout?.chefDepValidationSatus?.name === individualCashout?.pendingStatusNameForChefDepartment?.name // "pending" 
                  ? "animate-ping" : ""}`} src={ pendingIcon } alt='whiteCheck' width={15} height={15} />
                :
                ""
              }
              { individualCashout?.chefDepValidationSatus?.name === individualCashout?.validateStatusNameForChefDepartment?.name // "valide" 
                ?
                <Image src={ validateIcon } alt='whiteCheck' width={15} height={15} />
                :
                ""
              }
              { individualCashout?.chefDepValidationSatus?.name === individualCashout?.rejectStatusNameForChefDepartment?.name // "rejete" 
                ?
                <Image src={ rejeterIcon } alt='pinkCancelButton' width={15} height={15} />
                :
                ""
              }

              { cellValue?.name }
              </button>
            </Chip>
          </>
        );

      case 'cfoValidationStatus': 
        return (
          <>
            <Chip 
              isDisabled={ 
                individualCashout.level === 1 
                && individualCashout?.cfoValidationStatus?.name === individualCashout?.pendingStatusNameForSuperValidator?.name // "pending" 
                && individualCashout?.loggedInUserAmount >= individualCashout?.amount 
                // && individualCashout?.chefDepValidationSatus !== "pending" 
                ? false : true } 
               className={`
               capitalize`} color={statusColorMap[individualCashout?.cfoValidationStatus?.flag]} size="sm" variant="flat">
              <button className='flex flex-row gap-x-1 justify-between content-center items-center' onClick={() => {handleOpen('blur', individualCashout); removePDFButton(); setShowButtons (true); setRejectValidateBtnLabel(["Rejeter", "Valider"])}}>
                { individualCashout?.cfoValidationStatus?.name === individualCashout?.pendingStatusNameForSuperValidator?.name // "pending" 
                  ?
                  <Image className={`${
                    individualCashout.level === 1 
                    && individualCashout?.cfoValidationStatus?.name === individualCashout?.pendingStatusNameForSuperValidator?.name // "pending" 
                    && individualCashout?.loggedInUserAmount >= individualCashout?.amount   
                    ? "animate-ping" : ""}`} src={ pendingIcon } alt='whiteCheck' width={15} height={15} />
                  :
                  ""
                }
                { 
                  individualCashout?.cfoValidationStatus?.name === individualCashout?.validateStatusNameForCFO?.name // "valide" 
                  ?
                  <Image src={ validateIcon } alt='whiteCheck' width={15} height={15} />
                  :
                  ""
                }
                { individualCashout?.cfoValidationStatus?.name === individualCashout?.rejectStatusNameForSuperValidator?.name // "rejete" 
                  ?
                  <Image src={ rejeterIcon } alt='pinkCancelButton' width={15} height={15} />
                  :
                  ""
                }
                {/* { cellValue === "pending" ? "En Attente" : "" }
                { cellValue === "valide" ? "Validé" : "" }
                { cellValue === "rejete" ? "Rejeté" : "" } */}
                { cellValue?.name }
              </button>
            </Chip>
          </>
        ); 
      case 'validatorStatus': 
        return (
          <>
            <Chip 
              isDisabled={ 
                individualCashout.level === 3 
                && individualCashout?.cfoValidationStatus?.name === individualCashout?.validateStatusNameForCFO?.name // "valide" 
                // && individualCashout?.validatorStatus === "pending"
                // && individualCashout?.validatorStatus === "décaisser"
                && individualCashout?.initiator_status?.name === individualCashout?.pendingStatusNameForInitiator?.name // "pending" 
                // && individualCashout?.cfoValidationStatus !== "pending" 
                // && individualCashout?.cfoValidationStatus !== "rejete" 
                // && individualCashout?.chefDepValidationSatus !== "pending" 
                // && individualCashout?.validatorStatus !== "en_attente_de_fond"
                 ? false : true } 
              className="capitalize" color={statusColorMap[individualCashout?.validatorStatus?.flag]} size="sm" variant="flat">
              <button className='flex flex-row gap-x-1 justify-between content-center items-center' onClick={() => {
                handleOpen('blur', individualCashout); 
                removePDFButton(); 
                setShowButtons (true); 
                // console.log("individualCashout?.validatorStatus", individualCashout?.validatorStatus)
                // console.log(individualCashout?.validatorStatus === "pending")
                if (individualCashout?.validatorStatus?.name === individualCashout?.pendingStatusNameForCaissiere?.name ) { // "pending"
                  setRejectValidateBtnLabel(["Rejeter", "Décaisser"]); 
                  handleQRCodeHide (); 
                } else if (individualCashout?.validatorStatus?.name === individualCashout?.validateStatusNameForCaissiere?.name ) { // "décaisser"
                  handleQRCodeDisplay ();
                }
              }}>
                {/* En attente de fond */}
                { individualCashout?.validatorStatus?.name === individualCashout?.pendingStatusNameForCaissiere?.name // "pending" 
                  ?
                  <Image className={`${
                    individualCashout.level === 3 
                    && individualCashout?.cfoValidationStatus?.name === individualCashout?.validateStatusNameForCFO?.name // "valide" 
                    // && individualCashout?.validatorStatus === "pending" 
                    // && individualCashout?.validatorStatus === "décaisser"
                    && individualCashout?.initiator_status?.name === individualCashout?.pendingStatusNameForInitiator?.name // "pending" 
                    ? "animate-ping" : ""}`} src={ pendingIcon } alt='whiteCheck' width={15} height={15} />
                  :
                  ""
                }
                { individualCashout?.validatorStatus?.name === individualCashout?.validateStatusNameForCaissiere?.name // "décaisser" 
                  ?
                  <Image 
                    className={`${
                      individualCashout.level === 3 
                      && individualCashout?.cfoValidationStatus?.name === individualCashout?.validateStatusNameForCFO?.name // "valide" 
                      // && individualCashout?.validatorStatus === "pending" 
                      // && individualCashout?.validatorStatus === "décaisser"
                      && individualCashout?.initiator_status?.name === individualCashout?.pendingStatusNameForInitiator?.name // "pending" 
                      ? "animate-ping" : ""}`}
                  src={ validateIcon } alt='whiteCheck' width={15} height={15} />
                  :
                  ""
                }
                { individualCashout?.validatorStatus?.name === individualCashout?.rejectStatusNameForCaissiere?.name // "en_attente_de_fond" 
                  ?
                  <Image src={ waitingFundIcon } alt='pinkCancelButton' width={15} height={15} />
                  :
                  ""
                }
                {/* { cellValue === "pending" ? "En Attente" : "" }
                { cellValue === "décaisser" ? "Décaissé" : "" }
                { cellValue === "en_attente_de_fond" ? "Rejeté" : "" } */}
                { cellValue?.name }
              </button>
            </Chip>
          </>
        );

      case 'initiator_status':
        return (
          <>
            <Chip
              // isDisabled={ 
              //   individualCashout.level === 4 
              //   && individualCashout?.cfoValidationStatus === "valide" 
              //   && individualCashout?.validatorStatus === "décaisser"
              //   && individualCashout?.initiator_status === "pending" 
              //   // && individualCashout?.chefDepValidationSatus !== "pending" 
              //   // && individualCashout?.cfoValidationStatus !== "pending" 
              //   ? false : true } 
              isDisabled={ true }
              className={`
              
                capitalize`
              } color={statusColorMap[individualCashout?.initiator_status?.flag]} size="sm" variant="flat">
              <button className={` flex flex-row gap-x-1 justify-between content-center items-center`} onClick={() => {handleOpen('blur', individualCashout); removePDFButton(); setShowButtons (true); setRejectValidateBtnLabel(["Non reçu", "Encaissement"])}}>
              {/* received */}
                { individualCashout?.initiator_status?.name === individualCashout?.pendingStatusNameForInitiator?.name // "pending" 
                  ?
                  <Image 
                    // className={`${
                    //   individualCashout.level === 4 
                    //   && individualCashout?.cfoValidationStatus === "valide" 
                    //   && individualCashout?.validatorStatus === "décaisser"
                    //   && individualCashout?.initiator_status === "pending" 
                    //   ? "animate-ping" : ""}`} 
                    src={ pendingIcon } alt='whiteCheck' width={15} height={15} />
                  :
                  ""
                }
                { individualCashout?.initiator_status?.name === individualCashout?.validateStatusNameForInitiator?.name // "encaisse" 
                  ?
                  <Image src={ validateIcon } alt='whiteCheck' width={15} height={15} />
                  :
                  ""
                }
                { individualCashout?.initiator_status?.name === individualCashout?.rejectStatusNameForInitiator?.name // "non_reçu" 
                  ?
                  <Image src={ rejeterIcon } width={15} height={15} />
                  :
                  ""
                }
                {/* { cellValue === "pending" ? "En Attente" : "" }
                { cellValue === "encaisse" ? "Encaissé" : "" }
                { cellValue === "non_reçu" ? "Non Reçu" : "" } */}
                { cellValue?.name }
              </button>
            </Chip>
          </>
        );

      case 'date':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{ new Date(cellValue)?.toLocaleDateString("fr-FR", options)}</p>
            <p className="text-bold text-tiny capitalize text-default-400">
              {new Date(cellValue).getHours()}H : { new Date(cellValue).getMinutes()}M : { new Date(cellValue).getSeconds()}s
            </p>
          </div>
        );

      case 'actions':
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem onPress={() => {handleOpen('blur', individualCashout); handleQRCodeHide (); setShowButtons (false); removePDFButton()}}>
                  Voir
                </DropdownItem>

                <DropdownItem onClick={ () => {handleOpen('blur', individualCashout); handleQRCodeHide (); showPdfPreview (); setShowButtons (false)} }>
                {/* onClick={() => {dispatch({ type: "SHOWDATATOPRINTPRIVIEW" }); dispatch({ type: "LOADDATATOPRINT", dataToPrint: pdfObjN })} } */}
                  Download PDF
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue('');
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4 z-0">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            {/* <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  startContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown> */}
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  startContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                style={{
                  overflowY: "scroll",
                  height: "300px"
                }}
                onSelectionChange={setVisibleColumns}
              >
                {mainDecaissementDataColumn.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button color="primary" startContent={<PlusIcon />}>
              <Link href={`/decaissement`}>Faire un Décaissements</Link>
              {/* /${ programId[1] } */}
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {decaissementsData.length} décaissements
          </span>
          <label className="flex items-center text-default-400 text-small">
            Ligne par page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    decaissementsData.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === 'all'
            ? 'All items selected'
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Précédent
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Suivant
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]); 

  const [ showDownloadButton, setShowDownloadButton ] = useState (false)
  const showPdfPreview = () => {
    // setShowDownloadButton ((showDownloadButton) => !showDownloadButton)
    setShowDownloadButton (true)
  }

  const removePDFButton = () => {
    // setShowDownloadButton ((showDownloadButton) => !showDownloadButton)
    setShowDownloadButton (false)
  }

  const refDiv = useRef();

  const function_pdf=usePdf(refDiv);

  const dispatch = useAppDispatch(); 

  const changePDFDesignStyle = useSelector((state) => state.refreshToggleData.changePDFDesignStyle); 

  const handleTogglePDFDesignStyleOutsideClick = () => {
    dispatch(togglePDFDesignStyle(false)); 
  }

  const ref = useOutsideClick(() => handleTogglePDFDesignStyleOutsideClick ());


  const handleTogglePDFDesignStyle = () => {
    if (changePDFDesignStyle === true) {
      dispatch(togglePDFDesignStyle(true)); 
    } else {
      dispatch(togglePDFDesignStyle(!changePDFDesignStyle)); 
    }
  }

  const runPDFHandler = () => {
    handleTogglePDFDesignStyle ()

    setTimeout (() => {
      function_pdf ()
    }, 500)
  }

  useEffect(() => {
    console.log("hi"); 
  }, [togglePDFDesignStyle])

  return (
    <>
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: 'max-h-[382px]',
        }}
        // selectedKeys={selectedKeys}
        // selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === 'actions' ? 'center' : 'start'}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody 
          emptyContent={"En cours de téléchargement..."}
          // loadingState={ <ThreeDotsLoadingAnimation color="easeBlue" /> }
          // loadingContent={"hi"} 
          items={sortedItems}
          l
        >
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Modal
        backdrop={backdrop}
        isOpen={isOpen}
        onClose={() => {onClose (); dispatch(togglePDFDesignStyle(false)); } }
        size={size}
        classNames={{
          body: "py-50 z-[1000000000000]", 
          // base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
          header: "border-b-[1px] border-[#292f46]",
          footer: "border-t-[1px] border-[#292f46]",
          // closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          {(onClose) => {

              console.log("cashoutObj?.theCashiercashoutObj?.theCashier: ", cashoutObj?.office_id)

              return (
                <>
                      {
                        showConfirmWindow ? 
                          <GenericSummaryCard 
                          refDiv={ refDiv }
                          fullName={ cashoutObj?.initiator_name}
                          user_id={ cashoutObj?.initiator}
                          phoneNumber="(237) 698 00 00 00"
                          inputationNumber={ "DED-00000000001"} 
                          date={ cashoutObj?.createdAt || "12/04/2023" } 
                          amount={ cashoutObj?.amount }
                          paymentType={ cashoutObj?.payment_method_name }
                          office={ cashoutObj?.office_id || "Yaounde" } 
                          chefOfDepName={ cashoutObj?.theDepartmentChef || "Dongmo"} 
                          amountInWords={ cashoutObj?.letter_amount || convertNumberToFrench (cashoutObj?.amount) } 
                          financialChefName={ cashoutObj?.theFinancialChief || "Franck Dakayi" } 
                          theCashier={ cashoutObj?.theCashier || "Elong Augustine"}
                          // theCashier_id={  }
                          chefDepValidationSatus= { cashoutObj?.chefDepValidationSatus } 
                          cfoValidationStatus= { cashoutObj?.cfoValidationStatus} 
                          validatorStatus= { cashoutObj?.validatorStatus} 
                          initiator_status= { cashoutObj?.initiator_status} 

                          chefDepValidationTime={ cashoutObj?.chefDepValidationTime }
                          cfoValidationTime={ cashoutObj?.cfoValidationTime }
                          validatorTime={ cashoutObj?.validatorTime }
                          initiator_Time={ cashoutObj?.initiator_Time }

                          // pendingStatusNameForSuperValidator={ cashoutObj?.pendingStatusNameForSuperValidator } 
                          // pendingStatusNameForChefDepartment={ cashoutObj?.pendingStatusNameForChefDepartment } 
                          // pendingStatusNameForCaissiere={ cashoutObj?.pendingStatusNameForCaissiere } 
                          // pendingStatusNameForInitiator={ cashoutObj?.pendingStatusNameForInitiator } 

                          // rejectStatusNameForChefDepartment={ cashoutObj?.rejectStatusNameForChefDepartment } 
                          // rejectStatusNameForSuperValidator={ cashoutObj?.rejectStatusNameForSuperValidator } 
                          // rejectStatusNameForCaissiere={ cashoutObj?.rejectStatusNameForCaissiere } 
                          // rejectStatusNameForInitiator={ cashoutObj?.rejectStatusNameForInitiator } 

                          // validateStatusNameForChefDepartment={ cashoutObj?.validateStatusNameForChefDepartment } 
                          // validateStatusNameForCFO={ cashoutObj?.validateStatusNameForCFO } 
                          // validateStatusNameForCaissiere={ cashoutObj?.validateStatusNameForCaissiere } 
                          // validateStatusNameForInitiator={ cashoutObj?.validateStatusNameForInitiator } 

                          cashouNote={ cashoutObj?.reject_note}
                          toggleBtn1={true}
                          toggleBtn2={true}
                          level={ cashoutObj?.level }
                          statusNameAccept={ cashoutObj?.statusNameAccept }
                          statusIDAccept={ cashoutObj?.statusIDAccept }
                          statusNameReject={ cashoutObj?.statusNameReject }
                          statusIDReject={ cashoutObj?.statusIDReject }
                          label={rejectValidateBtnLabel[0]}
                          label2={rejectValidateBtnLabel[1]}
                          classes='bg-decaissementRejectBtnBg text-decaissementRejectBtnText rounded-lg p-4'
                          classes2='bg-decaissementValiderBtnBg text-decaissementValiderBtnText rounded-lg p-4'
                          showTracking={ true }
                          reason={ cashoutObj?.reason }
                          showButton={ showButtons }
                          id={ cashoutObj?._id }
                          functionToExcAfterConfirmRejection={ () => console.log("functionToExcAfterConfirmRejection") }
                          functionToExcAfterConfirmValidation={ () => console.log("functionToExcAfterConfirmValidation") }
                          inCashoutTable={true}
                          onClose={ onClose }
                          displayQRCodeConfimr={ showConfirmWindow }
                          // showConfirmWindow={}
                        />
                        :
                        <div ref={ ref } className={`h-[700px] overflow-y-scroll`} >
                          <GenericSummaryCard 
                            refDiv={ refDiv }
                            fullName={ cashoutObj?.initiator_name}
                            user_id={ cashoutObj?.initiator}
                            phoneNumber="(237) 698 00 00 00"
                            inputationNumber={ "DED-00000000001"} 
                            date={ cashoutObj?.createdAt || "12/04/2023" } 
                            amount={ cashoutObj?.amount }
                            paymentType={ cashoutObj?.payment_method_name }
                            office={ cashoutObj?.office_id || "Yaounde" } 
                            chefOfDepName={ cashoutObj?.theDepartmentChef || "Dongmo"} 
                            amountInWords={ cashoutObj?.letter_amount || convertNumberToFrench (cashoutObj?.amount) } 
                            financialChefName={ cashoutObj?.theFinancialChief || "Franck Dakayi" } 
                            theCashier={ cashoutObj?.theCashier || "Elong Augustine"}
                            // theCashier_id={  }
                            chefDepValidationSatus= { cashoutObj?.chefDepValidationSatus } 
                            cfoValidationStatus= { cashoutObj?.cfoValidationStatus} 
                            validatorStatus= { cashoutObj?.validatorStatus} 
                            initiator_status= { cashoutObj?.initiator_status} 

                            chefDepValidationTime={ cashoutObj?.chefDepValidationTime }
                            cfoValidationTime={ cashoutObj?.cfoValidationTime }
                            validatorTime={ cashoutObj?.validatorTime }
                            initiator_Time={ cashoutObj?.initiator_Time }

                            // pendingStatusNameForSuperValidator={ cashoutObj?.pendingStatusNameForSuperValidator } 
                            // pendingStatusNameForChefDepartment={ cashoutObj?.pendingStatusNameForChefDepartment } 
                            // pendingStatusNameForCaissiere={ cashoutObj?.pendingStatusNameForCaissiere } 
                            // pendingStatusNameForInitiator={ cashoutObj?.pendingStatusNameForInitiator } 
  
                            // rejectStatusNameForChefDepartment={ cashoutObj?.rejectStatusNameForChefDepartment } 
                            // rejectStatusNameForSuperValidator={ cashoutObj?.rejectStatusNameForSuperValidator } 
                            // rejectStatusNameForCaissiere={ cashoutObj?.rejectStatusNameForCaissiere } 
                            // rejectStatusNameForInitiator={ cashoutObj?.rejectStatusNameForInitiator } 
  
                            // validateStatusNameForChefDepartment={ cashoutObj?.validateStatusNameForChefDepartment } 
                            // validateStatusNameForCFO={ cashoutObj?.validateStatusNameForCFO } 
                            // validateStatusNameForCaissiere={ cashoutObj?.validateStatusNameForCaissiere } 
                            // validateStatusNameForInitiator={ cashoutObj?.validateStatusNameForInitiator } 

                            cashouNote={ cashoutObj?.reject_note}
                            toggleBtn1={true}
                            toggleBtn2={true}
                            level={ cashoutObj?.level }
                            statusNameAccept={ cashoutObj?.statusNameAccept }
                            statusIDAccept={ cashoutObj?.statusIDAccept }
                            statusNameReject={ cashoutObj?.statusNameReject }
                            statusIDReject={ cashoutObj?.statusIDReject }
                            label={rejectValidateBtnLabel[0]}
                            label2={rejectValidateBtnLabel[1]}
                            classes='bg-decaissementRejectBtnBg text-decaissementRejectBtnText rounded-lg p-4'
                            classes2='bg-decaissementValiderBtnBg text-decaissementValiderBtnText rounded-lg p-4'
                            showTracking={ true }
                            reason={ cashoutObj?.reason }
                            showButton={ showButtons }
                            id={ cashoutObj?._id }
                            functionToExcAfterConfirmRejection={ () => console.log("functionToExcAfterConfirmRejection") }
                            functionToExcAfterConfirmValidation={ () => console.log("functionToExcAfterConfirmValidation") }
                            inCashoutTable={true}
                            onClose={ onClose }
                            displayQRCodeConfimr={ showConfirmWindow } 
                            // handleQRCodeHide={ handleQRCodeHide }
                            // showConfirmWindow={}
                          />
                          
                        </div>
                      }
                      
                      {
                          showDownloadButton ? 

                                <div className="flex flex-start content-center p-2" >
                                  <div className=''>
                                      <button onClick={ () => { runPDFHandler () } } type='submit' className='bg-easeBlue text-white rounded-xl w-full px-[1rem] py-[.5rem]'>Télécharger PDF</button>
                                  </div>
                                </div>
                            :
                            ""
                          
                        }
                      
                    </>
                
              )
            }
          }
          
          
        </ModalContent>

      </Modal>

    </>
  );
}


























{/* <>
                  {
                    showConfirmWindow ? 
                    <>
                      <RejectionNoteComp 
                          title='Voulez-vous Confirmer' 
                          description='Souhaitez-vous vraiment générer un QR Code pour ce décaissement?'
                          buttonCancelTextColor='bg-decaissementBtn text-decaissementText rounded-lg p-4'
                          buttonAcceptTextColor='bg-decaissementValiderBtnBg text-decaissementValiderBtnText rounded-lg p-4'
                          btnLabel1='Annuller'
                          btnLabel2='Générer QR Code' 
                          cashout_id={cashoutObj?._id} 
                          // status_name_id={ statusIDAccept } 
                          // user_id={user_id} 
                          actionCancelFunction={ handleCloseConfirm } 
                          showTextArea={false}
                          // actionMainFunction={ functionToExcAfterConfirmValidation }
                          onClose={ onClose }
                      />
                      <div className='absolute opacity-40 left-0 top-0 h-full w-full bg-bgColorDark'></div>
                    </>
                    :
                    <>
                      <div ref={ ref } className='h-[700px] overflow-y-scroll' >
                        <GenericSummaryCard 
                          refDiv={ refDiv }
                          fullName={ cashoutObj?.initiator_name}
                          user_id={ cashoutObj?.initiator}
                          phoneNumber="(237) 698 00 00 00"
                          inputationNumber={ "DED-00000000001"} 
                          date={ cashoutObj?.createdAt || "12/04/2023" } 
                          amount={ cashoutObj?.amount }
                          paymentType={ cashoutObj?.payment_method_name }
                          office={ cashoutObj?.office_id || "Yaounde" } 
                          chefOfDepName={ cashoutObj?.theDepartmentChef || "Dongmo"} 
                          amountInWords={ cashoutObj?.letter_amount || convertNumberToFrench (cashoutObj?.amount) } 
                          financialChefName={ cashoutObj?.theFinancialChief || "Franck Dakayi" } 
                          theCashier={ cashoutObj?.theCashier || "Elong Augustine"}
                          // theCashier_id={  }
                          chefDepValidationSatus= { cashoutObj?.chefDepValidationSatus } 
                          cfoValidationStatus= { cashoutObj?.cfoValidationStatus} 
                          validatorStatus= { cashoutObj?.validatorStatus} 
                          initiator_status= { cashoutObj?.initiator_status} 

                          chefDepValidationTime={ cashoutObj?.chefDepValidationTime }
                          cfoValidationTime={ cashoutObj?.cfoValidationTime }
                          validatorTime={ cashoutObj?.validatorTime }
                          initiator_Time={ cashoutObj?.initiator_Time }

                          cashouNote={ cashoutObj?.reject_note}
                          toggleBtn1={true}
                          toggleBtn2={true}
                          level={ cashoutObj?.level }
                          statusNameAccept={ cashoutObj?.statusNameAccept }
                          statusIDAccept={ cashoutObj?.statusIDAccept }
                          statusNameReject={ cashoutObj?.statusNameReject }
                          statusIDReject={ cashoutObj?.statusIDReject }
                          label={rejectValidateBtnLabel[0]}
                          label2={rejectValidateBtnLabel[1]}
                          classes='bg-decaissementRejectBtnBg text-decaissementRejectBtnText rounded-lg p-4'
                          classes2='bg-decaissementValiderBtnBg text-decaissementValiderBtnText rounded-lg p-4'
                          showTracking={ true }
                          reason={ cashoutObj?.reason }
                          showButton={ showButtons }
                          id={ cashoutObj?._id }
                          functionToExcAfterConfirmRejection={ () => console.log("functionToExcAfterConfirmRejection") }
                          functionToExcAfterConfirmValidation={ () => console.log("functionToExcAfterConfirmValidation") }
                          inCashoutTable={true}
                          onClose={ onClose }
                          // showConfirmWindow={}
                        />
                        
                      </div>
                      
                      {
                          showDownloadButton ? 

                                <div className="flex flex-start content-center p-2" >
                                  <div className=''>
                                      <button onClick={ () => { runPDFHandler () } } type='submit' className='bg-easeBlue text-white rounded-xl w-full px-[1rem] py-[.5rem]'>Télécharger PDF</button>
                                  </div>
                                </div>
                            :
                            ""
                          
                        }
                      
                    </>
                  }
                </> */}