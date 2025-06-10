'use client';
import React from 'react'
import { useContext } from 'react';
import Button from '../../../components/Button'
import { ModalContext } from '../../../context/modelContext';
const Header = () => {
    const { openModalWith } = useContext(ModalContext);
  return (
    <div className='flex items-center justify-between bg-indigo-100 px-4 py-2 mb-4 rounded-md'>
            <h3 className='text-indigo-800 font-extrabold text-xl'>Products</h3>
            <Button icon='cart-plus' label='Add Product' onClick={() => openModalWith('add')} />
          </div>
  )
}

export default Header