"use client";
import React, { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { ModalContext } from "../../../context/modelContext";
import { loginUser } from '../../../services/authService';
import { useRouter } from "next/navigation";
export const userSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[a-z]/, "Password must include at least one lowercase letter")
      .regex(/[A-Z]/, "Password must include at least one uppercase letter")
      .regex(/[0-9]/, "Password must include at least one number")
      .regex(
        /[^a-zA-Z0-9]/,
        "Password must include at least one special character"
      ),
  })
const LoginForm = () => {
  const { showToast } = useContext(ModalContext);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async(data) => {
    loginUser(data)
    .then((res) => {
      showToast({
        severity: 'success',
        summary: 'Login Successful',
        detail: res.data?.message || 'You are logged in successfully!',
        life: 3000,
      });

      setTimeout(() => {
        router.push('/products');
      }, 300);
    })
    .catch((error) => {
      showToast({
        severity: 'error',
        summary: 'Login Failed',
        detail: error.response?.data?.error || 'Something went wrong.',
        life: 4000,
      });
    });
    
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="email">Email Address</label>
        <InputText
          id="email"
          {...register("email")}
          className={classNames({ "p-invalid": errors.email })}
          placeholder="e.g. johndoe@gmail.com"
        />
        {errors.email && (
          <small className="p-error">{errors.email.message}</small>
        )}
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label htmlFor="password">Password</label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Password
              {...field}
              inputId="password"
              feedback
              className={classNames({ "p-invalid": errors.password })}
              inputClassName="w-full"
              placeholder="e.g. Abc@123"
            />
          )}
        />
        {errors.password && (
          <small className="p-error">{errors.password.message}</small>
        )}
      </div>
      <Button label="Submit" type="submit" className="w-full" />
    </form>
  );
};

export default LoginForm;
