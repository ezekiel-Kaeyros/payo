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
import { userRolesColumns, statusOptions } from '../data';
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

import GenericSummaryCard from '../../forms/summaryCard/GenericSummaryCard';
import RolesForm from '../../forms/settings/rolesForm/RolesForm';
import { removeDuplicatesByProperty } from '@/utils/removeDuplicate';
// import { store, useAppDispatch } from '@/app/store';
import { store } from '../../../../store';
import ThreeDotsLoadingAnimation from '../../loaders/ThreeDotsLoadingAnimation';
import { useSelector } from 'react-redux';
import SettingsService from '@/services/settingsService';
// import PopupPreviewToPrint from '../ToPrint';

// const statusColorMap = {
//   valide: 'success',
//   rejete: 'danger',
//   pending: 'warning',
// };

const statusColorMap = {
  pending: 'warning',
  active: 'success', 
  inactive: 'danger',
};

const INITIAL_VISIBLE_COLUMNS = [
  "name", 
  // "status", 
  "amount", 
  // "status_name_id", 
  "status_name", 
  "level", 
  "createdAt", 
  "updatedAt", 
  "actions", 
];

let rolesObj = {
  _id: "", 
  name: "", 
  status_name_id: "", 
  status_name: "", 
  role_amount_id: "", 
  level: "", 
  status: "", 
  amount: "", 
  createdAt: "", 
  updatedAt: "", 
};

let rolesObjEmpty = {
  _id: "", 
  name: "", 
  status_name_id: "", 
  status_name: "", 
  role_amount_id: "", 
  level: "", 
  status: "", 
  amount: "", 
  createdAt: "", 
  updatedAt: "", 
};

export default function RolesTable() {
  const theStore = store.getState().roleData; 
  const theStore2 = store.getState().roleAmountData; 
  const [roleDataFromTable, setRoleDataFromTable ] = useState ([])
  const [ roleAmountData, setRoleAmountData ] = useState ([])

  const transformRole = async () => {
    const settingsServices = new SettingsService (); 
    const getAllRoles = await settingsServices.getRoles(); 
    const getAllRoleAmount = await settingsServices.getRolesAmounts(); 
    setRoleAmountData (getAllRoleAmount.data)
    const allRoles = getAllRoles.data
    let temp; 
    temp = allRoles.map((rol, index) => {
      return {
        ...rol, 
        status_name: rol.status_name_id.map((rol, index) => {
          return rol.name
        }), 
        status_name_id: rol.status_name_id.map((rol, index) => {
          return rol._id
        }), 
      }
    })
    setRoleDataFromTable (temp)
  }
  
  const refresh = useSelector((state) => state.refreshToggleData.refresh)
  useEffect(() => {
    transformRole ()
    console.log("Refreshing Table")
  }, [ refresh ]);

  const [ options, setOptions ] = useState({ year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }); 
  const router = useRouter();
  // const [roles, set]
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

  const [ interfaceLabel, setInterfaceLabel ] = useState (["Création d'un Role", "Ajouter ce Role", false, "add" ])

  const handleOpen = (backdrop, user) => {
    rolesObj = user;
    setBackdrop(backdrop);
    onOpen();
  };

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return userRolesColumns;

    return userRolesColumns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredRoles = [];
    if (typeof roleDataFromTable === 'string') {
      filteredRoles = [];
    } else {
      filteredRoles = [...roleDataFromTable?.slice().reverse()];
    }

    if (hasSearchFilter) {
      filteredRoles = filteredRoles.filter(
        (role) => {
          return (
            role.name.toLowerCase().includes(filterValue.toLowerCase())
            || role.status_name.includes(filterValue.toLowerCase()) 
            || role.level === filterValue
            // || role.level.includes(filterValue.toLowerCase())
          )
        }
      );
    }
    if (
      statusFilter !== 'all' &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredRoles = filteredRoles.filter((role) =>
        Array.from(statusFilter).includes(role.status)
      );
    }

    return filteredRoles;
  }, [roleDataFromTable, filterValue, statusFilter]);

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


  const renderCell = React.useCallback((role, columnKey) => {
    const cellValue = role[columnKey];
    rolesObj = role;

    rolesObj = {
      ...rolesObj, 
      amount: roleAmountData.find((amt, index) => {
        amt._id === rolesObj?.role_amount_id || 0
      })
      
    }

    const statusNameRole = role.status_name?.join(", ")

    switch (columnKey) {
      case 'name':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        );

      case 'status_name':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{statusNameRole}</p>
          </div>
        );

      case 'level':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        );

      case 'amount':
        let formattedNumber = parseInt(role.role_amount_id[0]?.amount).toLocaleString('cm-CM', {
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


      case 'status':
        return (
          <>
            <Chip className="capitalize" color={statusColorMap[role?.status]} size="sm" variant="flat">
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
 
                <DropdownItem onPress={() => {handleOpen('blur', role); setInterfaceLabel (["Voir Rôle", "Voir ce Rôle", true, "view"]) }}>
                  Voir
                </DropdownItem>

                <DropdownItem onPress={() => {handleOpen('blur', role); setInterfaceLabel (["Modification d'un Rôle", "Modifier ce Rôle", true, "update"]) }}>
                  Modifier
                </DropdownItem>

                <DropdownItem onPress={() => {handleOpen('blur', role); setInterfaceLabel (["Suppression du Rôle", "Supprimer ce Rôle", true, "delete"]) }}>
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
      <div className="flex flex-col gap-4">
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
                onSelectionChange={setVisibleColumns}
              >
                {userRolesColumns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button color="primary" onPress={() => {handleOpen('blur', rolesObjEmpty); setInterfaceLabel (["Création d'un Rôle", "Ajouter ce Rôle", false, "add"]) }} startContent={<PlusIcon />}>
              {/* <Link href={`/decaissement`}></Link> */}
              Ajouter un Rôle
              {/* /${ programId[1] } */}
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {roleDataFromTable.length} Rôles
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
    roleDataFromTable.length,
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
          header: "border-b-[1px] border-[#292f46]",
          footer: "border-t-[1px] border-[#292f46]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          {(onClose) =>  {
            // console.log("hmmmmmmm", rolesObj)
            // return
            return (
              <>
                <RolesForm 
                  onClose={ onClose }
                  headerTitle={ interfaceLabel[0] || null }
                  headerDescription={ interfaceLabel[1] || null }
                  filled={ interfaceLabel[2] || null } 
                  action={ interfaceLabel[3] || null }
                  roleValue={ rolesObj?.name || null }
                  level={ rolesObj?.level || null }
                  status_name_id={ rolesObj?.status_name_id || null }
                  status_name={ rolesObj?.status_name || null }
                  amountValue={ rolesObj?.role_amount_id[0]?.amount || null }
                  id={ rolesObj?._id || null }
                  role_amount_id={ rolesObj?.role_amount_id[0]?._id || null }
                  status={ rolesObj?.status || null }
                />
              </>
            )}
          }
        </ModalContent>

      </Modal>

    </>
  );
}




