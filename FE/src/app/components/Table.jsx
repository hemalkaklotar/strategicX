"use client";
import React, { useState, useEffect, useRef } from "react";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Input from "./Input";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { Tag } from "primereact/tag";
import { ModalContext } from "../context/modelContext";
import { useContext } from "react";
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
export default function Table({
  value,
  columns,
  onActionEdit,
  onActionDelete,
  onFilterChange,
  onSortChange,filters
}) {
  const { openModalWith } = useContext(ModalContext);
  const debouncedSearch = useRef(debounce(onFilterChange, 400)).current;
  const [sort, setSort] = useState({ field: null, order: null });
  const [representatives] = useState([
    { name: "Electronics", value: "electronics" },
    { name: "Clothing", value: "clothing" },
    { name: "Books", value: "books" },
    { name: "Other", value: "other" },
  ]);
  const [statuses] = useState(["available", "unavailable"]);

  const onSort = (e) => {
    setSort({ field: e.sortField, order: e.sortOrder });
    onSortChange({
      field: e.sortField,
      order: e.sortOrder === 1 ? "asc" : "desc",})
  };
  const getSeverity = (status) => {
    switch (status) {
      case "available":
        return "success";
      case "unavailable":
        return "info";
    }
  };

 
 
  const representativesItemTemplate = (option) => {
    return (
      <div className="flex align-items-center gap-2">
        <span>{option.name}</span>
      </div>
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag value={rowData.status} severity={getSeverity(rowData.status)} />
    );
  };
  const imageBodyTemplate = (rowData) => {
    const byteArray = new Uint8Array(rowData?.image?.data);
    const blob = new Blob([byteArray], { type: "image/*" });
    const imageUrl = URL.createObjectURL(blob);
    return (
      <img
        alt="no image"
        src={imageUrl}
        className="w-32 object-cover rounded-lg"
      />
    );
  };
  const statusItemTemplate = (option) => {
    return <Tag value={option} severity={getSeverity(option)} />;
  };

  const actionsBodyTemplate = (rowData) => {
    console.log("rowData", rowData);
    return (
      <div className="flex gap-1">
        <div
          className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-slate-200 hover:cursor-pointer"
          onClick={() => {
            onActionEdit(rowData);
            openModalWith("edit");
          }}
        >
          <i className="pi pi-pencil text-indigo-600"></i>
        </div>
        <div
          className="h-8 w-8  flex items-center justify-center rounded-full hover:bg-slate-200 hover:cursor-pointer"
          onClick={() => {
            onActionDelete(rowData.id);
          }}
        >
          <i className="pi pi-trash text-red-600"></i>
        </div>
      </div>
    );
  };
  const categoryFilterTemplate = (options) => {
    return (
      <MultiSelect
        value={options.value == null ? [] : options.value}
        options={representatives}
        itemTemplate={representativesItemTemplate}
        onChange={(e) => {
          debouncedSearch({
            key: options.field,
            value: e.value,
          });
          options.filterApplyCallback(e.value);
        }}
        optionLabel="name"
        placeholder="Any"
        className="p-column-filter"
        maxSelectedLabels={1}
        style={{ minWidth: "14rem" }}
      />
    );
  };

  const statusRowFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e) => {
          debouncedSearch({
            key: options.field,
            value: e.value,
          })
          options.filterApplyCallback(e.value)
        
        }
        }
        itemTemplate={statusItemTemplate}
        placeholder="Select One"
        className="p-column-filter"
        showClear
        style={{ minWidth: "12rem" }}
      />
    );
  };

  const getBodyTemplate = (type) => {
    switch (type) {
      case "status":
        return statusBodyTemplate;
      case "actions":
        return actionsBodyTemplate;
      case "image":
        return imageBodyTemplate;
      default:
        return null;
    }
  };
  const textFilterTemplate = (options) => {
    return (
      <Input
        type="text"
        value={options.value}
        onChange={(e) => {
          debouncedSearch({ key: options.field, value: e.target.value });
        }}
        placeholder={options.placeholder}
        className="p-column-filter"
      />
    );
  };
  const getFilterTemplate = (type) => {
    switch (type) {
      case "MUTLISELECT":
        return categoryFilterTemplate;
      case "DROPDOWN":
        return statusRowFilterTemplate;
      default:
        return textFilterTemplate;
    }
  };
  return (
    <div className="card">
      <DataTable
        value={value}
        paginator
        rows={10}
        dataKey="id"
        filters={filters}
        filterDisplay="row"
        scrollable
        scrollHeight="400px"
        onSort={onSort}
     sortField={sort.field}
      sortOrder={sort.order}
        emptyMessage="No products found."
      >
        {columns &&
          columns.map((col, index) => (
            <Column
              key={index}
              field={col.field}
              header={col.header}
              filter={col.filter}
              sortable={col.sortable}
              showFilterMenu={false}
              filterPlaceholder={col.filterPlaceholder}
              body={getBodyTemplate(col.bodyType) || col.body}
              filterField={col.filterField}
              filterElement={getFilterTemplate(col.filterType)}
              dataType={col?.dataType}
              frozen={col.frozen}
              style={{ minWidth: "12rem" }}
              filterMatchMode={col.filterMatchMode}
            />
          ))}
        <Column
          header="Actions"
          style={{ minWidth: "18rem" }}
          body={actionsBodyTemplate}
          frozen
        />
      </DataTable>
    </div>
  );
}
