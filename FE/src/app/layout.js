"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import { ModalContext } from "./context/modelContext";
import React, { useState,useRef } from "react";
import { Toast } from "primereact/toast";
import ProtectedRoute from "./components/ProtectedRoute";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContentType, setModalContentType] = useState(null);
  const toastRef = useRef(null);
  const toggleModal = () => {
    setModalOpen((prev) => !prev);
  };
  const openModalWith = (type) => {
    setModalContentType(type);
    setModalOpen(true);
  };
  const showToast = (message) => {
    toastRef.current?.show(message);
  };
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-indigo-900`}
      >
        <ModalContext.Provider
          value={{
            modalOpen,
            toggleModal,
            modalContentType,
            openModalWith,
            showToast,
          }}
        >
          <Toast ref={toastRef} position="top-right" />

          {children}
        </ModalContext.Provider>
      </body>
    </html>
  );
}
