﻿'use client';
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
import { payementModeColumns, payementModeData, statusOptions } from '../data';
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
import { store } from '../../../../store';;
import { removeDuplicatesByProperty } from '@/utils/removeDuplicate';
import PaymentModeForm from '../../forms/settings/payementModeForm/PayementModeForm';
import ThreeDotsLoadingAnimation from '../../loaders/ThreeDotsLoadingAnimation';
import { useSelector } from 'react-redux';
import SettingsService from '@/services/settingsService';


const statusColorMap = {
  pending: 'warning',
  active: 'success', 
  inactive: 'danger',
};

const INITIAL_VISIBLE_COLUMNS = [
  "_id", 
  "name", 
  // "active", 
  "createdAt", 
  "updatedAt", 
  "actions", 
];

let payementModeObj = {
  _id: "",
  name: "", 
  active: "", 
  createdAt: "", 
  updatedAt: "", 
};

let payementModeObjEmpty = {
  _id: "",
  name: "", 
  active: "", 
  createdAt: "", 
  updatedAt: "", 
};

export default function PayementModeTable() {

  // OPTION FROM DB
  const allTypeCashoutData = store.getState().paymentModeData; 
  const [ payementModeData, setPayementModeData ] = useState (removeDuplicatesByProperty(allTypeCashoutData.allPayementModeData))

  const transformStatusName = async () => {
    const settingsServices = new SettingsService (); 
    const getAllPaymentModes = await settingsServices.getPaymentMode(); 
    let temp; 
    temp = getAllPaymentModes.data.map((paymentMod, index) => {
      return {
        ...paymentMod, 
        active: true ? "active" : "inactive"
      }
    }); 
    setPayementModeData (temp); 
  }
  
  const refresh = useSelector((state) => state.refreshToggleData.refresh)
  useEffect(() => {
    transformStatusName ()
    console.log("Refreshing Table")
  }, [ refresh ]);

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

  const [ interfaceLabel, setInterfaceLabel ] = useState (["Création d'un Mode de Paiement", "Ajouter ce Mode de Paiement", false, "add"  ])

  const handleOpen = (backdrop, user) => {
    payementModeObj = user;
    setBackdrop(backdrop);
    onOpen();
  };

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return payementModeColumns;

    return payementModeColumns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredCashoutTypes = [];
    if (typeof payementModeData === 'string') {
      filteredCashoutTypes = [];
    } else {
      filteredCashoutTypes = [...payementModeData?.slice().reverse()];
    }

    if (hasSearchFilter) {
      filteredCashoutTypes = filteredCashoutTypes.filter(
        (cashoutType) =>
          cashoutType.name
            .toLowerCase()
            .includes(filterValue.toLowerCase())
        // || cashoutType.amount.includes(filterValue.toLowerCase()) 
        // || cashoutType.inputationNumber.includes(filterValue.toLowerCase()),
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
  }, [payementModeData, filterValue, statusFilter]);

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


  const renderCell = React.useCallback((pMode, columnKey) => {
    const cellValue = pMode[columnKey];
    payementModeObj = pMode;

    switch (columnKey) {
      case 'name':
        return (
          // <User
          //   avatarProps={{ radius: 'lg', src: pMode.avatar }}
          //   description={pMode.email}
          //   name={cellValue}
          // >
          //   {pMode.name}
          // </User>
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{ cellValue }</p>
          </div>
        );


      case 'active':
        return (
          <>
            <Chip className="capitalize" color={statusColorMap[pMode?.active]} size="sm" variant="flat">
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


                <DropdownItem onPress={() => {handleOpen('blur', pMode); setInterfaceLabel (["Voir Mode de Paiement", "Voir ce Mode de Paiement", true, "view" ]) }}>
                  Voir
                </DropdownItem>

                <DropdownItem onPress={() => {handleOpen('blur', pMode); setInterfaceLabel (["Modification d'un Mode de Paiement", "Modifier ce Mode de Paiement", true, "update" ]) }}>
                  Modifier
                </DropdownItem>

                <DropdownItem onPress={() => {handleOpen('blur', pMode); setInterfaceLabel (["Suppression du Mode de Paiement", "Supprimer ce Mode de Paiement", true, "delete" ]) }}>
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
                {payementModeColumns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button color="primary" onPress={() => {handleOpen('blur', payementModeObjEmpty); setInterfaceLabel (["Création d'un Mode de Paiement", "Ajouter ce Mode de Paiement", false, "add" ]) }} startContent={<PlusIcon />}>
              {/* <Link href={`/decaissement`}>Creer un Mode de Paiement</Link> */}
              Creer un Mode de Paiement
              {/* /${ programId[1] } */}
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {payementModeData.length} mode de paiements
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
    payementModeData.length,
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
              <PaymentModeForm
                onClose={ onClose }
                headerTitle={ interfaceLabel[0] }
                headerDescription={ interfaceLabel[1] }
                filled={ interfaceLabel[2] } 
                action={ interfaceLabel[3] } 
                active={ payementModeObj?.active }
                value={payementModeObj?.name }
                _id={ payementModeObj?._id }
               />
            </>
          )}
        </ModalContent>

      </Modal>

    </>
  );
}




