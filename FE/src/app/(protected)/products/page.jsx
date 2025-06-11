"use client";
import React, { useContext, useEffect, useState } from "react";
import Header from "./compoents/Header";
import Dialog from "../../components/Dialog";
import Table from "../../components/Table";
import AddEditProductForm from "./compoents/AddEditProductForm";
import { getProducts } from "../../services/productService";
import { buildGetProductQuery } from "../../lib/utils/queryBuilder";
import { upsertProduct,deleteProduct } from "../../services/productService";
import { ModalContext } from "../../context/modelContext";
import { FilterMatchMode } from "primereact/api";

const Products = () => {
  const { showToast,toggleModal,modalContentType } = useContext(ModalContext);

  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState(() => {
  const savedFilters = localStorage.getItem("productFilters");
  return savedFilters
    ? JSON.parse(savedFilters)
    : {
        global: { value: null },
        name: { value: null },
        category: { value: null, matchMode: FilterMatchMode.IN },
        status: { value: null },
        verified: { value: null },
      };
});

const [sort, setSort] = useState(() => {
  const savedSort = localStorage.getItem("productSort");
  return savedSort ? JSON.parse(savedSort) : { field: null, order: null };
});
  const [defaultValue, setDefaultValue] = useState({});

  const renderContent = () => {
    switch (modalContentType) {
      case "add":
        return(

        <AddEditProductForm
            defaultValues={{}}
            onProductSubmit={handleProductSubmit}
          />
        )

      case "edit":
        return (
          <AddEditProductForm
            defaultValues={defaultValue}
            onProductSubmit={handleProductSubmit}
          />
        );
      case "delete":
        return deleteContent();
      default:
        return <p>No content</p>;
    }
  };
  const deleteContent = () => {
    return (
      <div className="flex flex-col items-center justify-center">
        <p className="text-lg font-semibold mb-4">
          Are you sure you want to delete this product?
        </p>
        <div className="flex justify-end gap-2 w-full">
          <button
            onClick={() => toggleModal()}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Yes, Delete
          </button>
          <button
            onClick={() => toggleModal()}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };
  const searchOn = ["name", "description", "status"];
  const columns = [
    {
      field: "name",
      header: "Name",
      filter: true,
      sortable: true,
      filterField: "name",
    },
    {
      field: "description",
      header: "Description",
    },
    {
      field: "category",
      filterField: "category",
      header: "Category",
      filter: true,
      sortable: true,
      filterType: "MUTLISELECT",
      bodyType: "category",
    },
    {
      field: "price",
      header: "Price",
      sortable: true,
      bodyType: "price",
    },
    {
      field: "status",
      header: "Status",
      sortable: true,
      filterType: "DROPDOWN",
      filterField: "status",
      filter: true,
      bodyType: "price",
    },
    {
      field: "quantity",
      header: "Quantity",
      sortable: true,
    },
    {
      field: "image",
      header: "Image",
      bodyType: "image",
    },
  ];
  const handleEdit = (rowData) => {
    setDefaultValue(rowData);
  };
  const handleDelete = (id) => {
    console.log("Delete row data:", id);
    deleteProduct(id)
      .then(({ data }) => {
        fetchProducts();
        showToast({
          severity: "success",
          summary: "Product deleted",
          detail: data?.message || "Product delete successfully!",
          life: 3000,
        });
      })
      .catch((error) => {});
  };
  const fetchProducts = async (query) => {
    getProducts(query)
      .then(({ data }) => {
        setProducts(data.data);
        console.log("Products fetched successfully:", data);
      })
      .catch((error) => {});
  };
  const handleProductSubmit = (data) => {
    upsertProduct(data)
      .then(({ data }) => {
        toggleModal();
        fetchProducts();
        showToast({
          severity: "success",
          summary: "Product saved",
          detail: data?.message || "Product saved successfully!",
          life: 3000,
        });
      })
      .catch((error) => {});
  };
  const handleFilterchange = ({ key, value }) => {
    setFilters((prev) => ({
    ...prev,
    [key]: {
      ...prev[key],
      value: value,
    },
  }));
  };
  const handleSortChange = (sort) => {
    setSort(sort);
  };
  useEffect(() => {
  const fieldFilters = Object.fromEntries(
    Object.entries(filters).map(([key, obj]) => [key, obj?.value ?? null])
  );

  const query = buildGetProductQuery({
    search: filters?.global?.value || "",
    sort,
    pagination: { page: 1, limit: 10 },
    filters: fieldFilters,
  });
  localStorage.setItem("productFilters", JSON.stringify(filters));
  localStorage.setItem("productSort", JSON.stringify(sort));
  fetchProducts(query);
  

}, [filters, sort]);

  return (
    <div className=" h-full">
      <Header />
      <Table
        value={products}
        searchOn={searchOn}
        columns={columns}
        filters={filters}
        onActionEdit={handleEdit}
        onFilterChange={handleFilterchange}
        onSortChange={handleSortChange}
        onActionDelete={handleDelete}
      />
      <Dialog
        header={
          modalContentType === "add"
            ? "Add new  product"
            : modalContentType === "edit"
            ? "Edit product"
            : modalContentType === "delete"
            ? "Delete product"
            : ""
        }
      >
        {renderContent()}
      </Dialog>
    </div>
  );
};

export default Products;
