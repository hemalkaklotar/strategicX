import React from 'react'
import { Button as PrimeButton } from 'primereact/button';
const Button = ({icon, label, onClick}) => {
  return (
    <PrimeButton label={label}
      icon={`pi pi-${icon}`}
      onClick={onClick}
    />
  )
}

export default Button