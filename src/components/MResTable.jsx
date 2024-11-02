import React, { useState, useMemo, useCallback } from "react";
import { useRecoilValue } from "recoil";
import { allItemsState } from "../recoil/atom/manager/managerAtom";
import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip,
  useDisclosure
} from "@nextui-org/react";

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

  // Filter and sort items
  const filteredItems = useMemo(() => {
    let items = [...allItems];
    if (filterValue.trim() !== "") {
      items = items.filter(item =>
        item.user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (statusFilter !== "All") {
      items = items.filter(item => item.onboardingStatus === statusFilter);
    }
    return items;
  }, [allItems, filterValue, statusFilter]);

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
            break;
          case "team":
            aValue = a.team.toLowerCase();
            bValue = b.team.toLowerCase();
            break;
          default:
            return 0;
        }
        return aValue < bValue
          ? sortConfig.direction === "ascending" ? -1 : 1
          : aValue > bValue
          ? sortConfig.direction === "ascending" ? 1 : -1
          : 0;
      });
      return sorted;
    }
    return filteredItems;
  }, [filteredItems, sortConfig]);

  const totalPages = Math.ceil(sortedItems.length / rowsPerPage);
  const paginatedItems = useMemo(() => {
    const startIdx = (currentPage - 1) * rowsPerPage;
    return sortedItems.slice(startIdx, startIdx + rowsPerPage);
  }, [sortedItems, currentPage, rowsPerPage]);

  const handleSort = useCallback((columnUid) => {
    let direction = "ascending";
    if (sortConfig.key === columnUid && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key: columnUid, direction });
  }, [sortConfig]);

  const handleRowClick = (item) => {
    setSelectedItem(item);
    onOpen();
  };

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

  return (
    <div className="mx-20 my-10">
      <Table
        aria-label="Resource Table"
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={(keys) => setSelectedKeys(new Set(keys))}
        sortDescriptor={sortConfig.key ? { column: sortConfig.key, direction: sortConfig.direction } : undefined}
        onSortChange={(descriptor) => {
          if (descriptor) {
            setSortConfig({ key: descriptor.column, direction: descriptor.direction });
          } else {
            setSortConfig({ key: null, direction: null });
          }
        }}
        topContent={<div>{/* top content here */}</div>}
        topContentPlacement="outside"
        bottomContent={<div>{/* bottom content here */}</div>}
        bottomContentPlacement="outside"
      >
        <TableHeader columns={columns}>
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
