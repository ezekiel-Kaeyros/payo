'use client';
import React, { useContext, useEffect, useState } from 'react'; 
import toast from 'react-hot-toast'; 
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
} from '@nextui-org/react';
import { PlusIcon } from '../PlusIcon';
import { VerticalDotsIcon } from '../VerticalDotsIcon';
import { SearchIcon } from '../SearchIcon';
import { ChevronDownIcon } from '../ChevronDownIcon';
import { columns, statusOptions } from '../data';
import { capitalize } from '../utils';
import Link from 'next/link';
// import { CounterContext } from '@/context/app.context';
import { usePathname, useRouter } from 'next/navigation';
// import getToken from '@/helper/getToken';

import {
  Modal,
  ModalContent,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react';
import CreateUserComponent from '../../../../(dashboard)/users/createUser/CreateUserComponent';
// import { store, useAppDispatch } from '@/app/store';
import { store } from '../../../../store';
import { removeDuplicatesByProperty } from '@/utils/removeDuplicate';
import UsersService from '@/services/allUserService';
// import { toggleRefresh } from '@/app/store/slices/refreshSlice';
import { useSelector } from 'react-redux';
import ThreeDotsLoadingAnimation from '../../loaders/ThreeDotsLoadingAnimation';
import { transforArrayForSelectInputField } from '@/utils/tranformArrays';
import SettingsService from '@/services/settingsService';



const statusColorMap = {
  paused: 'warning',
  true: 'success', 
  rejected: 'danger',
};

const validatorsStatusColorMap = {
  non_validateur: 'warning',
  true: 'success', 
  false: 'danger',
};


const INITIAL_VISIBLE_COLUMNS = [
  // 'first_name',
  // 'last_name',
  'name',
  'role_name',
  'department_id', 
  'office',
  'active',
  'avatar', 
  'email', 
  'actions',
];

let userObj = {
  id: "",
  name: "",
  role: "",
  department: "",
  department_id: "", 
  department_name: "", 
  office_id: "", 
  office: "", 
  active: "",
  avatar: "",
  email: "",
};

let userObjEmpty = {
  id: "",
  name: "",
  role: "",
  department: "",
  department_id: "", 
  department_name: "", 
  office_id: "", 
  office: "", 
  active: "",
  avatar: "",
  email: "",
}; 

export default function TableComponent() {

  // GLOBAL STATE DATA LOADING STRATEGY
  const allUsersData = store.getState().allUsersData; 
  const [ users_, setUsers_ ] = useState (removeDuplicatesByProperty(allUsersData.allUserData))

  // API REQUEST LOADING STRATEGY
  const [ users, setUsers ] = useState ([]); 
  const [ departmentsNewData, setDepartmentsNewData ] = useState ([{
    id: "", 
    value: "", 
    text: "",
  }]); 
  const [ rolesDataNewData, setRolesDataNewData ] = useState ([{
      id: "", 
      value: "", 
      text: "",
  }]); 
  const [ officesDataNewData, setOfficesDataNewData ] = useState ([{
      id: "", 
      value: "", 
      text: "",
  }]); 
  
  const getUsers = async () => {
    let temp; 
    const usersServices = new UsersService(); 
    const getallUsers = await usersServices.getAllUsers(); 

    console.log("users: ", getallUsers.data)
    // return

    if (users_.length > 0 && getallUsers.data.length === users_.length) {
      temp = users_.map((user, index) => {
        // console.log("44444444444: ", user[0]?.department_id[0]?._id)
        if (user?.role.length > 1) {
          return {
            ...user, 
            role: user?.role[0]?._id || "Pas de roles", 
            role1:  user?.role[1]?.name || "Pas de roles", 
            office_id: user?.office_id[0]?._id, 
            office: user?.office_id[0]?.name, 
            department_id: user?.department_id[0]?._id, 
            department_name: user?.department_id[0]?.name, 
            avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
          }
        } else {
          return {
            ...user, 
            role: user?.role[0]?._id || "Pas de roles", 
            role_name: user?.role[0]?.name || "Pas de roles", 
            office_id: user?.office_id[0]?._id, 
            office: user?.office_id[0]?.name, 
            department_id: user?.department_id[0]?._id, 
            department_name: user?.department_id[0]?.name, 
            avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
          }
        }
      })
      
    } else {

      temp = getallUsers.data.map((user, index) => {
        // console.log("44444444444: ", user)
        if (user?.role.length > 1) {
          return {
            ...user, 
            role: user?.role[0]?._id || "Pas de roles", 
            role_name: user?.role[0]?.name || "Pas de roles", 
            role1:  user?.role[1]?._id || "Pas de roles", 
            role_name1: user?.role[1]?.name || "Pas de roles", 
            office_id: user?.office_id[0]?._id, 
            office: user?.office_id[0]?.name, 
            department_id: user?.department_id[0]?._id, 
            department_name: user?.department_id[0]?.name, 
            avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
          }
        } else {
          return {
            ...user, 
            role: user?.role[0]?._id || "Pas de roles", 
            role_name: user?.role[0]?.name || "Pas de roles", 
            department_id: user?.department_id[0]?._id, 
            office_id: user?.office_id[0]?._id, 
            office: user?.office_id[0]?.name, 
            department_name: user?.department_id[0]?.name, 
            avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
          }
        }
      })
    }

    // console.log("0000000000: ", temp); 

    const settingsService = new SettingsService ();
    const dep = await settingsService.getDepartments();
    const rol = await settingsService.getRoles(); 
    const offi = await settingsService.getOffices(); 

    setDepartmentsNewData (transforArrayForSelectInputField (dep?.data)); 
    setRolesDataNewData (transforArrayForSelectInputField (rol?.data)); 
    setOfficesDataNewData (transforArrayForSelectInputField (offi?.data)); 
    setUsers(temp); 
  }

  // RELOAD TABLE TO CHANGES EFFECTS
  const refresh = useSelector((state) => state.refreshToggleData.refresh)
  useEffect(() => {
    getUsers (); 
  }, [ refresh ])


  const [ options, setOptions ] = useState({ year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }); 
  const router = useRouter();
  // const [cashouts, set]
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
  const [size, setSize] = React.useState('2xl')

  const [ interfaceLabel, setInterfaceLabel ] = useState (["Création d'un utilisateur", "Ajouter cet Utilisateur", false, "add" ])

  const handleOpen = (backdrop, user) => {
    userObj = user;
    setBackdrop(backdrop);
    onOpen();
  };

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredCashouts = [];
    // console.log(users)
    if (typeof users === 'string') {
      filteredCashouts = [];
    } else {
      filteredCashouts = [...users?.slice().reverse()];
    }

    if (hasSearchFilter) {
      filteredCashouts = filteredCashouts.filter(
        (cashout) => {
          return (
            cashout.first_name.toLowerCase().includes(filterValue.toLowerCase()) 
            || cashout.last_name.toLowerCase().includes(filterValue.toLowerCase())
            || cashout.role_name.toLowerCase().includes(filterValue.toLowerCase())
            || cashout.department_name.toLowerCase().includes(filterValue.toLowerCase())
            || cashout.office.toLowerCase().includes(filterValue.toLowerCase())
          )
        }
        // || cashout.amount.includes(filterValue.toLowerCase()) 
        // || cashout.inputationNumber.includes(filterValue.toLowerCase()),
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
  }, [users, filterValue, statusFilter]);

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


  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];
    userObj = user;

    // console.log("_____________", user)

    switch (columnKey) {

      // office
      case 'name':
        return (
          // <User
          //   avatarProps={{ radius: 'lg', src: user.avatar }}
          //   description={user.last_name}
          //   name={user.first_name}
          // >
          //   {user.first_name}
          // </User>
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{user.last_name}</p>
            <p className="text-bold text-tiny capitalize text-default-400">
              {user.first_name}
            </p>
          </div>
        );

      case 'role_name':
        // users[1].role[0].name
        return (
          // <User
          //   // avatarProps={{ radius: 'lg', src: user.avatar }}
          //   // description={user.email}
          //   name={cellValue}
          // >
          //   {user?.role?.length > 0 ? user?.role[0].name : "Pas de roles"}
          // </User>
          <div className="flex flex-col">
            {/* {user?.role?.length > 0 ? user?.role[0].name : "Pas de roles"} */}
            { cellValue }
          </div>
        );

      case 'department_id':
        return (
          // <User
          //   // avatarProps={{ radius: 'lg', src: user.avatar }}
          //   // description={user.email}
          //   // name={cellValue}
          //   name={ user?.department_id?.length > 0 ? user?.department_name : "Pas de Departement"}
          //   // name={ user?.department_id }
          // >
          //   {user?.department_id?.length > 0 ? user?.department_name : "Pas de Departements"}
          //   {/* {user?.department_id} */}
          // </User>
          <div className="flex flex-col">
            {user?.department_id?.length > 0 ? user?.department_name : "Pas de Departements"}
          </div>
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
            <p className="text-bold text-tiny capitalize text-default-400">
              {formattedAmount}
            </p>
          </div>
        );

      case 'office':
        return (
          // <User
          //   // avatarProps={{ radius: 'lg', src: user.avatar }}
          //   // description={user.last_name}
          //   name={user.office}
          // >
          //   {user.office}
          // </User>
          <div className="flex flex-col">
            {user.office}
          </div>
        );

      case 'active':
        return (
          <>
            <Chip className="capitalize" color={statusColorMap[user?.active]} size="sm" variant="flat">
              { cellValue }
              { user?.active ? "actif" : "inactif" }
            </Chip>
          </>
        );

      case 'validateur':
        return (
          <>
            <Chip className="capitalize" color={validatorsStatusColorMap[user?.validateur]} size="sm" variant="flat">
              { cellValue }
            </Chip>
          </>
        );

      case 'createdAt':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{ new Date(cellValue)?.toLocaleDateString("fr-FR", options)}</p>
            <p className="text-bold text-tiny capitalize text-default-400">
              {new Date(cellValue).getHours()}H : { new Date(cellValue).getMinutes()}M : { new Date(cellValue).getSeconds()}s
            </p>
          </div>
        );

      case 'updatedAt':
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
          <div className="relative flex justify-center items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>

                <DropdownItem onPress={() => {handleOpen('blur', user); setInterfaceLabel (["Voir Utilisateur", "Voir cet Utilisateur", true, "view"]) }}>
                  Voir
                </DropdownItem>

                <DropdownItem onPress={() => {handleOpen('blur', user); setInterfaceLabel (["Modification d'un Utilisateur", "Modifier cet Utilisateur", true, "update"]) }}>
                  Modifier
                </DropdownItem>

                {/* <DropdownItem onPress={() => {handleOpen('blur', user); setInterfaceLabel (["Rendre l'Utilisateur Validateur", "Rendre Validateur", true, "update"]) }}>
                  Rendre Validateur
                </DropdownItem> */}

                <DropdownItem onPress={() => {handleOpen('blur', user); setInterfaceLabel (["Suppression d'un Utilisateur", "Supprimer cet Utilisateur", true, "delete"]) }}>
                  Supprimer
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
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button color="primary" onPress={() => {handleOpen('blur', userObjEmpty); setInterfaceLabel (["Création d'un utilisateur", "Ajouter cet Utilisateur", false, "add"]) }} startContent={<PlusIcon />}>
              Ajouter un Utilisateur
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {users.length} utilisateurs
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
    users.length,
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




    // // GET DATA VIA REQUEST
    // const getAllDataForSettings = async () => {
    //     const settingsService = new SettingsService ();
    //     const dep = await settingsService.getDepartments();
    //     const rol = await settingsService.getRoles(); 
    //     const offi = await settingsService.getOffices(); 

    //     setDepartmentsNewData (transforArrayForSelectInputField (dep?.data)); 
    //     setRolesDataNewData (transforArrayForSelectInputField (rol?.data)); 
    //     setOfficesDataNewData (transforArrayForSelectInputField (offi?.data)); 
    // }

    // useEffect(() => {
    //     getAllDataForSettings (); 
    // }, [])



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
        <TableBody emptyContent={<ThreeDotsLoadingAnimation color="easeBlue" />} items={sortedItems}>
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
        onClose={onClose}
        size={size}
        classNames={{
          body: "py-50",
          // base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
          header: "border-b-[1px] border-[#292f46]",
          footer: "border-t-[1px] border-[#292f46]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <CreateUserComponent
                allDepartments={ departmentsNewData } 
                allRoles={ rolesDataNewData }
                allOffices={ officesDataNewData }
                onClose={ onClose }
                headerTitle={ interfaceLabel[0] }
                headerDescription={ interfaceLabel[1] }
                filled={ interfaceLabel[2]} 
                action={ interfaceLabel[3] }
                first_name={userObj?.first_name}
                last_name={userObj?.last_name}
                email={userObj?.email}
                id={ userObj?._id }
                department_id={ userObj?.department_id}
                department_name={userObj?.department_name}
                role={userObj?.role}
                role_name={userObj?.role_name}
                active={userObj?.active}
                office={userObj?.office}
                office_id={userObj?.office_id}
                // role_id={ userObj?.role}
               />
            </>
          )}
        </ModalContent>

        
      </Modal>

    </>
  );
}




