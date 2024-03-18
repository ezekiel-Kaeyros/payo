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
import { newDecaissementDataColumn, decaissementsData, statusOptions } from '../data';
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
import Image from 'next/image';
import GenericSummaryCard from '../../forms/summaryCard/GenericSummaryCard';
// import PopupPreviewToPrint from '../ToPrint';

// const statusColorMap = {
//   valide: 'success',
//   rejete: 'danger',
//   pending: 'warning',
// };

const statusColorMap = {
  pending: 'warning',
  valider: 'success', 
  rejeter: 'danger',
  waiting_fond: "danger", 
  cashedout: "success", 
  not_received: "danger", 
  received: "success", 
};

const INITIAL_VISIBLE_COLUMNS = [
  'inputationNumber',
  'theAgentFullName',
  'amount',
  'date',
  'chefDepValidationSatus',
  'cfoValidationStatus',
  'validatorStatus', 
  'initiator_status', 
  'actions',
];

let userObj = {
  id: "",
  inputationNumber: "",
  theAgentFullName: "",
  amount: "",
  date: "",
  chefDepValidationSatus: "",
  cfoValidationStatus: "",
  validatorStatus: "",
  initiator_status: "",
  filiale: "",
  theDepartmentChef: "", 
  theFinancialChief: "",
  theCashier: "", 
  comment: "",
  letter_amount: "", 
  paymentType: ""
};

