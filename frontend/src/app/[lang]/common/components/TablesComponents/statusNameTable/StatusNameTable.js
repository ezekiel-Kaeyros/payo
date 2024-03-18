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
import { statusNameColumns, statusNameData, statusOptions } from '../data';
import { capitalize } from '../utils';
import Link from 'next/link';
// import { CounterContext } from '@/context/app.context';
import { usePathname, useRouter } from 'next/navigation';
// import getToken from '@/helper/getToken';

import {
  Modal,
  ModalContent,
  useDisclosure,
} from '@nextui-org/react';
import DecaissementTypeForm from '../../forms/settings/decaissementTypeForm/DecaissementTypeForm';
import { store } from '../../../../store';;
import { removeDuplicatesByProperty } from '@/utils/removeDuplicate';
import StatusNameForm from '../../forms/settings/statNameForm/StateNameForm';
import ThreeDotsLoadingAnimation from '../../loaders/ThreeDotsLoadingAnimation';
import { useSelector } from 'react-redux';
import SettingsService from '@/services/settingsService';


const statusColorMap = {
  pending: 'warning',
  active: 'success', 
  inactive: 'danger',
};

const INITIAL_VISIBLE_COLUMNS = [
  // "_id", 
  "name", 
  // "active", 
  "flag", 
  "createdAt", 
  "updatedAt", 
  "actions", 
];

let statusNameObj = {
  _id: "",
  name: "", 
  flag: "", 
  active: "", 
  createdAt: "", 
  updatedAt: "", 
};

let statusNameObjEmpty = {
  _id: "",
  name: "", 
  flag: "", 
  active: "", 
  createdAt: "", 
  updatedAt: "", 
};

export default function StatusNameTable() {

  // OPTION FROM DB
  const allStatusNameData = store.getState().statusNameData; 
  const [ statusNameData, setStatusNameData ] = useState (removeDuplicatesByProperty(allStatusNameData.allStatusNameData))

  const transformStatusName = async () => {
    const settingsServices = new SettingsService (); 
    const getAllStatusName = await settingsServices.getStatusName(); 
    let temp; 
    temp = getAllStatusName.data.map((offic, index) => {
      return {
        ...offic, 
        active: true ? "active" : "inactive"
      }
    }); 
    setStatusNameData (temp); 
  }
  
  const refresh = useSelector((state) => state.refreshToggleData.refresh)
  useEffect(() => {
    transformStatusName ()
    console.log("Refreshing Table")
  }, [ refresh ]);

  // const refresh = useSelector((state) => state.refreshToggleData.refresh)
  // useEffect(() => {
  //   console.log("Refreshing Table")
  // }, [ refresh ])

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

  const [ interfaceLabel, setInterfaceLabel ] = useState (["Création d'un Nom de Status", "Ajouter ce Nom de Status", false, "add"  ])

  const handleOpen = (backdrop, user) => {
    statusNameObj = user;
    setBackdrop(backdrop);
    onOpen();
  };

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return statusNameColumns;

    return statusNameColumns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredCashoutTypes = [];
    if (typeof statusNameData === 'string') {
      filteredCashoutTypes = [];
    } else {
      filteredCashoutTypes = [...statusNameData?.slice().reverse()];
    }

    if (hasSearchFilter) {
      filteredCashoutTypes = filteredCashoutTypes.filter(
        (cashoutType) =>{
          return (
            cashoutType.name
              .toLowerCase()
              .includes(filterValue.toLowerCase())
          // || cashoutType.amount.includes(filterValue.toLowerCase()) 
          // || cashoutType.inputationNumber.includes(filterValue.toLowerCase()),

          )
        }
      );
    }
    if (
      statusFilter !== 'all' &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredCashoutTypes = filteredCashoutTypes.filter((cashoutType) =>
        Array.from(statusFilter).includes(cashoutType.status)
      );
    }

    return filteredCashoutTypes;
  }, [statusNameData, filterValue, statusFilter]);

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


  const renderCell = React.useCallback((decaissementType, columnKey) => {
    const cellValue = decaissementType[columnKey];
    statusNameObj = decaissementType;

    switch (columnKey) {
      case 'name':
        return (
          // <User
          //   avatarProps={{ radius: 'lg', src: decaissementType.avatar }}
          //   description={decaissementType.email}
          //   name={cellValue}
          // >
          //   {decaissementType.name}
          // </User>

          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{ cellValue }</p>
          </div>
        );
      
      case 'flag':
        return (
          // <User
          //   avatarProps={{ radius: 'lg', src: decaissementType.avatar }}
          //   description={decaissementType.email}
          //   name={cellValue}
          // >
          //   {decaissementType.name}
          // </User>

          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{ cellValue }</p>
          </div>
        );


      case 'active':
        return (
          <>
            <Chip className="capitalize" color={statusColorMap[decaissementType?.active]} size="sm" variant="flat">
              { decaissementType?.active }
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


                <DropdownItem onPress={() => {handleOpen('blur', decaissementType); setInterfaceLabel (["Voir Nom de Status", "Voir ce Nom de Status", true, "view" ]) }}>
                  Voir
                </DropdownItem>

                <DropdownItem onPress={() => {handleOpen('blur', decaissementType); setInterfaceLabel (["Modification d'un Nom de Status", "Modifier ce Nom de Status", true, "update" ]) }}>
                  Modifier
                </DropdownItem>

                <DropdownItem onPress={() => {handleOpen('blur', decaissementType); setInterfaceLabel (["Suppression du Nom de Status", "Supprimer ce Nom de Status", true, "delete" ]) }}>
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
                {statusNameColumns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button color="primary" onPress={() => {handleOpen('blur', statusNameObjEmpty); setInterfaceLabel (["Création d'un Nom de Status", "Ajouter ce Nom de Status", false, "add" ]) }} startContent={<PlusIcon />}>
              {/* <Link href={`/decaissement`}>Creer un Nom de Status</Link> */}
              Creer un Nom de Status
              {/* /${ programId[1] } */}
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {statusNameData.length} nom de status
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
    statusNameData.length,
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
          // base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
          header: "border-b-[1px] border-[#292f46]",
          footer: "border-t-[1px] border-[#292f46]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <StatusNameForm
                onClose={ onClose }
                headerTitle={ interfaceLabel[0] }
                headerDescription={ interfaceLabel[1] }
                filled={ interfaceLabel[2] } 
                action={ interfaceLabel[3] } 
                active={ statusNameObj?.active }
                value={statusNameObj?.name }
                _id={ statusNameObj?._id }
                flag={ statusNameObj?.flag }
               />
            </>
          )}
        </ModalContent>

      </Modal>

    </>
  );
}




