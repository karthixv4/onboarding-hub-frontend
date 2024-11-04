import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useRecoilValue } from "recoil";

import { allItemsState } from "../recoil/atom/manager/managerAtom";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  Pagination,
  Input,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Modal,
  useDisclosure,
} from "@nextui-org/react";
import { PlusIcon, SearchIcon, ChevronDownIcon } from "./Icons";
import SingleResourceView from "./SingleResourceView";

const statusColorMap = {
  NOT_STARTED: "warning",
  IN_PROGRESS: "primary",
  COMPLETED: "success",
};

const columns = [
  { name: "Name", uid: "name", sortable: true },
  { name: "Position", uid: "position", sortable: true },
  { name: "Onboarding Status", uid: "onboardingStatus", sortable: true },
  { name: "Team", uid: "team", sortable: true },
];

const statusOptions = ["All", "NOT_STARTED", "IN_PROGRESS", "COMPLETED"];

export default function MResTable() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState(null);
  const allItems = useRecoilValue(allItemsState);
  const [filterValue, setFilterValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [visibleColumns, setVisibleColumns] = useState(new Set(columns.map(col => col.uid)));
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [selectedKeys, setSelectedKeys] = useState(new Set());

  // Handle filtering
  const filteredItems = useMemo(() => {
    let items = [...allItems];

    // Filter by search term
    if (filterValue.trim() !== "") {
      items = items.filter(item =>
        item.user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    // Filter by onboarding status
    if (statusFilter !== "All") {
      items = items.filter(item => item.onboardingStatus === statusFilter);
    }

    return items;
  }, [allItems, filterValue, statusFilter]);

  // Handle sorting
  const sortedItems = useMemo(() => {
    if (sortConfig.key) {
      const sorted = [...filteredItems].sort((a, b) => {
        let aValue, bValue;

        switch (sortConfig.key) {
          case "name":
            aValue = a.user.name.toLowerCase();
            bValue = b.user.name.toLowerCase();
            break;
          case "position":
            aValue = a.position.toLowerCase();
            bValue = b.position.toLowerCase();
            break;
          case "onboardingStatus":
            aValue = a.onboardingStatus.toLowerCase();
            bValue = b.onboardingStatus.toLowerCase();
          case "team":
            aValue = a.team.toLowerCase();
            bValue = b.team.toLowerCase();
            break;
          default:
            return 0;
        }

        if (aValue < bValue) return sortConfig.direction === "ascending" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      });
      return sorted;
    }
    return filteredItems;
  }, [filteredItems, sortConfig]);

  // Handle pagination
  const totalPages = Math.ceil(sortedItems.length / rowsPerPage);

  const paginatedItems = useMemo(() => {
    const startIdx = (currentPage - 1) * rowsPerPage;
    return sortedItems.slice(startIdx, startIdx + rowsPerPage);
  }, [sortedItems, currentPage, rowsPerPage]);

  // Handle column visibility
  const headerColumns = useMemo(() => {
    return columns.filter(column => visibleColumns.has(column.uid));
  }, [visibleColumns]);

  // Handle sorting when a column header is clicked
  const handleSort = useCallback(
    (columnUid) => {
      let direction = "ascending";
      if (sortConfig.key === columnUid && sortConfig.direction === "ascending") {
        direction = "descending";
      }
      setSortConfig({ key: columnUid, direction });
    },
    [sortConfig]
  );

  // Handle row selection
  const handleSelectionChange = useCallback(
    (keys) => {
      setSelectedKeys(new Set(keys));
    },
    []
  );

  // Handle opening the resource view modal
  const handleRowClick = (item) => {
    setSelectedItem(item);
    onOpen();
  };

  // Handle rows per page change
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Handle status filter change
  const handleStatusFilterChange = (key) => {
    setStatusFilter(key);
    setCurrentPage(1);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setFilterValue(e.target.value);
    setCurrentPage(1);
  };

  // Handle column visibility change
  const handleColumnVisibilityChange = (key) => {
    setVisibleColumns(prev => {
      const updated = new Set(prev);
      if (updated.has(key)) {
        updated.delete(key);
      } else {
        updated.add(key);
      }
      return updated;
    });
  };

  // Render cell content based on column
  const renderCell = useCallback((item, columnKey) => {
    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: item.user.avatar || `https://i.pravatar.cc/300/${item.id}` }}
            description={item.user.email}
            name={item.user.name}
          />
        );
      case "position":
        return (
          <div className="flex flex-col">
            <p className="font-medium text-sm capitalize">{item.position}</p>
          </div>
        );
      case "onboardingStatus":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[item.onboardingStatus]}
            size="sm"
            variant="flat"
          >
            {item.onboardingStatus.replace("_", " ")}
          </Chip>
        );
      case "team":
        return (
          <p className="font-medium text-sm capitalize">{item.team}</p>
        );
      default:
        return null;
    }
  }, []);

  // Top content with search, filters, and actions
  const topContent = (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap justify-between gap-3 items-end">
        {/* Search Input */}
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Search by name..."
          startContent={<SearchIcon />}
          value={filterValue}
          onClear={() => setFilterValue("")}
          onChange={handleSearchChange}
        />

        {/* Status Filter Dropdown */}
        <Dropdown>
          <DropdownTrigger className="hidden sm:flex">
            <Button
              endContent={<ChevronDownIcon className="text-small" />}
              variant="flat"
            >
              Status: {statusFilter.replace("_", " ")}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Filter by Onboarding Status"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={statusFilter}
            onSelectionChange={(keys) => handleStatusFilterChange(Array.from(keys)[0])}
          >
            {statusOptions.map((status) => (
              <DropdownItem key={status} className="capitalize">
                {status.replace("_", " ")}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

        {/* Columns Visibility Dropdown */}
        <Dropdown>
          <DropdownTrigger className="hidden sm:flex">
            <Button
              endContent={<ChevronDownIcon className="text-small" />}
              variant="flat"
            >
              Columns
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Select Columns"
            disallowEmptySelection
            selectionMode="multiple"
            selectedKeys={visibleColumns}
            onSelectionChange={(keys) => setVisibleColumns(new Set(keys))}
          >
            {columns.map((column) => (
              <DropdownItem key={column.uid} className="capitalize">
                {column.name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

        {/* Add New Button */}
        <Button color="primary" endContent={<PlusIcon />}>
          Add New
        </Button>
      </div>

      {/* Rows Per Page and Total Users */}
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">
          Total {filteredItems.length} users
        </span>
        <label className="flex items-center text-default-400 text-small">
          Rows per page:
          <select
            className="bg-transparent outline-none text-default-400 text-small ml-2"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </label>
      </div>
    </div>
  );

  // Bottom content with selection info and pagination
  const bottomContent = (
    <div className="py-2 px-2 flex justify-between items-center">
      <span className="w-[30%] text-small text-default-400">
        {selectedKeys.size === 0
          ? "No items selected"
          : selectedKeys.size === allItems.length
          ? "All items selected"
          : `${selectedKeys.size} of ${filteredItems.length} selected`}
      </span>
      <Pagination
        isCompact
        showControls
        page={currentPage}
        total={totalPages}
        onChange={(page) => setCurrentPage(page)}
      />
      <div className="hidden sm:flex w-[30%] justify-end gap-2">
        <Button
          isDisabled={currentPage === 1}
          size="sm"
          variant="flat"
          onPress={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        >
          Previous
        </Button>
        <Button
          isDisabled={currentPage === totalPages || totalPages === 0}
          size="sm"
          variant="flat"
          onPress={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        >
          Next
        </Button>
      </div>
    </div>
  );

  return (
    <div className="mx-20 my-10">
      <Table
        aria-label="Resource Table"
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={handleSelectionChange}
        sortDescriptor={sortConfig.key ? { column: sortConfig.key, direction: sortConfig.direction } : undefined}
        onSortChange={(descriptor) => {
          if (descriptor) {
            setSortConfig({ key: descriptor.column, direction: descriptor.direction });
          } else {
            setSortConfig({ key: null, direction: null });
          }
        }}
        topContent={topContent}
        topContentPlacement="outside"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[600px] overflow-auto",
        }}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
              onClick={() => column.sortable && handleSort(column.uid)}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No users found."}>
          {paginatedItems.map((item) => (
            <TableRow key={item.id} onClick={() => handleRowClick(item)}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Resource Details Modal */}
      {selectedItem && (
        <SingleResourceView
          isOpen={isOpen}
          onClose={onClose}
          item={selectedItem}
        />
      )}
    </div>
  );
}