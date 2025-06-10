"use client";
import { createContext } from "react";

export const ModalContext = createContext({
  modalOpen: false,
  toggleModal: () => {},
  modalContentType: null,
  openModalWith: () => {},
  showToast: () => {},
  toastRef: null,
});