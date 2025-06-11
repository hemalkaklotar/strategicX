'use client';
import React, {  useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";

const productSchema = z.object({
  name: z.string().min(2, "Product name is required"),
  description: z.string().min(5, "Description is required"),
  category: z.string().min(1, "Category is required"),
  price: z.number().min(0, "Price must be positive"),
  quantity: z.number().int().min(0, "Quantity must be positive"),
  status: z.enum(["available", "unavailable"]),
  image: z.any().refine((file) => file && file.length > 0, "Image is required"),
});

const categories = [
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing" },
  { value: "books", label: "Books" },
  { value: "other", label: "Other" },
];

const statusOptions = [
  { label: "Available", value: "available" },
  { label: "Unavailable", value: "unavailable" },
];
const AddEditProductForm = ({ defaultValues,onProductSubmit }) => {
  const onSubmit = (data) => {
   const formData = new FormData();
   console.log("Form Data:", data);

   if (defaultValues || defaultValues.id) {
      formData.append("id", defaultValues.id);
    }
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", data.price);
    formData.append("quantity", data.quantity);
    formData.append("status", data.status);
    formData.append("warranty", data.warranty || 0);

    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]); 
    }

    onProductSubmit(formData);
    
  }
  const [imagePreviews, setImagePreviews] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    control,
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: defaultValues || {
      name: "",
      description: "",
      category: "",
      price: 0,
      quantity: 0,
      status: '"available"',
      image: null,
    },
  });

useEffect(() => {
  if (defaultValues?.image?.data) {
    const byteArray = new Uint8Array(defaultValues.image.data);
    const blob = new Blob([byteArray], { type: "image/jpeg" }); 
    const file = new File([blob], "default-image.jpg", { type: "image/jpeg" });

    setValue("image", [file], { shouldValidate: true });

    const imageUrl = URL.createObjectURL(file);
    setImagePreviews([imageUrl]);
  }
}, [defaultValues, setValue]);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
      <div className="flex gap-2 w-full">
        <div className="flex flex-col gap-2 flex-1">
          <label>Product Name</label>
          <InputText
            {...register("name")}
            className={classNames({ "p-invalid": errors.name })}
            placeholder="e.g. iPhone 14 Pro Max"
          />
          {errors.name && (
            <small className="p-error">{errors.name.message}</small>
          )}
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <label>Warranty Period</label>
          <InputNumber
            value={watch("warranty")}
            onValueChange={(e) => setValue("warranty", e.value || 0)}
            {...register("name")}
            className={classNames({ "p-invalid": errors.name })}
            placeholder="e.g. 365 (in days) "
          />
          {errors.name && (
            <small className="p-error">{errors.name.message}</small>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label>Description</label>
        <InputTextarea
          {...register("description")}
          className={classNames({ "p-invalid": errors.description })}
          autoResize
          rows={3}
        />
        {errors.description && (
          <small className="p-error">{errors.description.message}</small>
        )}
      </div>
      <div className="flex gap-2 w-full">
        <div className="flex flex-col gap-2 flex-1">
          <label>Category</label>
          <Dropdown
            value={watch("category")}
            options={categories}
            optionLabel="label"
            optionValue="value"
            placeholder="Select a Category"
            className={classNames({ "p-invalid": errors.category })}
            onChange={(e) => setValue("category", e.value)}
          />
          {errors.category && (
            <small className="p-error">{errors.category.message}</small>
          )}
        </div>
        <div className="flex flex-col gap-2  flex-1">
          <label>Price</label>
          <InputNumber
            value={watch("price")}
            onValueChange={(e) => setValue("price", e.value || 0)}
            className={classNames({ "p-invalid": errors.price })}
          />
          {errors.price && (
            <small className="p-error">{errors.price.message}</small>
          )}
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <label>Quantity</label>
          <InputNumber
            value={watch("quantity")}
            onValueChange={(e) => setValue("quantity", e.value || 0)}
            min={0}
            className={classNames({ "p-invalid": errors.quantity })}
          />
          {errors.quantity && (
            <small className="p-error">{errors.quantity.message}</small>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label>Status</label>
        <Dropdown
          value={watch("status")}
          options={statusOptions}
          optionLabel="label"
          optionValue="value"
          onChange={(e) => setValue("status", e.value)}
          className={classNames({ "p-invalid": errors.status })}
        />
        {errors.status && (
          <small className="p-error">{errors.status.message}</small>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label>Image</label>
        <FileUpload

          name="image"
          mode="basic"
          accept="image/*"
          maxFileSize={1000000}
          multiple
          auto
          chooseLabel="Upload Image"
          onSelect={(e) => setValue("image", e.files)}
          customUpload
          uploadHandler={(e) => {
            const files = e.files;
            if (files.length > 0) {
              setValue("image", files, { shouldValidate: true });
              const previews = files.map((file) => URL.createObjectURL(file));
              setImagePreviews(previews);
            }
          }}
          className={classNames({ "p-invalid": errors.image })}
        />
        {errors.image && (
          <small className="p-error">{errors.image.message}</small>
        )}
        {imagePreviews.length > 0 && (
          <div className="flex gap-2 mt-2 flex-wrap">
            {imagePreviews.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`preview-${idx}`}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "4px",
                }}
              />
            ))}
          </div>
        )}
      </div>
      <Button label="Submit" type="submit" className="w-full" />
    </form>
  );
};

export default AddEditProductForm;
