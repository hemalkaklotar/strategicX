"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({ children }) {
  const router = useRouter();
 useEffect(()=>{

let token = localStorage.getItem('token');
if (token){
    router.push('/products')
}

 },[])
  return (
    <div>

        {children}ß
    </div>
  );
}
