'use client'
import React, { useContext } from "react";
import { Dialog as PrimeDialog } from "primereact/dialog";
import { ModalContext } from "../context/modelContext";

const Dialog = ({header,children,footer,classNames=''}) => {
  const { modalOpen, toggleModal } = useContext(ModalContext);
  return (
    <PrimeDialog
      header={header}
      modal
      visible={modalOpen}
      onHide={() => toggleModal()}
      draggable={false}
      footer={footer ? footer : null}
      className={` rounded-lg ${classNames}`}
    >
      {children}
    </PrimeDialog>
  );
};

export default Dialog;
