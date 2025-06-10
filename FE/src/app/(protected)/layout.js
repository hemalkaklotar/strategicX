"use client";
import React, { useContext, useState } from "react";
import Input from "../components/Input";
import { ModalContext } from "../context/modelContext";
import Dialog from "../components/Dialog";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../components/ProtectedRoute";

export default function DashboardLayout({ children }) {
  const { toggleModal, modalContentType } = useContext(ModalContext);
  const { openModalWith } = useContext(ModalContext);
  const router = useRouter();

  return (
    <ProtectedRoute>
      <div className="flex flex-col h-screen">
        <nav className="w-full py-4 flex justify-between items-center px-3 bg-indigo-900 ">
          <div
            className="hover:cursor-pointer"
          >
            <i className="pi pi-bars text-white !text-xl" />
          </div>
          <div className="flex-1 flex justify-between items-center">
            <div className="w-3/6 mx-auto">
              <Input
                placeholder="Search..."
                classNames={
                  "!bg-indigo-300 !border-0 !rounded-md placeholder:!text-gray-600 !text-indigo-900 !text-sm !font-semibold"
                }
              />
            </div>
            <div className="flex items-center justify-between gap-5">
              <div className="flex items-center justify-between gap-2 ">
                <i className="pi pi-bell text-white !text-xl" />
              </div>
              <div
                className="flex items-center justify-between gap-2 "
                onClick={() => {
                  toggleModal();
                  openModalWith("logout");
                }}
              >
                <i className="pi pi-sign-out text-white !text-xl" />
              </div>
            </div>
          </div>
        </nav>
        <div className=" flex-1 flex">
          <div
            className="h-full bg-indigo-900 border-t-0 z-20"
            style={{
              width: "50px",
              transition: "width 0.3s",
            }}
          ></div>
          <main
            className="h-full bg-slate-100 rounded-tl-2xl overflow-auto flex-1"
            style={{ padding: "0.5rem", flexGrow: 1 }}
          >
            {children}
          </main>
          {modalContentType === "logout" && (
            <Dialog
              header={"Logout Confirmation"}
              classNames="!w-2xl !max-w-2xl !rounded-lg"
              footer={
                <div className="flex justify-end gap-2">
                  <button
                    className="p-button p-component p-button-text"
                    onClick={() => toggleModal()}
                  >
                    Cancel
                  </button>
                  <button
                    className="p-button p-component p-button-danger"
                    onClick={() => {
                      localStorage.removeItem("token");
                      router.push("/auth/login");
                      toggleModal();
                    }}
                  >
                    Logout
                  </button>
                </div>
              }
            >
              Are you sure you want to logout?
            </Dialog>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