export default function TableComponent() {
  // const { state, dispatch } = useContext(CounterContext); 
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
  const [ showButtons, setShowButtons ] = React.useState(false)

  const [ rejectValidateBtnLabel, setRejectValidateBtnLabel ] = React.useState(["Rejeter", "Valider"])
  // const [ caisseBtnLabel, setCaisseBtnLabel ] = React.useState(["En attente de fond", "Décaisser"])
  // const [ InitiatorBtnLable, setInitiatorBtnLable ] = React.useState(["Non reçu", "Encaissement"])


  const handleOpen = (backdrop, user) => {
    userObj = user;
    setBackdrop(backdrop);
    onOpen();
  };

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return newDecaissementDataColumn;

    return newDecaissementDataColumn.filter((column) =>
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
        (cashout) =>
          cashout.paymentType
            .toLowerCase()
            .includes(filterValue.toLowerCase())
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


  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];
    userObj = user;

    const pdfObjN = {
      id: user?.id,
      inputationNumber: user?.inputationNumber,
      theAgentFullName: user?.theAgentFullName,
      amount: user?.amount,
      date: user?.date,
      chefDepValidationSatus: user?.chefDepValidationSatus,
      cfoValidationStatus: user?.cfoValidationStatus,
      validatorStatus: user?.validatorStatus,
      initiator_status: user?.initiator_status,
      filiale: user?.filiale,
      theDepartmentChef: user?.theDepartmentChef, 
      theFinancialChief: user?.theFinancialChief,
      comment: user?.comment,
      letter_amount: user?.letter_amount, 
      paymentType: user?.paymentType, 
    };

    switch (columnKey) {
      case 'theAgentFullName':
        return (
          <User
            avatarProps={{ radius: 'lg', src: user.avatar }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
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
            <p className="text-bold text-tiny capitalize text-default-400">
              {formattedAmount}
            </p>
          </div>
        );

      case 'chefDepValidationSatus':
        return (
          <>
            <Chip className="capitalize" color={statusColorMap[user?.chefDepValidationSatus]} size="sm" variant="flat">
              <button className='flex flex-row gap-x-1 justify-between content-center items-center' onClick={() => {handleOpen('blur', user); setShowButtons (true); setRejectValidateBtnLabel(["Rejeter", "Valider"])}}>
              { user?.chefDepValidationSatus === "valider" ?
                <Image src='/new_assets/trackingIcons/whitcheckmark.png' alt='whiteCheck' width={10} height={2} />
                :
                ""
              }
              { user?.chefDepValidationSatus === "rejeter" ?
                <Image src='/new_assets/trackingIcons/pinkCancelButton.png' alt='pinkCancelButton' width={10} height={2} />
                :
                ""
              }
              { cellValue }
              </button>
            </Chip>
          </>
        );

      case 'cfoValidationStatus':
        return (
          <>
            <Chip className="capitalize" color={statusColorMap[user?.cfoValidationStatus]} size="sm" variant="flat">
              <button className='flex flex-row gap-x-1 justify-between content-center items-center' onClick={() => {handleOpen('blur', user); setShowButtons (true); setRejectValidateBtnLabel(["Rejeter", "Valider"])}}>
                { user?.cfoValidationStatus === "valider" ?
                  <Image src='/new_assets/trackingIcons/whitcheckmark.png' alt='whiteCheck' width={10} height={2} />
                  :
                  ""
                }
                { user?.cfoValidationStatus === "rejeter" ?
                  <Image src='/new_assets/trackingIcons/pinkCancelButton.png' alt='pinkCancelButton' width={10} height={2} />
                  :
                  ""
                }
                { cellValue }
              </button>
            </Chip>
          </>
        );
      case 'validatorStatus':
        return (
          <>
            <Chip className="capitalize" color={statusColorMap[user?.validatorStatus]} size="sm" variant="flat">
              <button className='flex flex-row gap-x-1 justify-between content-center items-center' onClick={() => {handleOpen('blur', user); setShowButtons (true); setRejectValidateBtnLabel(["En attente de fond", "Décaisser"])}}>
                { user?.validatorStatus === "cashedout" ?
                  <Image src='/new_assets/trackingIcons/whitcheckmark.png' alt='whiteCheck' width={10} height={2} />
                  :
                  ""
                }
                { user?.validatorStatus === "waiting_fond" ?
                  <Image src='/new_assets/trackingIcons/pinkCancelButton.png' alt='pinkCancelButton' width={10} height={2} />
                  :
                  ""
                }
                { cellValue }
              </button>
            </Chip>
          </>
        );

      case 'initiator_status':
        return (
          <>
            <Chip className="capitalize" color={statusColorMap[user?.initiator_status]} size="sm" variant="flat">
              <button className='flex flex-row gap-x-1 justify-between content-center items-center' onClick={() => {handleOpen('blur', user); setShowButtons (true); setRejectValidateBtnLabel(["Non reçu", "Encaissement"])}}>
              {/* received */}
                { user?.initiator_status === "received" ?
                  <Image src='/new_assets/trackingIcons/whitcheckmark.png' alt='whiteCheck' width={10} height={2} />
                  :
                  ""
                }
                { user?.initiator_status === "not_received" ?
                  <Image src='/new_assets/trackingIcons/pinkCancelButton.png' alt='pinkCancelButton' width={10} height={2} />
                  :
                  ""
                }
                { cellValue }
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
                <DropdownItem onPress={() => {handleOpen('blur', user); setShowButtons (false)}}>
                  Voir
                </DropdownItem>

                <DropdownItem onClick={() => {dispatch({ type: "SHOWDATATOPRINTPRIVIEW" }); dispatch({ type: "LOADDATATOPRINT", dataToPrint: pdfObjN })} }>
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
            <Dropdown>
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
            </Dropdown>
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
                {newDecaissementDataColumn.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button color="primary" startContent={<PlusIcon />}>
              <Link href={`/decaissement`}>Faire un Decaissement</Link>
              {/* /${ programId[1] } */}
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {decaissementsData.length} decaissements
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
        <TableBody emptyContent={'Pas de decaissement...'} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
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
          body: "py-50 z-[1000000000000]",
          // base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
          header: "border-b-[1px] border-[#292f46]",
          footer: "border-t-[1px] border-[#292f46]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <GenericSummaryCard 
                fullName={ userObj?.theAgentFullName}
                phoneNumber="(237) 698 00 00 00"
                inputationNumber={ userObj?.inputationNumber} 
                date={ userObj?.date } 
                amount={ userObj?.amount }
                paymentType={ userObj?.paymentType }
                office={ userObj?.filiale } 
                chefOfDepName={ userObj?.theDepartmentChef} 
                amountInWords={ userObj?.letter_amount } 
                financialChefName={ userObj?.theFinancialChief } 
                theCashier={ userObj?.theCashier}
                chefDepValidationSatus= { userObj?.chefDepValidationSatus} 
                cfoValidationStatus= { userObj?.cfoValidationStatus} 
                validatorStatus= { userObj?.validatorStatus} 
                initiator_status= { userObj?.initiator_status} 
                cashouNote={ userObj?.comment}
                toggleBtn1={true}
                toggleBtn2={true}
                label={rejectValidateBtnLabel[0]}
                label2={rejectValidateBtnLabel[1]}
                classes='bg-decaissementRejectBtnBg text-decaissementRejectBtnText rounded-lg p-4'
                classes2='bg-decaissementValiderBtnBg text-decaissementValiderBtnText rounded-lg p-4'
                showTracking={ true }
                showButton={ showButtons }
                functionToExcAfterConfirmRejection={ () => console.log("functionToExcAfterConfirmRejection") }
                functionToExcAfterConfirmValidation={ () => console.log("functionToExcAfterConfirmValidation") }
                // showConfirmWindow={}
              />
            </>
          )}
        </ModalContent>

      </Modal>

      {/* <RejectionNoteComp 

      /> */}

    </>
  );
}




